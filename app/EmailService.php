<?php
declare(strict_types=1);

namespace LiteraryHonors;

use PDO;
use RuntimeException;

final class EmailService
{
    public function sendSubmissionReceivedEmails(int $submissionId): void
    {
        $statement = Database::connection()->prepare(
            'SELECT s.public_id, s.book_title, a.first_name, a.last_name, a.email
             FROM submissions s INNER JOIN authors a ON a.id = s.author_id
             WHERE s.id = :submission_id LIMIT 1'
        );
        $statement->execute(['submission_id' => $submissionId]);
        $submission = $statement->fetch();
        if ($submission === false) {
            throw new RuntimeException('Unable to find the submitted book for email delivery.');
        }

        $authorSubject = 'Your book has been submitted for review';
        $authorMessage = "Hello {$submission['first_name']},\n\n"
            . "Thank you for submitting \"{$submission['book_title']}\" to Literary Honors Book Awards. "
            . "Your payment has been verified and your book is now submitted for review.\n\n"
            . "Expected review time: 7–14 business days.\n"
            . "Submission ID: {$submission['public_id']}\n\n"
            . "Literary Honors Book Awards";
        $this->deliver($submissionId, (string) $submission['email'], 'author_submission_received', $authorSubject, $authorMessage);

        $toddEmail = Config::get('TODD_NOTIFICATION_EMAIL');
        if ($toddEmail !== null && filter_var($toddEmail, FILTER_VALIDATE_EMAIL)) {
            $toddSubject = 'New paid book submission received';
            $toddMessage = "A new author has submitted a paid book for review.\n\n"
                . "Author: {$submission['first_name']} {$submission['last_name']}\n"
                . "Email: {$submission['email']}\n"
                . "Book: {$submission['book_title']}\n"
                . "Submission ID: {$submission['public_id']}\n\n"
                . "Sign in to the Literary Honors admin panel to review it.";
            $this->deliver($submissionId, $toddEmail, 'admin_new_submission', $toddSubject, $toddMessage);
        }
    }

    public function sendResultDateEmail(int $submissionId, string $resultDate): void
    {
        $submission = $this->submissionRecipient($submissionId);
        $subject = 'Your Literary Honors review result date';
        $message = "Hello {$submission['first_name']},\n\n"
            . "Your book \"{$submission['book_title']}\" is under review. Your result will be shared by {$resultDate}.\n\n"
            . "Literary Honors Book Awards";
        $this->deliver($submissionId, (string) $submission['email'], 'author_result_date', $subject, $message);
    }

    public function sendFinalDecisionEmail(int $submissionId, float $score, string $decision, string $notes): void
    {
        $submission = $this->submissionRecipient($submissionId);
        $isWinner = $decision === 'winner';
        $subject = $isWinner ? 'Congratulations — your book is a Literary Honors winner' : 'Your Literary Honors review is complete';
        $result = $isWinner ? 'has been selected as a winner' : 'was not selected for an award this cycle';
        $message = "Hello {$submission['first_name']},\n\n"
            . "The review of \"{$submission['book_title']}\" is complete. Your score: {$score}.\n"
            . "Your book {$result}.\n\n"
            . ($notes !== '' ? "Review notes:\n{$notes}\n\n" : '')
            . "Literary Honors Book Awards";
        $this->deliver($submissionId, (string) $submission['email'], 'author_final_result', $subject, $message);
    }

    /** @return array<string, mixed> */
    private function submissionRecipient(int $submissionId): array
    {
        $statement = Database::connection()->prepare(
            'SELECT s.book_title, a.first_name, a.email FROM submissions s INNER JOIN authors a ON a.id = s.author_id WHERE s.id = :submission_id LIMIT 1'
        );
        $statement->execute(['submission_id' => $submissionId]);
        $submission = $statement->fetch();
        if ($submission === false) {
            throw new RuntimeException('Unable to find the submitted book for email delivery.');
        }
        return $submission;
    }

    private function deliver(int $submissionId, string $recipient, string $template, string $subject, string $text): void
    {
        $logId = $this->createLog($submissionId, $recipient, $template, $subject);
        try {
            $this->send($recipient, $subject, $text);
            $this->updateLog($logId, 'sent');
        } catch (\Throwable $exception) {
            $this->updateLog($logId, 'failed', $exception->getMessage());
            throw $exception;
        }
    }

    private function send(string $recipient, string $subject, string $text): void
    {
        $provider = Config::get('MAIL_PROVIDER', 'log');
        if ($provider === 'log') {
            error_log("[Literary Honors email] To: {$recipient}; Subject: {$subject}; Body: {$text}");
            return;
        }
        if ($provider !== 'resend') {
            throw new RuntimeException('Unsupported email provider.');
        }
        $apiKey = Config::get('RESEND_API_KEY');
        if ($apiKey === null || !str_starts_with($apiKey, 're_') || !function_exists('curl_init')) {
            throw new RuntimeException('Resend email delivery is not configured.');
        }

        $fromEmail = Config::get('MAIL_FROM_EMAIL');
        $fromName = Config::get('MAIL_FROM_NAME', 'Literary Honors Book Awards');
        if ($fromEmail === null || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
            throw new RuntimeException('A valid sender email address is required.');
        }
        $payload = json_encode([
            'from' => $fromName . ' <' . $fromEmail . '>',
            'to' => [$recipient],
            'subject' => $subject,
            'text' => $text,
        ], JSON_THROW_ON_ERROR);
        $curl = curl_init('https://api.resend.com/emails');
        curl_setopt_array($curl, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $apiKey, 'Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 20,
        ]);
        $response = curl_exec($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
        curl_close($curl);
        if ($status < 200 || $status >= 300) {
            throw new RuntimeException('Email service could not deliver the message.');
        }
    }

    private function createLog(int $submissionId, string $recipient, string $template, string $subject): int
    {
        $statement = Database::connection()->prepare(
            'INSERT INTO email_logs (submission_id, recipient_email, template_key, subject, status) VALUES (:submission_id, :recipient, :template, :subject, "queued")'
        );
        $statement->execute(['submission_id' => $submissionId, 'recipient' => $recipient, 'template' => $template, 'subject' => $subject]);
        return (int) Database::connection()->lastInsertId();
    }

    private function updateLog(int $id, string $status, ?string $error = null): void
    {
        $sentAt = $status === 'sent' ? 'NOW()' : 'NULL';
        $statement = Database::connection()->prepare(
            "UPDATE email_logs SET status = :status, sent_at = {$sentAt}, error_message = :error WHERE id = :id"
        );
        $statement->execute(['status' => $status, 'error' => $error === null ? null : substr($error, 0, 1000), 'id' => $id]);
    }
}
