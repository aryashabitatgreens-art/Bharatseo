<?php
require_once __DIR__ . '/config.php';

$site_name = get_setting($pdo, 'site_name', 'Bharat SEO');
$agency_tagline = get_setting($pdo, 'agency_tagline', 'Empowering Indian & Global Businesses with Data-Driven Digital Growth');
$office_address = get_setting($pdo, 'office_address', 'Bharat Tower, Connaught Place, New Delhi 110001');
$contact_phone = get_setting($pdo, 'contact_phone', '+91 95208 68276');
$contact_email = get_setting($pdo, 'contact_email', 'ceo@bharatseo.site');
$whatsapp_number = get_setting($pdo, 'whatsapp_number', '919520868276');
?>
<!-- Footer -->
<footer class="bg-[#1A237E] text-slate-200 text-xs mt-16 border-t-4 border-[#FF9933]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      <!-- Agency Bio -->
      <div class="space-y-4">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 rounded-full bg-[#FF9933] text-white font-black text-base flex items-center justify-center">
            <?php echo strtoupper(substr($site_name, 0, 1)); ?>
          </div>
          <span class="text-lg font-black text-white tracking-tight">
            <?php echo strtoupper($site_name); ?>
          </span>
        </div>
        <p class="text-slate-300 text-xs leading-relaxed">
          <?php echo sanitize($agency_tagline); ?>
        </p>
        <div class="space-y-1.5 pt-2 text-slate-300">
          <p class="flex items-start gap-2">
            <i class="fa-solid fa-location-dot text-[#FF9933] mt-0.5"></i>
            <span><?php echo sanitize($office_address); ?></span>
          </p>
          <p class="flex items-center gap-2">
            <i class="fa-solid fa-phone text-[#FF9933]"></i>
            <a href="tel:<?php echo sanitize($contact_phone); ?>" class="hover:underline"><?php echo sanitize($contact_phone); ?></a>
          </p>
          <p class="flex items-center gap-2">
            <i class="fa-solid fa-envelope text-[#FF9933]"></i>
            <a href="mailto:<?php echo sanitize($contact_email); ?>" class="hover:underline"><?php echo sanitize($contact_email); ?></a>
          </p>
        </div>
      </div>

      <!-- Services -->
      <div>
        <h3 class="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-blue-900 pb-2">Our Capabilities</h3>
        <ul class="space-y-2 text-slate-300">
          <li><a href="services.php" class="hover:text-[#FF9933] transition"><i class="fa-solid fa-angle-right text-[10px] text-[#FF9933] mr-1.5"></i> Google SEO & Local GMB</a></li>
          <li><a href="services.php" class="hover:text-[#FF9933] transition"><i class="fa-solid fa-angle-right text-[10px] text-[#FF9933] mr-1.5"></i> Custom Web Engineering</a></li>
          <li><a href="services.php" class="hover:text-[#FF9933] transition"><i class="fa-solid fa-angle-right text-[10px] text-[#FF9933] mr-1.5"></i> E-Commerce Portals & Apps</a></li>
          <li><a href="services.php" class="hover:text-[#FF9933] transition"><i class="fa-solid fa-angle-right text-[10px] text-[#FF9933] mr-1.5"></i> Google & Meta Performance Ads</a></li>
        </ul>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-blue-900 pb-2">Quick Navigation</h3>
        <ul class="space-y-2 text-slate-300">
          <li><a href="about.php" class="hover:text-[#FF9933] transition"><i class="fa-solid fa-angle-right text-[10px] text-[#FF9933] mr-1.5"></i> About Our Team</a></li>
          <li><a href="portfolio.php" class="hover:text-[#FF9933] transition"><i class="fa-solid fa-angle-right text-[10px] text-[#FF9933] mr-1.5"></i> Client Case Studies</a></li>
          <li><a href="blog.php" class="hover:text-[#FF9933] transition"><i class="fa-solid fa-angle-right text-[10px] text-[#FF9933] mr-1.5"></i> Growth Insights & Blog</a></li>
          <li><a href="career.php" class="hover:text-[#FF9933] transition"><i class="fa-solid fa-angle-right text-[10px] text-[#FF9933] mr-1.5"></i> Career Openings</a></li>
          <li><a href="contact.php" class="hover:text-[#FF9933] transition"><i class="fa-solid fa-angle-right text-[10px] text-[#FF9933] mr-1.5"></i> Get a Free Audit</a></li>
        </ul>
      </div>

      <!-- Security & Standards -->
      <div>
        <h3 class="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-blue-900 pb-2">Agency Guarantees</h3>
        <div class="space-y-2 text-slate-300">
          <div class="p-3 rounded-xl bg-blue-950/80 border border-blue-900">
            <p class="font-bold text-white flex items-center gap-1.5"><i class="fa-solid fa-shield-halved text-emerald-400"></i> Enterprise Data Security</p>
            <p class="text-[11px] text-slate-300 mt-0.5">100% Data Privacy, SSL Encryption & High-Availability SLA Guarantee.</p>
          </div>
          <div class="p-3 rounded-xl bg-blue-950/80 border border-blue-900">
            <p class="font-bold text-white flex items-center gap-1.5"><i class="fa-solid fa-award text-amber-400"></i> Razorpay Verified</p>
            <p class="text-[11px] text-slate-300 mt-0.5">Instant Indian UPI, NetBanking & Card payments with GST Invoicing.</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom Copyright -->
    <div class="mt-10 pt-6 border-t border-blue-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-3 pb-16 lg:pb-0">
      <p>© <?php echo date('Y'); ?> <?php echo sanitize($site_name); ?> Agency. All rights reserved.</p>
      <div class="flex items-center space-x-4">
        <a href="contact.php" class="hover:text-white transition">Privacy Policy</a>
        <span>•</span>
        <a href="contact.php" class="hover:text-white transition">Terms of Service</a>
        <span>•</span>
        <a href="login.php" class="hover:text-white transition">Client Portal</a>
      </div>
    </div>
  </div>
</footer>

<!-- Floating WhatsApp Button -->
<a href="https://wa.me/<?php echo sanitize($whatsapp_number); ?>?text=Hi%20<?php echo urlencode($site_name); ?>,%20I%20want%20to%20discuss%20a%20project!" target="_blank" rel="noreferrer" class="fixed bottom-20 sm:bottom-6 right-5 z-40 bg-emerald-600 hover:bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-110" aria-label="Chat on WhatsApp">
  <i class="fa-brands fa-whatsapp text-2xl"></i>
</a>

<!-- Mobile Bottom Navigation Bar -->
<div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-2xl">
  <a href="index.php" class="flex flex-col items-center gap-0.5 text-[10px] font-semibold <?php echo ($current_page === 'index' || $current_page === '') ? 'text-[#1A237E]' : 'text-slate-500 hover:text-slate-800'; ?>">
    <i class="fa-solid fa-house text-base"></i>
    <span>Home</span>
  </a>
  <a href="services.php" class="flex flex-col items-center gap-0.5 text-[10px] font-semibold <?php echo ($current_page === 'services') ? 'text-[#1A237E]' : 'text-slate-500 hover:text-slate-800'; ?>">
    <i class="fa-solid fa-layer-group text-base"></i>
    <span>Pricing</span>
  </a>
  <a href="tel:<?php echo sanitize($contact_phone); ?>" class="flex flex-col items-center -mt-5 bg-[#FF9933] text-white p-3 rounded-full shadow-lg border-2 border-white hover:bg-orange-600 transition">
    <i class="fa-solid fa-phone text-base"></i>
  </a>
  <a href="contact.php" class="flex flex-col items-center gap-0.5 text-[10px] font-semibold <?php echo ($current_page === 'contact') ? 'text-[#1A237E]' : 'text-slate-500 hover:text-slate-800'; ?>">
    <i class="fa-solid fa-headset text-base"></i>
    <span>Audit</span>
  </a>
  <?php if (is_logged_in()): ?>
    <a href="dashboard.php" class="flex flex-col items-center gap-0.5 text-[10px] font-semibold <?php echo ($current_page === 'dashboard' || $current_page === 'admin') ? 'text-[#1A237E]' : 'text-slate-500 hover:text-slate-800'; ?>">
      <i class="fa-solid fa-gauge text-base"></i>
      <span>Portal</span>
    </a>
  <?php else: ?>
    <a href="login.php" class="flex flex-col items-center gap-0.5 text-[10px] font-semibold <?php echo ($current_page === 'login') ? 'text-[#1A237E]' : 'text-slate-500 hover:text-slate-800'; ?>">
      <i class="fa-solid fa-user text-base"></i>
      <span>Sign In</span>
    </a>
  <?php endif; ?>
</div>

</body>
</html>
