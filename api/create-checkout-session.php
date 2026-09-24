<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/app/bootstrap.php';

use LiteraryHonors\Csrf;
use LiteraryHonors\StripeCheckout;
use LiteraryHonors\SubmissionService;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed.');
}
if (!Csrf::verify($_POST['csrf_token'] ?? null)) {
    http_response_code(419);
    exit('Your form session expired. Please reload the page and try again.');
}

try {
    $submission = (new SubmissionService())->createAwaitingPayment($_POST, $_FILES);
    $checkoutUrl = (new StripeCheckout())->create($submission);
    header('Location: ' . $checkoutUrl, true, 303);
    exit;
} catch (InvalidArgumentException $exception) {
    http_response_code(422);
    exit(htmlspecialchars($exception->getMessage(), ENT_QUOTES, 'UTF-8'));
} catch (Throwable $exception) {
    error_log($exception->getMessage());
    http_response_code(500);
    exit('We could not start secure checkout. Please try again later.');
}
