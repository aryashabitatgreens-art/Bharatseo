<?php
require_once __DIR__ . '/config.php';

$site_name = get_setting($pdo, 'site_name', 'Bharat SEO');
$contact_phone = get_setting($pdo, 'contact_phone', '+91 98765 43210');
$whatsapp_number = get_setting($pdo, 'whatsapp_number', '919876543210');
$current_page = basename($_SERVER['PHP_SELF'], '.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo sanitize($site_name); ?> — Premium SEO & Web Agency</title>
    <meta name="description" content="<?php echo sanitize(get_setting($pdo, 'agency_tagline', 'Digital Marketing Agency')); ?>">
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              navy: '#1A237E',
              saffron: '#FF9933',
            }
          }
        }
      }
    </script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Inter Font -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
      body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col justify-between">

<!-- Header Navbar -->
<header class="sticky top-0 z-40 bg-white text-slate-800 shadow-sm border-b border-slate-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
    <!-- Logo -->
    <a href="index.php" class="flex items-center space-x-2.5">
      <div class="w-10 h-10 rounded-full bg-[#1A237E] text-white font-black text-xl flex items-center justify-center shadow-md">
        <?php echo strtoupper(substr($site_name, 0, 1)); ?>
      </div>
      <div>
        <span class="text-xl font-black text-[#1A237E] tracking-tight">
          <?php echo strtoupper(substr($site_name, 0, 6)); ?><span class="text-[#FF9933]"><?php echo strtoupper(substr($site_name, 6)); ?></span>
        </span>
        <p class="text-[10px] text-slate-500 tracking-wider uppercase font-semibold">Digital & Web Engineering</p>
      </div>
    </a>

    <!-- Desktop Navigation -->
    <nav class="hidden lg:flex items-center space-x-1">
      <?php
      $nav_links = [
        'index' => 'Home',
        'services' => 'Services & Pricing',
        'about' => 'About Us',
        'portfolio' => 'Case Studies',
        'blog' => 'Insights',
        'career' => 'Careers',
        'contact' => 'Contact'
      ];
      foreach ($nav_links as $file => $label) {
          $is_active = ($current_page === $file || ($current_page === '' && $file === 'index'));
          $active_class = $is_active ? 'bg-slate-100 text-[#1A237E] font-bold' : 'text-slate-600 hover:text-[#1A237E] hover:bg-slate-50 font-medium';
          echo '<a href="' . $file . '.php" class="px-3.5 py-2 rounded-full text-xs transition ' . $active_class . '">' . $label . '</a>';
      }
      ?>
    </nav>

    <!-- Action Buttons -->
    <div class="hidden sm:flex items-center space-x-3">
      <?php if (is_logged_in()): ?>
        <a href="dashboard.php" class="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#1A237E] font-bold text-xs flex items-center gap-1.5 transition">
          <i class="fa-solid fa-gauge"></i> Client Dashboard
        </a>
        <?php if (is_admin()): ?>
          <a href="admin.php" class="px-4 py-2 rounded-full bg-[#1A237E] text-white font-bold text-xs flex items-center gap-1.5 transition">
            <i class="fa-solid fa-user-shield text-[#FF9933]"></i> Admin Panel
          </a>
        <?php endif; ?>
        <a href="logout.php" class="p-2 text-slate-400 hover:text-rose-600 text-xs transition" title="Logout">
          <i class="fa-solid fa-right-from-bracket"></i>
        </a>
      <?php else: ?>
        <a href="login.php" class="text-xs font-semibold text-slate-700 hover:text-[#1A237E] px-3 py-2">Sign In</a>
        <a href="contact.php" class="bg-[#FF9933] hover:bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-bold transition shadow-sm">
          Get Free Proposal
        </a>
      <?php endif; ?>
    </div>
  </div>
</header>
