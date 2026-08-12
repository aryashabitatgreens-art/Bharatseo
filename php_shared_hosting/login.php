<?php
require_once __DIR__ . '/header.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = sanitize($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!empty($email) && !empty($password)) {
        if ($pdo) {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND status = 'active'");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_role'] = $user['role'];

                if ($user['role'] === 'admin') {
                    header("Location: admin.php");
                } else {
                    header("Location: dashboard.php");
                }
                exit();
            } else {
                $error = "Invalid email address or password.";
            }
        } else {
            $error = "Database connection error.";
        }
    } else {
        $error = "Please enter both email and password.";
    }
}
?>

<div class="max-w-md mx-auto px-4 py-16">
  <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-md space-y-6">
    <div class="text-center space-y-2">
      <div class="w-12 h-12 rounded-full bg-[#1A237E] text-white font-black text-2xl flex items-center justify-center mx-auto">
        <?php echo strtoupper(substr($site_name, 0, 1)); ?>
      </div>
      <h1 class="text-2xl font-black text-[#1A237E]">Client Portal Login</h1>
      <p class="text-slate-500 text-xs">Sign in to track active orders, campaigns, and support tickets</p>
    </div>

    <?php if (!empty($error)): ?>
      <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center">
        <?php echo $error; ?>
      </div>
    <?php endif; ?>

    <form action="login.php" method="POST" class="space-y-4 text-xs">
      <div>
        <label class="block text-slate-700 font-semibold mb-1">Email Address *</label>
        <input type="email" name="email" required placeholder="admin@bharatseo.in" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
      </div>

      <div>
        <label class="block text-slate-700 font-semibold mb-1">Password *</label>
        <input type="password" name="password" required placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
      </div>

      <button type="submit" class="w-full py-3.5 rounded-full bg-[#1A237E] hover:bg-blue-900 text-white font-bold transition shadow-sm">
        Sign In to Portal
      </button>
    </form>
  </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
