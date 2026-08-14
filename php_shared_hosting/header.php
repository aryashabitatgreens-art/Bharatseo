<?php
require_once __DIR__ . '/config.php';

$site_name = get_setting($pdo, 'site_name', 'Bharat SEO');
$contact_phone = get_setting($pdo, 'contact_phone', '+91 95208 68276');
$whatsapp_number = get_setting($pdo, 'whatsapp_number', '919520868276');
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

    <!-- Right Area: Action Buttons (Desktop) & Mobile Fast Actions -->
    <div class="flex items-center space-x-2 sm:space-x-3">
      <?php if (is_logged_in()): ?>
        <a href="dashboard.php" class="hidden sm:flex px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#1A237E] font-bold text-xs items-center gap-1.5 transition">
          <i class="fa-solid fa-gauge"></i> Client Dashboard
        </a>
        <?php if (is_admin()): ?>
          <a href="admin.php" class="hidden sm:flex px-4 py-2 rounded-full bg-[#1A237E] text-white font-bold text-xs items-center gap-1.5 transition">
            <i class="fa-solid fa-user-shield text-[#FF9933]"></i> Admin Panel
          </a>
        <?php endif; ?>
        <a href="logout.php" class="hidden sm:inline-flex p-2 text-slate-400 hover:text-rose-600 text-xs transition" title="Logout">
          <i class="fa-solid fa-right-from-bracket"></i>
        </a>
      <?php else: ?>
        <a href="login.php" class="hidden sm:flex text-xs font-semibold text-slate-700 hover:text-[#1A237E] px-2.5 py-2 items-center gap-1.5">
          <i class="fa-solid fa-arrow-right-to-bracket text-slate-400"></i>
          <span>Sign In</span>
        </a>
        <a href="contact.php" class="hidden md:inline-flex bg-[#FF9933] hover:bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-bold transition shadow-sm">
          Get Free Proposal
        </a>
      <?php endif; ?>

      <!-- Quick Call Button for Mobile -->
      <a href="tel:<?php echo sanitize($contact_phone); ?>" class="lg:hidden p-2 rounded-full bg-orange-50 text-[#FF9933] hover:bg-orange-100 transition" title="Call Now">
        <i class="fa-solid fa-phone text-sm"></i>
      </a>

      <!-- Mobile Hamburger Toggle Button -->
      <button id="mobile-menu-open-btn" onclick="toggleMobileMenu(true)" class="lg:hidden p-2.5 text-slate-700 hover:text-[#1A237E] rounded-xl hover:bg-slate-100 focus:outline-none transition" aria-label="Open Mobile Navigation">
        <i class="fa-solid fa-bars text-xl"></i>
      </button>
    </div>
  </div>
</header>

<!-- Mobile Sidebar Drawer Overlay -->
<div id="mobile-menu-backdrop" onclick="toggleMobileMenu(false)" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden opacity-0 transition-opacity duration-300 pointer-events-none"></div>

<div id="mobile-menu-drawer" class="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 transform translate-x-full transition-transform duration-300 ease-in-out shadow-2xl flex flex-col justify-between overflow-y-auto">
  <!-- Mobile Sidebar Header -->
  <div>
    <div class="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 rounded-full bg-[#1A237E] text-white font-black text-base flex items-center justify-center">
          <?php echo strtoupper(substr($site_name, 0, 1)); ?>
        </div>
        <span class="text-lg font-black text-[#1A237E]">
          <?php echo strtoupper($site_name); ?>
        </span>
      </div>
      <button onclick="toggleMobileMenu(false)" class="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition" aria-label="Close Menu">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>
    </div>

    <!-- Navigation Links -->
    <div class="p-4 space-y-1">
      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Menu Navigation</p>
      <?php
      $mobile_nav_links = [
        'index' => ['label' => 'Home', 'icon' => 'fa-house'],
        'services' => ['label' => 'Services & Pricing', 'icon' => 'fa-layer-group'],
        'about' => ['label' => 'About Us', 'icon' => 'fa-users'],
        'portfolio' => ['label' => 'Case Studies', 'icon' => 'fa-chart-pie'],
        'blog' => ['label' => 'Insights', 'icon' => 'fa-newspaper'],
        'career' => ['label' => 'Careers', 'icon' => 'fa-briefcase'],
        'contact' => ['label' => 'Contact Us', 'icon' => 'fa-headset']
      ];
      foreach ($mobile_nav_links as $file => $info) {
          $is_active = ($current_page === $file || ($current_page === '' && $file === 'index'));
          $active_class = $is_active ? 'bg-blue-50 text-[#1A237E] font-bold border-l-4 border-[#1A237E]' : 'text-slate-700 hover:bg-slate-50 font-medium';
          echo '<a href="' . $file . '.php" onclick="toggleMobileMenu(false)" class="flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs transition ' . $active_class . '">
                  <i class="fa-solid ' . $info['icon'] . ' text-[#FF9933] w-4 text-center"></i>
                  <span>' . $info['label'] . '</span>
                </a>';
      }
      ?>
    </div>
  </div>

  <!-- Mobile Sidebar Footer Actions -->
  <div class="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
    <?php if (is_logged_in()): ?>
      <div class="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
        <p class="text-slate-500 text-[10px]">Logged in as:</p>
        <p class="font-bold text-[#1A237E] truncate"><?php echo sanitize($_SESSION['user_email'] ?? ''); ?></p>
      </div>
      <a href="dashboard.php" class="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1A237E] font-bold text-xs flex items-center justify-center gap-2 transition">
        <i class="fa-solid fa-gauge"></i> Client Dashboard
      </a>
      <?php if (is_admin()): ?>
        <a href="admin.php" class="w-full py-2.5 px-4 rounded-xl bg-[#1A237E] text-white font-bold text-xs flex items-center justify-center gap-2 transition">
          <i class="fa-solid fa-user-shield text-[#FF9933]"></i> Admin Panel
        </a>
      <?php endif; ?>
      <a href="logout.php" class="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 transition">
        <i class="fa-solid fa-right-from-bracket"></i> Sign Out
      </a>
    <?php else: ?>
      <div class="grid grid-cols-2 gap-2">
        <a href="login.php" class="w-full py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 transition">
          <i class="fa-solid fa-arrow-right-to-bracket text-[#1A237E]"></i> Sign In
        </a>
        <a href="login.php?tab=register" class="w-full py-2.5 px-3 rounded-xl bg-blue-50 border border-blue-200 text-[#1A237E] font-bold text-xs flex items-center justify-center gap-1.5 transition">
          <i class="fa-solid fa-user-plus text-[#1A237E]"></i>
          <span>Register</span>
        </a>
      </div>
      <a href="contact.php" class="w-full py-3 px-4 rounded-xl bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm">
        <span>Get Free Proposal</span>
        <i class="fa-solid fa-arrow-right"></i>
      </a>
    <?php endif; ?>

    <div class="pt-2 text-[11px] text-slate-500 space-y-1">
      <a href="tel:<?php echo sanitize($contact_phone); ?>" class="flex items-center gap-2 hover:text-[#1A237E]">
        <i class="fa-solid fa-phone text-[#FF9933]"></i>
        <span><?php echo sanitize($contact_phone); ?></span>
      </a>
    </div>
  </div>
</div>

<!-- Mobile Navigation Toggle Script -->
<script>
  function toggleMobileMenu(open) {
    var backdrop = document.getElementById('mobile-menu-backdrop');
    var drawer = document.getElementById('mobile-menu-drawer');
    
    if (!backdrop || !drawer) return;

    if (open) {
      backdrop.classList.remove('hidden');
      void backdrop.offsetWidth; // Trigger reflow
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100', 'pointer-events-auto');
      drawer.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
    } else {
      backdrop.classList.remove('opacity-100', 'pointer-events-auto');
      backdrop.classList.add('opacity-0');
      drawer.classList.add('translate-x-full');
      document.body.style.overflow = '';
      setTimeout(function() {
        backdrop.classList.add('hidden');
      }, 300);
    }
  }
</script>
