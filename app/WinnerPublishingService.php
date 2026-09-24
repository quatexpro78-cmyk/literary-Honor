<?php
declare(strict_types=1);

namespace LiteraryHonors;

use InvalidArgumentException;

final class WinnerPublishingService
{
    public function save(int $submissionId, string $awardName, string $year, bool $homepage, bool $archive): void
    {
        if (trim($awardName) === '' || !ctype_digit($year) || (int) $year < 2000 || (int) $year > 2100) {
            throw new InvalidArgumentException('Enter a valid award name and year.');
        }
        $winner = Database::connection()->prepare('SELECT id FROM submissions WHERE id = :id AND status = "winner"');
        $winner->execute(['id' => $submissionId]);
        if ($winner->fetch() === false) {
            throw new InvalidArgumentException('Only a confirmed winner can be published.');
        }
        $statement = Database::connection()->prepare(
            'INSERT INTO published_winners (submission_id, award_name, award_year, show_on_homepage, show_in_archive, published_at)
             VALUES (:submission_id, :award_name, :award_year, :homepage, :archive, CASE WHEN :is_published = 1 THEN NOW() ELSE NULL END)
             ON DUPLICATE KEY UPDATE award_name = VALUES(award_name), award_year = VALUES(award_year), show_on_homepage = VALUES(show_on_homepage), show_in_archive = VALUES(show_in_archive), published_at = CASE WHEN VALUES(show_on_homepage) = 1 OR VALUES(show_in_archive) = 1 THEN COALESCE(published_at, NOW()) ELSE NULL END'
        );
        $statement->execute([
            'submission_id' => $submissionId,
            'award_name' => trim($awardName),
            'award_year' => (int) $year,
            'homepage' => $homepage ? 1 : 0,
            'archive' => $archive ? 1 : 0,
            'is_published' => ($homepage || $archive) ? 1 : 0,
        ]);
    }
}
