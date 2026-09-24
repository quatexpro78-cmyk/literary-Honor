<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/app/bootstrap.php';

use LiteraryHonors\Database;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');
try {
    $statement = Database::connection()->query(
        'SELECT pw.id, pw.award_name, pw.award_year, pw.show_on_homepage, pw.show_in_archive, s.book_title, s.pen_name, a.first_name, a.last_name
         FROM published_winners pw
         INNER JOIN submissions s ON s.id = pw.submission_id
         INNER JOIN authors a ON a.id = s.author_id
         WHERE pw.show_on_homepage = 1 OR pw.show_in_archive = 1
         ORDER BY pw.award_year DESC, pw.published_at DESC'
    );
    $winners = [];
    foreach ($statement->fetchAll() as $row) {
        $author = trim((string) ($row['pen_name'] ?: ($row['first_name'] . ' ' . $row['last_name'])));
        $winners[] = [
            'id' => 'published-' . $row['id'],
            'bookTitle' => $row['book_title'],
            'authorName' => $author,
            'category' => $row['award_name'],
            'awardYear' => (int) $row['award_year'],
            'coverImage' => 'api/winner-cover.php?id=' . (int) $row['id'],
            'featuredImage' => 'api/winner-cover.php?id=' . (int) $row['id'],
            'featured' => (bool) $row['show_on_homepage'],
            'showOnHomepage' => (bool) $row['show_on_homepage'],
            'showInArchive' => (bool) $row['show_in_archive'],
            'coverTheme' => 'gold',
            'description' => 'Recognized by Literary Honors Book Awards.'
        ];
    }
    echo json_encode(['winners' => $winners], JSON_THROW_ON_ERROR);
} catch (Throwable $exception) {
    http_response_code(500);
    echo json_encode(['winners' => []]);
}
