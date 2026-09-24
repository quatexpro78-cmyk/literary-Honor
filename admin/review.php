<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/app/bootstrap.php';

use LiteraryHonors\AdminAuth;
use LiteraryHonors\Csrf;
use LiteraryHonors\Database;
use LiteraryHonors\ReviewService;
use LiteraryHonors\WinnerPublishingService;

$adminId = AdminAuth::adminId();
$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if ($id === false || $id === null) { http_response_code(404); exit('Not found.'); }
$message = ''; $error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (!Csrf::verify($_POST['csrf_token'] ?? null)) { throw new InvalidArgumentException('Your session expired. Please try again.'); }
        $service = new ReviewService();
        if (($_POST['action'] ?? '') === 'result_date') {
            $service->setResultDate($id, $adminId, (string) ($_POST['result_due_date'] ?? ''));
            $message = 'Result date saved and author email queued.';
        } elseif (($_POST['action'] ?? '') === 'complete_review') {
            $service->complete($id, $adminId, (string) ($_POST['score'] ?? ''), (string) ($_POST['decision'] ?? ''), (string) ($_POST['notes'] ?? ''));
            $message = 'Final result saved and author email queued.';
        } elseif (($_POST['action'] ?? '') === 'publish_winner') {
            (new WinnerPublishingService())->save($id, (string) ($_POST['award_name'] ?? ''), (string) ($_POST['award_year'] ?? ''), isset($_POST['show_on_homepage']), isset($_POST['show_in_archive']));
            $message = 'Winner publishing settings saved.';
        }
    } catch (Throwable $exception) { $error = $exception->getMessage(); }
}
$statement = Database::connection()->prepare('SELECT s.*, a.first_name, a.last_name, a.email, r.score, r.result_due_date, r.decision, r.notes FROM submissions s INNER JOIN authors a ON a.id = s.author_id LEFT JOIN reviews r ON r.submission_id = s.id WHERE s.id = :id LIMIT 1');
$statement->execute(['id' => $id]); $submission = $statement->fetch();
if ($submission === false) { http_response_code(404); exit('Not found.'); }
$publishedStatement = Database::connection()->prepare('SELECT * FROM published_winners WHERE submission_id = :id LIMIT 1');
$publishedStatement->execute(['id' => $id]); $published = $publishedStatement->fetch() ?: [];
?><!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Review Book | Literary Honors</title><link rel="stylesheet" href="../assets/css/style.css"></head><body><main class="site-container" style="max-width:820px;padding:3rem 1.5rem;"><p><a href="index.php">← Review queue</a></p><p class="section-eyebrow">SUBMISSION REVIEW</p><h1><?= htmlspecialchars((string) $submission['book_title'], ENT_QUOTES, 'UTF-8') ?></h1><p><?= htmlspecialchars($submission['first_name'] . ' ' . $submission['last_name'] . ' · ' . $submission['email'], ENT_QUOTES, 'UTF-8') ?></p><p><a href="download.php?id=<?= (int) $id ?>&file=manuscript">Download manuscript</a> · <a href="download.php?id=<?= (int) $id ?>&file=cover">Download cover</a></p><?php if ($message): ?><p role="status"><?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?></p><?php endif; ?><?php if ($error): ?><p role="alert"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></p><?php endif; ?><hr><h2>Share result date</h2><form method="post"><input type="hidden" name="csrf_token" value="<?= htmlspecialchars(Csrf::token(), ENT_QUOTES, 'UTF-8') ?>"><input type="hidden" name="action" value="result_date"><label>Result date <input required type="date" name="result_due_date" value="<?= htmlspecialchars((string) ($submission['result_due_date'] ?? ''), ENT_QUOTES, 'UTF-8') ?>"></label><button type="submit">Save and email author</button></form><hr><h2>Complete review</h2><form method="post"><input type="hidden" name="csrf_token" value="<?= htmlspecialchars(Csrf::token(), ENT_QUOTES, 'UTF-8') ?>"><input type="hidden" name="action" value="complete_review"><p><label>Score / 100 <input required type="number" min="0" max="100" step="0.01" name="score" value="<?= htmlspecialchars((string) ($submission['score'] ?? ''), ENT_QUOTES, 'UTF-8') ?>"></label></p><p><label>Decision <select required name="decision"><option value="">Choose</option><option value="winner" <?= ($submission['decision'] ?? '') === 'winner' ? 'selected' : '' ?>>Winner</option><option value="not_selected" <?= ($submission['decision'] ?? '') === 'not_selected' ? 'selected' : '' ?>>Not selected</option></select></label></p><p><label>Review notes (optional)<br><textarea name="notes" rows="8"><?= htmlspecialchars((string) ($submission['notes'] ?? ''), ENT_QUOTES, 'UTF-8') ?></textarea></label></p><button class="button button-primary" type="submit">Save result and email author</button></form><?php if ($submission['status'] === 'winner'): ?><hr><h2>Publish winner</h2><form method="post"><input type="hidden" name="csrf_token" value="<?= htmlspecialchars(Csrf::token(), ENT_QUOTES, 'UTF-8') ?>"><input type="hidden" name="action" value="publish_winner"><p><label>Award name <input required name="award_name" value="<?= htmlspecialchars((string) ($published['award_name'] ?? 'Literary Honors Winner'), ENT_QUOTES, 'UTF-8') ?>"></label></p><p><label>Award year <input required type="number" min="2000" max="2100" name="award_year" value="<?= htmlspecialchars((string) ($published['award_year'] ?? date('Y')), ENT_QUOTES, 'UTF-8') ?>"></label></p><p><label><input type="checkbox" name="show_on_homepage" <?= !empty($published['show_on_homepage']) ? 'checked' : '' ?>> Publish on homepage</label></p><p><label><input type="checkbox" name="show_in_archive" <?= !empty($published['show_in_archive']) ? 'checked' : '' ?>> Publish in winner archive</label></p><button class="button button-primary" type="submit">Save publishing settings</button></form><?php endif; ?></main></body></html>
