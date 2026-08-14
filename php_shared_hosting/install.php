<?php
/**
 * Bharat SEO - 1-Click Database & Configuration Auto-Installer
 * Upload files to cPanel/Hostinger and visit yourdomain.com/install.php
 */

session_start();

$step = isset($_GET['step']) ? intval($_GET['step']) : 1;
$error = '';
$success = '';

if ($step === 2 && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $db_host = trim($_POST['db_host'] ?? 'localhost');
    $db_name = trim($_POST['db_name'] ?? '');
    $db_user = trim($_POST['db_user'] ?? '');
    $db_pass = $_POST['db_pass'] ?? '';
    $site_url = rtrim(trim($_POST['site_url'] ?? ''), '/');

    if (empty($db_name) || empty($db_user)) {
        $error = 'Please enter Database Name and Database User.';
        $step = 1;
    } else {
        try {
            // Test PDO Connection
            $pdo = new PDO("mysql:host=$db_host;charset=utf8mb4", $db_user, $db_pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);

            // Create Database if not exists
            $pdo->exec("CREATE DATABASE IF NOT EXISTS `$db_name` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            $pdo->exec("USE `$db_name`");

            // Import schema.sql
            $schema_file = __DIR__ . '/schema.sql';
            if (file_exists($schema_file)) {
                $sql = file_get_contents($schema_file);
                // Execute multi queries
                $pdo->exec($sql);
            }

            // Ensure Admin user has valid fresh hash
            $admin_hash = password_hash('admin123', PASSWORD_DEFAULT);
            $stmt_admin = $pdo->prepare("INSERT INTO users (name, email, phone, password, role, status) VALUES ('Bharat SEO Admin', 'ceo@bharatseo.site', '+91 95208 68276', ?, 'admin', 'active') ON DUPLICATE KEY UPDATE password = ?");
            $stmt_admin->execute([$admin_hash, $admin_hash]);

            // Write config.php
            $config_content = "<?php\n";
            $config_content .= "/**\n * Auto-generated configuration by Installer\n */\n\n";
            $config_content .= "if (session_status() === PHP_SESSION_NONE) {\n    session_start();\n}\n\n";
            $config_content .= "define('DB_HOST', '" . addslashes($db_host) . "');\n";
            $config_content .= "define('DB_USER', '" . addslashes($db_user) . "');\n";
            $config_content .= "define('DB_PASS', '" . addslashes($db_pass) . "');\n";
            $config_content .= "define('DB_NAME', '" . addslashes($db_name) . "');\n";
            $config_content .= "define('SITE_URL', '" . addslashes($site_url) . "');\n\n";
            $config_content .= "try {\n";
            $config_content .= "    \$pdo = new PDO(\"mysql:host=\" . DB_HOST . \";dbname=\" . DB_NAME . \";charset=utf8mb4\", DB_USER, DB_PASS, [\n";
            $config_content .= "        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n";
            $config_content .= "        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,\n";
            $config_content .= "        PDO::ATTR_EMULATE_PREPARES => false,\n";
            $config_content .= "    ]);\n";
            $config_content .= "} catch (PDOException \$e) {\n";
            $config_content .= "    \$pdo = null;\n";
            $config_content .= "}\n\n";
            $config_content .= "function get_setting(\$pdo, \$key, \$default = '') {\n";
            $config_content .= "    if (!\$pdo) return \$default;\n";
            $config_content .= "    try {\n";
            $config_content .= "        \$stmt = \$pdo->prepare(\"SELECT value FROM settings WHERE key_name = ?\");\n";
            $config_content .= "        \$stmt->execute([\$key]);\n";
            $config_content .= "        \$row = \$stmt->fetch();\n";
            $config_content .= "        return \$row ? \$row['value'] : \$default;\n";
            $config_content .= "    } catch (Exception \$e) {\n";
            $config_content .= "        return \$default;\n";
            $config_content .= "    }\n";
            $config_content .= "}\n\n";
            $config_content .= "function save_setting(\$pdo, \$key, \$value) {\n";
            $config_content .= "    if (!\$pdo) return false;\n";
            $config_content .= "    \$stmt = \$pdo->prepare(\"INSERT INTO settings (key_name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?\");\n";
            $config_content .= "    return \$stmt->execute([\$key, \$value, \$value]);\n";
            $config_content .= "}\n\n";
            $config_content .= "function is_logged_in() { return !empty(\$_SESSION['user_id']); }\n";
            $config_content .= "function is_admin() { return !empty(\$_SESSION['user_role']) && \$_SESSION['user_role'] === 'admin'; }\n";
            $config_content .= "function get_current_user_data() {\n";
            $config_content .= "    return [\n";
            $config_content .= "        'id' => \$_SESSION['user_id'] ?? null,\n";
            $config_content .= "        'name' => \$_SESSION['user_name'] ?? 'Guest',\n";
            $config_content .= "        'email' => \$_SESSION['user_email'] ?? '',\n";
            $config_content .= "        'role' => \$_SESSION['user_role'] ?? 'user'\n";
            $config_content .= "    ];\n";
            $config_content .= "}\n\n";
            $config_content .= "function sanitize(\$data) { return htmlspecialchars(trim(\$data ?? ''), ENT_QUOTES, 'UTF-8'); }\n";
            $config_content .= "function json_response(\$data, \$status = 200) {\n";
            $config_content .= "    http_response_code(\$status);\n";
            $config_content .= "    header('Content-Type: application/json; charset=utf-8');\n";
            $config_content .= "    echo json_encode(\$data);\n";
            $config_content .= "    exit();\n";
            $config_content .= "}\n";

            file_put_contents(__DIR__ . '/config.php', $config_content);

            $step = 3;
            $success = "Database installation & setup completed successfully!";
        } catch (Exception $e) {
            $error = "Database Error: " . $e->getMessage();
            $step = 1;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bharat SEO - Shared Hosting Auto Installer</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style> body { font-family: 'Plus Jakarta Sans', sans-serif; } </style>
</head>
<body class="bg-slate-100 text-slate-800 min-h-screen flex items-center justify-center p-4">
  <div class="max-w-xl w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-xl space-y-6">
    
    <div class="text-center space-y-2">
      <div class="w-12 h-12 rounded-full bg-[#1A237E] text-[#FF9933] font-black text-2xl flex items-center justify-center mx-auto shadow-md">
        B
      </div>
      <h1 class="text-2xl font-black text-[#1A237E]">Shared Hosting Web Installer</h1>
      <p class="text-xs text-slate-500">1-Click Automated Database & Configuration Setup</p>
    </div>

    <?php if (!empty($error)): ?>
      <div class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
        ❌ <?php echo htmlspecialchars($error); ?>
      </div>
    <?php endif; ?>

    <?php if ($step === 1): ?>
      <form action="install.php?step=2" method="POST" class="space-y-4 text-xs">
        <div>
          <label class="block font-semibold text-slate-700 mb-1">MySQL Database Host *</label>
          <input type="text" name="db_host" required value="localhost" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
          <p class="text-[10px] text-slate-400 mt-1">Usually 'localhost' in cPanel or Hostinger.</p>
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">MySQL Database Name *</label>
          <input type="text" name="db_name" required placeholder="e.g. u123456_bharat_db" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Database Username *</label>
            <input type="text" name="db_user" required placeholder="e.g. u123456_bharat_user" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Database Password</label>
            <input type="password" name="db_pass" placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
          </div>
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">Website URL *</label>
          <input type="url" name="site_url" required value="<?php echo 'http://' . ($_SERVER['HTTP_HOST'] ?? 'localhost'); ?>" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
        </div>

        <button type="submit" class="w-full py-3.5 rounded-full bg-[#1A237E] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition">
          Run 1-Click Database Setup & Install
        </button>
      </form>

    <?php elseif ($step === 3): ?>
      <div class="space-y-4 text-center">
        <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold space-y-1">
          <p class="text-base">🎉 Installation Completed!</p>
          <p><?php echo $success; ?></p>
        </div>

        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
          <p class="font-bold text-[#1A237E]">Admin Login Details:</p>
          <p>• <strong>Login URL:</strong> <a href="login.php" class="text-blue-600 underline">login.php</a></p>
          <p>• <strong>Email:</strong> ceo@bharatseo.site</p>
          <p>• <strong>Password:</strong> admin123</p>
        </div>

        <div class="pt-2">
          <a href="index.php" class="inline-block py-3 px-8 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs shadow-md transition">
            Go to Homepage
          </a>
        </div>
      </div>
    <?php endif; ?>

  </div>
</body>
</html>
