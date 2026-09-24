<?php
declare(strict_types=1);

namespace LiteraryHonors;

use InvalidArgumentException;
use RuntimeException;

final class ReviewService
{
    public function setResultDate(int $submissionId, int $adminId, string $date): void
    {
        $dateObject = \DateTimeImmutable::createFromFormat('Y-m-d', $date);
        if ($dateObject === false || $dateObject->format('Y-m-d') !== $date) {
            throw new InvalidArgumentException('Please provide a valid result date.');
        }
        $this->upsertReview($submissionId, $adminId, ['result_due_date' => $date]);
        Database::connection()->prepare('UPDATE submissions SET status = "result_date_sent" WHERE id = :id')
            ->execute(['id' => $submissionId]);
        (new EmailService())->sendResultDateEmail($submissionId, $dateObject->format('F j, Y'));
    }

    public function complete(int $submissionId, int $adminId, string $score, string $decision, string $notes): void
    {
        if (!is_numeric($score) || (float) $score < 0 || (float) $score > 100) {
            throw new InvalidArgumentException('Score must be between 0 and 100.');
        }
        if (!in_array($decision, ['winner', 'not_selected'], true)) {
            throw new InvalidArgumentException('Choose a final review decision.');
        }
        $this->upsertReview($submissionId, $adminId, [
            'score' => number_format((float) $score, 2, '.', ''),
            'decision' => $decision,
            'notes' => trim($notes),
            'reviewed_at' => date('Y-m-d H:i:s'),
        ]);
        Database::connection()->prepare('UPDATE submissions SET status = :status WHERE id = :id')
            ->execute(['status' => $decision, 'id' => $submissionId]);
        (new EmailService())->sendFinalDecisionEmail($submissionId, (float) $score, $decision, trim($notes));
    }

    /** @param array<string, string> $fields */
    private function upsertReview(int $submissionId, int $adminId, array $fields): void
    {
        $existing = Database::connection()->prepare('SELECT id FROM reviews WHERE submission_id = :submission_id');
        $existing->execute(['submission_id' => $submissionId]);
        if ($existing->fetch() === false) {
            Database::connection()->prepare('INSERT INTO reviews (submission_id, reviewer_admin_id) VALUES (:submission_id, :admin_id)')
                ->execute(['submission_id' => $submissionId, 'admin_id' => $adminId]);
        }
        $allowed = ['result_due_date', 'score', 'decision', 'notes', 'reviewed_at'];
        $sets = [];
        $params = ['submission_id' => $submissionId, 'admin_id' => $adminId];
        foreach ($fields as $field => $value) {
            if (!in_array($field, $allowed, true)) {
                continue;
            }
            $sets[] = "{$field} = :{$field}";
            $params[$field] = $value;
        }
        if ($sets === []) {
            throw new RuntimeException('Nothing to save.');
        }
        $sets[] = 'reviewer_admin_id = :admin_id';
        $statement = Database::connection()->prepare('UPDATE reviews SET ' . implode(', ', $sets) . ' WHERE submission_id = :submission_id');
        $statement->execute($params);
    }
}
