<?php
declare(strict_types=1);

namespace LiteraryHonors;

use RuntimeException;

final class StripeCheckout
{
    /** @param array<string, mixed> $submission */
    /** @return array{id: string, url: string} */
    public function create(array $submission): array
    {
        $secretKey = Config::get('STRIPE_SECRET_KEY');
        if ($secretKey === null || !str_starts_with($secretKey, 'sk_')) {
            throw new RuntimeException('Stripe test mode is not configured yet.');
        }
        if (!function_exists('curl_init')) {
            throw new RuntimeException('The PHP cURL extension is required for Stripe payments.');
        }

        $appUrl = rtrim((string) Config::get('APP_URL'), '/');
        $fields = [
            'mode' => 'payment',
            'success_url' => $appUrl . '/api/stripe-success.php?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => $appUrl . '/pages/submit.html?payment=cancelled',
            'customer_email' => $submission['author_email'],
            'client_reference_id' => $submission['public_id'],
            'metadata[submission_id]' => (string) $submission['id'],
            'line_items[0][price_data][currency]' => 'usd',
            'line_items[0][price_data][unit_amount]' => (string) $submission['amount_minor'],
            'line_items[0][price_data][product_data][name]' => 'Literary Honors Book Awards Entry',
            'line_items[0][price_data][product_data][description]' => $submission['book_title'] . ' (' . $submission['category_count'] . ' categor' . ($submission['category_count'] === 1 ? 'y' : 'ies') . ')',
            'line_items[0][quantity]' => '1',
        ];
        $curl = curl_init('https://api.stripe.com/v1/checkout/sessions');
        curl_setopt_array($curl, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query($fields),
            CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $secretKey],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 20,
        ]);
        $response = curl_exec($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
        curl_close($curl);
        $decoded = is_string($response) ? json_decode($response, true) : null;
        if ($status < 200 || $status >= 300 || !is_array($decoded) || empty($decoded['id']) || empty($decoded['url'])) {
            throw new RuntimeException('Stripe could not start the secure checkout. Please try again.');
        }

        return ['id' => (string) $decoded['id'], 'url' => (string) $decoded['url']];
    }
}
