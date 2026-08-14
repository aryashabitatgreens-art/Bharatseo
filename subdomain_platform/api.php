<?php
/**
 * BharatSEO Platform — Subdomain REST API
 * Handles Waitlist signups, Feature Upvotes, and Early Access queries.
 */

require_once __DIR__ . '/config.php';

// Enable CORS if needed
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$action = isset($_GET['action']) ? clean_input($_GET['action']) : '';

// 1. ACTION: WAITLIST REGISTRATION
if ($action === 'join_waitlist' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $input = json_decode($raw, true) ?? $_POST;

    $full_name = isset($input['full_name']) ? clean_input($input['full_name']) : '';
    $email     = isset($input['email']) ? clean_input($input['email']) : '';
    $phone     = isset($input['phone']) ? clean_input($input['phone']) : '';
    $role_type = isset($input['role_type']) ? clean_input($input['role_type']) : 'business_owner';
    $modules   = isset($input['modules']) ? (is_array($input['modules']) ? implode(',', $input['modules']) : clean_input($input['modules'])) : 'all';
    $company   = isset($input['company_name']) ? clean_input($input['company_name']) : '';
    $feedback  = isset($input['feedback']) ? clean_input($input['feedback']) : '';
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

    if (empty($full_name) || empty($email)) {
        json_response(false, 'Please provide both your full name and valid email address.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_response(false, 'Please provide a valid email format (e.g., name@domain.com).');
    }

    $db = get_platform_db();

    if ($db) {
        try {
            // Check if already registered
            $stmt = $db->prepare("SELECT id FROM platform_waitlist WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->fetch()) {
                json_response(true, 'You are already on our early access VIP list! We will notify you as soon as testing opens.', ['already_registered' => true]);
            }

            $insert = $db->prepare("INSERT INTO platform_waitlist (full_name, email, phone, role_type, interested_modules, company_name, feedback_notes, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $insert->execute([$full_name, $email, $phone, $role_type, $modules, $company, $feedback, $ip_address]);

            json_response(true, '🎉 Congratulations! You have successfully reserved your Early Access VIP pass for BharatSEO Platform 2027.', ['id' => $db->lastInsertId()]);
        } catch (PDOException $e) {
            // Fallback to local JSON storage if table error
            save_waitlist_json($full_name, $email, $phone, $role_type, $modules, $company, $feedback);
            json_response(true, '🎉 You are registered for the BharatSEO Platform 2027 early access waitlist!');
        }
    } else {
        // Fallback to local JSON storage if MySQL is not configured yet
        save_waitlist_json($full_name, $email, $phone, $role_type, $modules, $company, $feedback);
        json_response(true, '🎉 You are registered for the BharatSEO Platform 2027 early access waitlist! (Stored in Local Cache)');
    }
}

// 2. ACTION: GET ROADMAP & METADATA
if ($action === 'get_roadmap') {
    $db = get_platform_db();
    if ($db) {
        try {
            $stmt = $db->query("SELECT * FROM platform_roadmap_milestones ORDER BY display_order ASC");
            $milestones = $stmt->fetchAll();
            json_response(true, 'Roadmap fetched successfully', $milestones);
        } catch (Exception $e) {
            json_response(false, 'Could not fetch database roadmap');
        }
    } else {
        json_response(false, 'Database connection offline');
    }
}

function save_waitlist_json($name, $email, $phone, $role, $modules, $company, $notes) {
    $file = __DIR__ . '/waitlist_subscribers.json';
    $current = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    if (!is_array($current)) $current = [];

    $current[] = [
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'role' => $role,
        'modules' => $modules,
        'company' => $company,
        'notes' => $notes,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
        'timestamp' => date('Y-m-d H:i:s')
    ];

    @file_put_contents($file, json_encode($current, JSON_PRETTY_PRINT));
}

// Default fallback
json_response(false, 'Invalid API endpoint or action parameter.');
