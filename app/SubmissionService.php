<?php
declare(strict_types=1);

namespace LiteraryHonors;

use InvalidArgumentException;
use PDO;
use RuntimeException;

final class SubmissionService
{
    /** @var array<int, int> */
    private const ENTRY_FEES = [1 => 6500, 2 => 12500, 3 => 18000, 4 => 23000, 5 => 27500];

    /** @param array<string, mixed> $input @param array<string, array<string, mixed>> $files */
    public function createAwaitingPayment(array $input, array $files): array
    {
        $data = $this->validate($input, $files);
        $pdo = Database::connection();
        $pdo->beginTransaction();

        try {
            $authorId = $this->findOrCreateAuthor($pdo, $data);
            $publicId = $this->uuid();
            $manuscript = $this->storeUpload($files['manuscript'], 'manuscripts');
            $cover = $this->storeUpload($files['book_cover'], 'covers');

            $statement = $pdo->prepare(
                'INSERT INTO submissions (public_id, author_id, pen_name, book_title, book_type, website_url, social_media, book_url, manuscript_path, cover_path, status)
                 VALUES (:public_id, :author_id, :pen_name, :book_title, :book_type, :website_url, :social_media, :book_url, :manuscript_path, :cover_path, "awaiting_payment")'
            );
            $statement->execute([
                'public_id' => $publicId,
                'author_id' => $authorId,
                'pen_name' => $data['author_name'],
                'book_title' => $data['book_title'],
                'book_type' => $data['book_type'],
                'website_url' => $data['website'] ?: null,
                'social_media' => $data['social'] ?: null,
                'book_url' => $data['book_url'] ?: null,
                'manuscript_path' => $manuscript,
                'cover_path' => $cover,
            ]);
            $submissionId = (int) $pdo->lastInsertId();

            $categoryStatement = $pdo->prepare('INSERT INTO submission_categories (submission_id, category_slug) VALUES (:submission_id, :category)');
            foreach ($data['categories'] as $category) {
                $categoryStatement->execute(['submission_id' => $submissionId, 'category' => $category]);
            }

            $pdo->commit();
            return [
                'id' => $submissionId,
                'public_id' => $publicId,
                'author_email' => $data['email'],
                'book_title' => $data['book_title'],
                'category_count' => count($data['categories']),
                'amount_minor' => self::ENTRY_FEES[count($data['categories'])],
            ];
        } catch (\Throwable $exception) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            throw $exception;
        }
    }

    /** @param array<string, mixed> $input @param array<string, array<string, mixed>> $files @return array<string, mixed> */
    private function validate(array $input, array $files): array
    {
        $required = ['first_name', 'last_name', 'email', 'book_title', 'book_type'];
        foreach ($required as $field) {
            if (trim((string) ($input[$field] ?? '')) === '') {
                throw new InvalidArgumentException('Please complete all required fields.');
            }
        }
        if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Please enter a valid email address.');
        }
        if (($input['agreement'] ?? '') !== '1') {
            throw new InvalidArgumentException('Please confirm that your information is accurate.');
        }

        $categories = array_values(array_unique(array_filter((array) ($input['category'] ?? []), 'is_string')));
        if (count($categories) < 1 || count($categories) > 5) {
            throw new InvalidArgumentException('Select between one and five categories.');
        }
        foreach (['manuscript', 'book_cover'] as $field) {
            if (!isset($files[$field]) || ($files[$field]['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
                throw new InvalidArgumentException('Please upload your manuscript and book cover.');
            }
        }

        return [
            'first_name' => trim((string) $input['first_name']),
            'last_name' => trim((string) $input['last_name']),
            'email' => strtolower(trim((string) $input['email'])),
            'phone' => trim((string) ($input['phone'] ?? '')),
            'author_name' => trim((string) ($input['author_name'] ?? '')),
            'book_title' => trim((string) $input['book_title']),
            'book_type' => trim((string) $input['book_type']),
            'website' => trim((string) ($input['website'] ?? '')),
            'social' => trim((string) ($input['social'] ?? '')),
            'book_url' => trim((string) ($input['book_url'] ?? '')),
            'categories' => $categories,
        ];
    }

    /** @param array<string, mixed> $data */
    private function findOrCreateAuthor(PDO $pdo, array $data): int
    {
        $find = $pdo->prepare('SELECT id FROM authors WHERE email = :email LIMIT 1');
        $find->execute(['email' => $data['email']]);
        $existing = $find->fetch();
        if ($existing !== false) {
            return (int) $existing['id'];
        }

        $insert = $pdo->prepare('INSERT INTO authors (first_name, last_name, email, phone) VALUES (:first_name, :last_name, :email, :phone)');
        $insert->execute([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?: null,
        ]);
        return (int) $pdo->lastInsertId();
    }

    /** @param array<string, mixed> $file */
    private function storeUpload(array $file, string $folder): string
    {
        $allowed = $folder === 'manuscripts'
            ? ['application/pdf' => 'pdf', 'application/msword' => 'doc', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx']
            : ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'application/pdf' => 'pdf'];
        $mime = (new \finfo(FILEINFO_MIME_TYPE))->file((string) $file['tmp_name']);
        if (!isset($allowed[$mime])) {
            throw new InvalidArgumentException('One of the uploaded files has an unsupported format.');
        }
        if ((int) $file['size'] > 15 * 1024 * 1024) {
            throw new InvalidArgumentException('Each uploaded file must be 15 MB or smaller.');
        }

        $directory = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $folder;
        if (!is_dir($directory) && !mkdir($directory, 0750, true) && !is_dir($directory)) {
            throw new RuntimeException('Unable to prepare secure upload storage.');
        }
        $name = bin2hex(random_bytes(20)) . '.' . $allowed[$mime];
        if (!move_uploaded_file((string) $file['tmp_name'], $directory . DIRECTORY_SEPARATOR . $name)) {
            throw new RuntimeException('Unable to save an uploaded file.');
        }
        return $folder . '/' . $name;
    }

    private function uuid(): string
    {
        $bytes = random_bytes(16);
        $bytes[6] = chr((ord($bytes[6]) & 0x0f) | 0x40);
        $bytes[8] = chr((ord($bytes[8]) & 0x3f) | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($bytes), 4));
    }
}
