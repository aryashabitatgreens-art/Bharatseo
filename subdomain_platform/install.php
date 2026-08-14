<?php
/**
 * BharatSEO Platform — Database Setup & Installer
 * Run this script once in your browser to initialize all tables and seed data.
 */

require_once __DIR__ . '/config.php';

$message = '';
$status = 'idle';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['install_db'])) {
    $db_host = clean_input($_POST['db_host'] ?? DB_HOST);
    $db_user = clean_input($_POST['db_user'] ?? DB_USER);
    $db_pass = $_POST['db_pass'] ?? DB_PASS;
    $db_name = clean_input($_POST['db_name'] ?? DB_NAME);

    try {
        // Connect to server (without db first to create if not exists)
        $pdo = new PDO("mysql:host=$db_host;charset=utf8mb4", $db_user, $db_pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        // Create database if not exists
        $pdo->exec("CREATE DATABASE IF NOT EXISTS `$db_name` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $pdo->exec("USE `$db_name`");

        // Read schema.sql
        $schema_file = __DIR__ . '/schema.sql';
        if (!file_exists($schema_file)) {
            throw new Exception("schema.sql file not found in current directory.");
        }

        $sql = file_get_contents($schema_file);
        $pdo->exec($sql);

        $status = 'success';
        $message = "Database `$db_name` successfully created and seeded with 4 core product modules and roadmap milestones!";
    } catch (Exception $e) {
        $status = 'error';
        $message = "Database installation error: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BharatSEO Platform — 1-Click Database Installer</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
</head>
<body class="bg-slate-900 text-slate-100 font-sans min-h-screen flex items-center justify-center p-4">

  <div class="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6">
    
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 rounded-2xl bg-[#1A237E] border border-blue-500/30 flex items-center justify-center font-black text-[#FF9933] text-2xl shadow-lg">
        B
      </div>
      <div>
        <h1 class="text-xl font-bold text-white">Database Installer</h1>
        <p class="text-xs text-slate-400">BharatSEO Platform Subdomain</p>
      </div>
    </div>

    <?php if ($status === 'success'): ?>
      <div class="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs space-y-2">
        <p class="font-bold flex items-center gap-1.5 text-sm">
          <span>✓</span> Installation Completed Successfully!
        </p>
        <p><?php echo htmlspecialchars($message); ?></p>
        <div class="pt-3">
          <a href="index.php" class="inline-block px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition">
            Launch Platform Portal →
          </a>
        </div>
      </div>
    <?php elseif ($status === 'error'): ?>
      <div class="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs space-y-1">
        <p class="font-bold text-sm">✕ Installation Failed</p>
        <p><?php echo htmlspecialchars($message); ?></p>
      </div>
    <?php endif; ?>

    <form method="POST" class="space-y-4 text-xs">
      <div class="space-y-1">
        <label class="font-semibold text-slate-300">MySQL Host</label>
        <input type="text" name="db_host" value="<?php echo DB_HOST; ?>" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500" required />
      </div>

      <div class="space-y-1">
        <label class="font-semibold text-slate-300">Database Name</label>
        <input type="text" name="db_name" value="<?php echo DB_NAME; ?>" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500" required />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1">
          <label class="font-semibold text-slate-300">Database User</label>
          <input type="text" name="db_user" value="<?php echo DB_USER; ?>" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500" required />
        </div>

        <div class="space-y-1">
          <label class="font-semibold text-slate-300">Database Password</label>
          <input type="password" name="db_pass" value="<?php echo DB_PASS; ?>" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500" placeholder="••••••••" />
        </div>
      </div>

      <p class="text-[11px] text-slate-400 leading-relaxed">
        Clicking the button below will automatically create the database tables, seed the 4 core product schemas, and configure the roadmap milestones.
      </p>

      <button type="submit" name="install_db" value="1" class="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-[#FF9933] hover:from-blue-500 hover:to-orange-500 text-white font-bold text-sm shadow-lg transition active:scale-98">
        Run 1-Click Database Setup
      </button>
    </form>

    <div class="pt-2 text-center">
      <a href="index.php" class="text-xs text-slate-500 hover:text-slate-300 transition">
        ← Return to Platform Homepage
      </a>
    </div>

  </div>

</body>
</html>
