<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/app/bootstrap.php';

use LiteraryHonors\Database;

$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if ($id === false || $id === null) { http_response_code(404); exit; }
$statement = Database::connection()->prepare('SELECT s.cover_path FROM published_winners pw INNER JOIN submissions s ON s.id = pw.submission_id WHERE pw.id = :id AND (pw.show_on_homepage = 1 OR pw.show_in_archive = 1) LIMIT 1');
$statement->execute(['id' => $id]);
$path = $statement->fetchColumn();
$absolute = dirname(__DIR__) . '/storage/uploads/' . $path;
if (!is_string($path) || $path === '' || !is_file($absolute)) { http_response_code(404); exit; }
$mime = (new finfo(FILEINFO_MIME_TYPE))->file($absolute) ?: 'application/octet-stream';
header('Content-Type: ' . $mime);
header('Content-Length: ' . (string) filesize($absolute));
header('Cache-Control: public, max-age=86400');
readfile($absolute);
