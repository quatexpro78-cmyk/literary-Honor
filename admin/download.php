<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/app/bootstrap.php';

use LiteraryHonors\AdminAuth;
use LiteraryHonors\Database;

AdminAuth::requireAdmin();
$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
$file = (string) ($_GET['file'] ?? '');
if ($id === false || $id === null || !in_array($file, ['manuscript', 'cover'], true)) {
    http_response_code(404);
    exit('Not found.');
}
$column = $file === 'manuscript' ? 'manuscript_path' : 'cover_path';
$statement = Database::connection()->prepare("SELECT {$column} AS file_path FROM submissions WHERE id = :id LIMIT 1");
$statement->execute(['id' => $id]);
$path = $statement->fetchColumn();
$absolute = dirname(__DIR__) . '/storage/uploads/' . $path;
if (!is_string($path) || $path === '' || !is_file($absolute)) {
    http_response_code(404);
    exit('File not found.');
}
header('Content-Type: application/octet-stream');
header('Content-Length: ' . (string) filesize($absolute));
header('Content-Disposition: attachment; filename="' . basename($path) . '"');
readfile($absolute);
