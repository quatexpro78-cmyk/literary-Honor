<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/app/bootstrap.php';

use LiteraryHonors\AdminAuth;
use LiteraryHonors\Csrf;

Csrf::startSession();
if (!empty($_SESSION['admin_id'])) {
    header('Location: index.php', true, 302);
    exit;
}
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!Csrf::verify($_POST['csrf_token'] ?? null)) {
        $error = 'Your session expired. Please try again.';
    } elseif (AdminAuth::attempt((string) ($_POST['email'] ?? ''), (string) ($_POST['password'] ?? ''))) {
        header('Location: index.php', true, 302);
        exit;
    } else {
        $error = 'Email or password is incorrect.';
    }
}
?><!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Login | Literary Honors</title><link rel="stylesheet" href="../assets/css/style.css"></head>
<body><main class="site-container" style="max-width: 540px; padding: 6rem 1.5rem;"><p class="section-eyebrow">LITERARY HONORS</p><h1>Admin sign in</h1>
<?php if ($error !== ''): ?><p role="alert"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></p><?php endif; ?>
<form method="post"><input type="hidden" name="csrf_token" value="<?= htmlspecialchars(Csrf::token(), ENT_QUOTES, 'UTF-8') ?>"><p><label>Email<br><input required type="email" name="email" autocomplete="email"></label></p><p><label>Password<br><input required type="password" name="password" autocomplete="current-password"></label></p><button class="button button-primary" type="submit">Sign in</button></form></main></body></html>
