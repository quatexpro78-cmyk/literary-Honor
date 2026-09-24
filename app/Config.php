<?php
declare(strict_types=1);

namespace LiteraryHonors;

final class Config
{
    /** @var array<string, string> */
    private static array $values = [];
    private static bool $loaded = false;

    public static function get(string $key, ?string $default = null): ?string
    {
        self::load();

        $environmentValue = getenv($key);
        if ($environmentValue !== false) {
            return $environmentValue;
        }

        return self::$values[$key] ?? $default;
    }

    private static function load(): void
    {
        if (self::$loaded) {
            return;
        }

        self::$loaded = true;
        $file = dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env';
        if (!is_readable($file)) {
            return;
        }

        $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false) {
            return;
        }

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
                continue;
            }

            [$key, $value] = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            self::$values[$key] = trim($value, "\"'");
        }
    }
}
