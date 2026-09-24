<?php
declare(strict_types=1);

namespace LiteraryHonors;

use PDO;
use RuntimeException;

final class StripeWebhook
{
    public function verifyAndHandle(string $payload, string $signature): void
    {
        $secret = Config::get('STRIPE_WEBHOOK_SECRET');
        if ($secret === null || !str_starts_with($secret, 'whsec_')) {
            throw new RuntimeException('Stripe webhook signing secret is not configured.');
        }
        if (!$this->hasValidSignature($payload, $signature, $secret)) {
            throw new RuntimeException('Invalid Stripe webhook signature.');
        }

        $event = json_decode($payload, true, 512, JSON_THROW_ON_ERROR);
        if (($event['type'] ?? '') !== 'checkout.session.completed') {
            return;
        }
        $session = $event['data']['object'] ?? [];
        if (($session['payment_status'] ?? '') !== 'paid' || empty($session['id'])) {
            return;
        }
        $submissionId = $this->markPaymentVerified((string) $session['id']);
        if ($submissionId !== null) {
            (new EmailService())->sendSubmissionReceivedEmails($submissionId);
        }
    }

    private function markPaymentVerified(string $checkoutSessionId): ?int
    {
        $pdo = Database::connection();
        $pdo->beginTransaction();
        try {
            $find = $pdo->prepare('SELECT submission_id, status FROM payments WHERE provider = "stripe" AND provider_payment_id = :session_id FOR UPDATE');
            $find->execute(['session_id' => $checkoutSessionId]);
            $payment = $find->fetch();
            if ($payment === false) {
                throw new RuntimeException('No matching payment was found for this Stripe session.');
            }
            if ($payment['status'] === 'paid') {
                $pdo->commit();
                return null;
            }

            $paymentUpdate = $pdo->prepare('UPDATE payments SET status = "paid", verified_at = NOW() WHERE provider = "stripe" AND provider_payment_id = :session_id');
            $paymentUpdate->execute(['session_id' => $checkoutSessionId]);
            $submissionUpdate = $pdo->prepare('UPDATE submissions SET payment_status = "verified", status = "submitted", submitted_at = COALESCE(submitted_at, NOW()) WHERE id = :submission_id');
            $submissionUpdate->execute(['submission_id' => (int) $payment['submission_id']]);
            $pdo->commit();
            return (int) $payment['submission_id'];
        } catch (\Throwable $exception) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            throw $exception;
        }
    }

    private function hasValidSignature(string $payload, string $signature, string $secret): bool
    {
        $timestamp = null;
        $signatures = [];
        foreach (explode(',', $signature) as $part) {
            [$key, $value] = array_pad(explode('=', trim($part), 2), 2, null);
            if ($key === 't') {
                $timestamp = $value;
            }
            if ($key === 'v1' && $value !== null) {
                $signatures[] = $value;
            }
        }
        if ($timestamp === null || abs(time() - (int) $timestamp) > 300) {
            return false;
        }
        $expected = hash_hmac('sha256', $timestamp . '.' . $payload, $secret);
        foreach ($signatures as $candidate) {
            if (hash_equals($expected, $candidate)) {
                return true;
            }
        }
        return false;
    }
}
