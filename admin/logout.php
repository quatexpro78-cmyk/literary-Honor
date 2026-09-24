<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/app/bootstrap.php';

use LiteraryHonors\AdminAuth;
use LiteraryHonors\Csrf;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && Csrf::verify($_POST['csrf_token'] ?? null)) {
    AdminAuth::logout();
}
header('Location: login.php', true, 302);
