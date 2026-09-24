<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/app/bootstrap.php';

use LiteraryHonors\AdminAuth;
use LiteraryHonors\Csrf;
use LiteraryHonors\Database;

AdminAuth::requireAdmin();
$allowed = ['submitted', 'under_review', 'result_date_sent', 'reviewed', 'winner', 'not_selected'];
$status = (string) ($_GET['status'] ?? 'submitted');
if (!in_array($status, $allowed, true)) {
    $status = 'submitted';
}
$statement = Database::connection()->prepare(
    'SELECT s.id, s.public_id, s.book_title, s.status, s.submitted_at, a.first_name, a.last_name, a.email,
            GROUP_CONCAT(sc.category_slug ORDER BY sc.category_slug SEPARATOR ", ") AS categories
     FROM submissions s INNER JOIN authors a ON a.id = s.author_id
     LEFT JOIN submission_categories sc ON sc.submission_id = s.id
     WHERE s.status = :status
     GROUP BY s.id, s.public_id, s.book_title, s.status, s.submitted_at, a.first_name, a.last_name, a.email
     ORDER BY s.submitted_at ASC'
);
$statement->execute(['status' => $status]);
$submissions = $statement->fetchAll();
?><!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Review Queue | Literary Honors</title><link rel="stylesheet" href="../assets/css/style.css"></head>
<body><main class="site-container" style="padding: 3rem 1.5rem;"><p class="section-eyebrow">ADMIN DASHBOARD</p><h1>Book review queue</h1><p>Signed in as <?= htmlspecialchars((string) $_SESSION['admin_name'], ENT_QUOTES, 'UTF-8') ?> · <form style="display:inline" method="post" action="logout.php"><input type="hidden" name="csrf_token" value="<?= htmlspecialchars(Csrf::token(), ENT_QUOTES, 'UTF-8') ?>"><button type="submit">Sign out</button></form></p>
<p><?php foreach ($allowed as $item): ?><a href="?status=<?= urlencode($item) ?>"><?= htmlspecialchars(ucwords(str_replace('_', ' ', $item)), ENT_QUOTES, 'UTF-8') ?></a> &nbsp;<?php endforeach; ?></p>
<?php if ($submissions === []): ?><p>No <?= htmlspecialchars(str_replace('_', ' ', $status), ENT_QUOTES, 'UTF-8') ?> submissions.</p><?php else: ?><table><thead><tr><th>Book</th><th>Author</th><th>Categories</th><th>Submitted</th><th></th></tr></thead><tbody><?php foreach ($submissions as $submission): ?><tr><td><?= htmlspecialchars((string) $submission['book_title'], ENT_QUOTES, 'UTF-8') ?></td><td><?= htmlspecialchars($submission['first_name'] . ' ' . $submission['last_name'], ENT_QUOTES, 'UTF-8') ?><br><?= htmlspecialchars((string) $submission['email'], ENT_QUOTES, 'UTF-8') ?></td><td><?= htmlspecialchars((string) $submission['categories'], ENT_QUOTES, 'UTF-8') ?></td><td><?= htmlspecialchars((string) $submission['submitted_at'], ENT_QUOTES, 'UTF-8') ?></td><td><a href="review.php?id=<?= (int) $submission['id'] ?>">Review</a></td></tr><?php endforeach; ?></tbody></table><?php endif; ?></main></body></html>
