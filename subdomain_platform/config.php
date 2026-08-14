<?php
/**
 * BharatSEO Platform — Subdomain Configuration & DB Connection
 * Location: /subdomain_platform/config.php
 */

// Show errors during development (set to 0 in production)
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Database Credentials (Update with your cPanel / MySQL details)
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'bharatseo_platform');
define('DB_CHARSET', 'utf8mb4');

// Platform General Settings
define('PLATFORM_NAME', 'BharatSEO Platform');
define('PLATFORM_URL', 'https://platform.bharatseo.site');
define('MAIN_SITE_URL', 'https://bharatseo.site');
define('ADMIN_NOTIFICATION_EMAIL', 'deshifarmer295@gmail.com');
define('TARGET_LAUNCH_YEAR', '2027');

/**
 * PDO Database Singleton Connection
 */
function get_platform_db() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // Return null if database not yet configured (failsafe mode)
        return null;
    }
}

/**
 * Sanitize User Input
 */
function clean_input($data) {
    if (is_array($data)) {
        return array_map('clean_input', $data);
    }
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

/**
 * JSON Response Helper
 */
function json_response($success, $message, $data = []) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data'    => $data,
        'timestamp' => date('c')
    ]);
    exit;
}
