<?php
declare(strict_types=1);

spl_autoload_register(static function (string $class): void {
    $prefix = 'LiteraryHonors\\';
    if (!str_starts_with($class, $prefix)) {
        return;
    }

    $relativeClass = substr($class, strlen($prefix));
    $file = __DIR__ . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $relativeClass) . '.php';
    if (is_readable($file)) {
        require_once $file;
    }
});
