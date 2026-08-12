<?php
/**
 * Bharat SEO - Shared Hosting PHP Application Configuration
 * Works on any cPanel, Hostinger, GoDaddy, LiteSpeed, or Apache server with PHP 7.4 / 8.0+ & MySQL
 */

// Start session if not already active
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Database Credentials (Update these with your cPanel MySQL details)
define('DB_HOST', 'localhost');
define('DB_USER', 'root');        // cPanel DB Username (e.g., u123456_bharat)
define('DB_PASS', '');            // cPanel DB Password
define('DB_NAME', 'bharat_seo_db');// cPanel DB Name

// Site URL Configuration
define('SITE_URL', 'http://' . ($_SERVER['HTTP_HOST'] ?? 'localhost'));

// Connect to MySQL Database via PDO
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    // If DB is not connected yet, allow setup mode or show clear error message
    $pdo = null;
    $db_error = $e->getMessage();
}

// Helper: Get Site Setting from DB
function get_setting($pdo, $key, $default = '') {
    if (!$pdo) return $default;
    try {
        $stmt = $pdo->prepare("SELECT value FROM settings WHERE key_name = ?");
        $stmt->execute([$key]);
        $row = $stmt->fetch();
        return $row ? $row['value'] : $default;
    } catch (Exception $e) {
        return $default;
    }
}

// Helper: Save/Update Site Setting
function save_setting($pdo, $key, $value) {
    if (!$pdo) return false;
    $stmt = $pdo->prepare("INSERT INTO settings (key_name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?");
    return $stmt->execute([$key, $value, $value]);
}

// Authentication Helpers
function is_logged_in() {
    return !empty($_SESSION['user_id']);
}

function is_admin() {
    return !empty($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin';
}

function get_current_user_data() {
    return [
        'id' => $_SESSION['user_id'] ?? null,
        'name' => $_SESSION['user_name'] ?? 'Guest',
        'email' => $_SESSION['user_email'] ?? '',
        'role' => $_SESSION['user_role'] ?? 'user'
    ];
}

function sanitize($data) {
    return htmlspecialchars(trim($data ?? ''), ENT_QUOTES, 'UTF-8');
}

function json_response($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit();
}
?>
