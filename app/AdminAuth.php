<?php
declare(strict_types=1);

namespace LiteraryHonors;

use PDO;

final class AdminAuth
{
    public static function attempt(string $email, string $password): bool
    {
        Csrf::startSession();
        $statement = Database::connection()->prepare('SELECT id, name, email, password_hash FROM admins WHERE email = :email LIMIT 1');
        $statement->execute(['email' => strtolower(trim($email))]);
        $admin = $statement->fetch();
        if ($admin === false || !password_verify($password, (string) $admin['password_hash'])) {
            return false;
        }
        session_regenerate_id(true);
        $_SESSION['admin_id'] = (int) $admin['id'];
        $_SESSION['admin_name'] = (string) $admin['name'];
        return true;
    }

    public static function requireAdmin(): void
    {
        Csrf::startSession();
        if (empty($_SESSION['admin_id'])) {
            header('Location: login.php', true, 302);
            exit;
        }
    }

    public static function logout(): void
    {
        Csrf::startSession();
        $_SESSION = [];
        session_destroy();
    }

    public static function adminId(): int
    {
        self::requireAdmin();
        return (int) $_SESSION['admin_id'];
    }

    public static function hasAdmins(): bool
    {
        return (int) Database::connection()->query('SELECT COUNT(*) FROM admins')->fetchColumn() > 0;
    }

    public static function createFirstAdmin(string $name, string $email, string $password, string $setupKey): bool
    {
        if (self::hasAdmins() || !hash_equals((string) Config::get('ADMIN_SETUP_KEY', ''), $setupKey)) {
            return false;
        }
        if (trim($name) === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 12) {
            return false;
        }
        $statement = Database::connection()->prepare('INSERT INTO admins (name, email, password_hash) VALUES (:name, :email, :password_hash)');
        $statement->execute([
            'name' => trim($name),
            'email' => strtolower(trim($email)),
            'password_hash' => password_hash($password, PASSWORD_DEFAULT),
        ]);
        return true;
    }
}
