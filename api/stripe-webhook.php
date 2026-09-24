<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/app/bootstrap.php';

use LiteraryHonors\StripeWebhook;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

try {
    (new StripeWebhook())->verifyAndHandle(
        (string) file_get_contents('php://input'),
        (string) ($_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '')
    );
    http_response_code(200);
    echo 'ok';
} catch (Throwable $exception) {
    error_log($exception->getMessage());
    http_response_code(400);
    echo 'invalid webhook';
}
