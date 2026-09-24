<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/app/bootstrap.php';

use LiteraryHonors\Csrf;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
echo json_encode(['token' => Csrf::token()], JSON_THROW_ON_ERROR);
