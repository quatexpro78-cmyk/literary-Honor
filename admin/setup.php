<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/app/bootstrap.php';

use LiteraryHonors\AdminAuth;
use LiteraryHonors\Csrf;

$complete = false;
$error = '';
if (AdminAuth::hasAdmins()) {
    http_response_code(404);
    exit('Not found.');
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!Csrf::verify($_POST['csrf_token'] ?? null)) {
        $error = 'Your session expired. Please try again.';
    } elseif (AdminAuth::createFirstAdmin((string) ($_POST['name'] ?? ''), (string) ($_POST['email'] ?? ''), (string) ($_POST['password'] ?? ''), (string) ($_POST['setup_key'] ?? ''))) {
        $complete = true;
    } else {
        $error = 'Setup key, email, name, or password is invalid. Password must be at least 12 characters.';
    }
}
?><!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Setup | Literary Honors</title><link rel="stylesheet" href="../assets/css/style.css"></head>
<body><main class="site-container" style="max-width: 540px; padding: 6rem 1.5rem;"><p class="section-eyebrow">ONE-TIME SETUP</p><h1>Create Todd's admin account</h1>
<?php if ($complete): ?><p>Admin account created. <a href="login.php">Sign in now</a>.</p><?php else: ?>
<?php if ($error !== ''): ?><p role="alert"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></p><?php endif; ?>
<form method="post"><input type="hidden" name="csrf_token" value="<?= htmlspecialchars(Csrf::token(), ENT_QUOTES, 'UTF-8') ?>"><p><label>Name<br><input required name="name" autocomplete="name"></label></p><p><label>Email<br><input required type="email" name="email" autocomplete="email"></label></p><p><label>Password (12+ characters)<br><input required minlength="12" type="password" name="password" autocomplete="new-password"></label></p><p><label>One-time setup key<br><input required type="password" name="setup_key"></label></p><button class="button button-primary" type="submit">Create admin account</button></form><?php endif; ?></main></body></html>
