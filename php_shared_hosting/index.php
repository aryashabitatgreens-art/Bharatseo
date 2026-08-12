<?php
require_once __DIR__ . '/header.php';

// Fetch services from DB
$services = [];
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM services WHERE status = 'active' ORDER BY id ASC LIMIT 6");
    $services = $stmt->fetchAll();
}
?>

<!-- Hero Section -->
<section class="relative bg-gradient-to-br from-[#1A237E] via-[#0D1B2A] to-[#1A237E] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
    <div class="space-y-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FF9933] text-xs font-semibold">
        <i class="fa-solid fa-sparkles"></i>
        <span>India's Premier SEO & Bespoke Web Agency</span>
      </div>

      <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
        Scale Your Business to <span class="text-[#FF9933]">Page #1</span> on Google & Multiply Revenue
      </h1>

      <p class="text-slate-200 text-sm sm:text-base leading-relaxed">
        We combine high-ROI Search Engine Optimization, custom web engineering, performance Google/Meta ads, and automated client analytics to generate predictable leads and sales.
      </p>

      <div class="flex flex-wrap items-center gap-4 pt-2">
        <a href="services.php" class="bg-[#FF9933] hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-full text-xs sm:text-sm shadow-lg transition flex items-center gap-2">
          <span>Explore Services & Packages</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
        <a href="contact.php" class="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-full text-xs sm:text-sm border border-white/20 transition flex items-center gap-2">
          <i class="fa-solid fa-phone text-[#FF9933]"></i>
          <span>Book Free Consultation</span>
        </a>
      </div>

      <!-- Trust Badges -->
      <div class="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center sm:text-left">
        <div>
          <p class="text-2xl font-black text-[#FF9933]">250+</p>
          <p class="text-xs text-slate-300">Campaigns Delivered</p>
        </div>
        <div>
          <p class="text-2xl font-black text-emerald-400">98.4%</p>
          <p class="text-xs text-slate-300">Client Retention</p>
        </div>
        <div>
          <p class="text-2xl font-black text-amber-300">10x</p>
          <p class="text-xs text-slate-300">Avg Organic Traffic ROI</p>
        </div>
      </div>
    </div>

    <!-- Hero Card Mockup -->
    <div class="relative">
      <div class="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl space-y-4">
        <div class="flex items-center justify-between pb-4 border-b border-white/10">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <i class="fa-solid fa-chart-line text-lg"></i>
            </div>
            <div>
              <p class="font-bold text-sm">Real-Time Growth Dashboard</p>
              <p class="text-xs text-slate-300">Google Search Console Sync</p>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">Live Campaign</span>
        </div>

        <div class="space-y-3 text-xs">
          <div class="flex justify-between items-center p-3 rounded-xl bg-black/20">
            <span class="text-slate-300">Organic Keywords Ranked #1–3</span>
            <span class="font-bold text-[#FF9933]">142 Keywords (+24%)</span>
          </div>
          <div class="flex justify-between items-center p-3 rounded-xl bg-black/20">
            <span class="text-slate-300">Monthly Organic Visitors</span>
            <span class="font-bold text-emerald-400">48,250 Leads/Mo</span>
          </div>
          <div class="flex justify-between items-center p-3 rounded-xl bg-black/20">
            <span class="text-slate-300">PageSpeed Performance Score</span>
            <span class="font-bold text-sky-300">99 / 100 Mobile</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Services Overview Grid -->
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
  <div class="text-center max-w-2xl mx-auto space-y-3">
    <span class="text-[#FF9933] font-extrabold text-xs tracking-wider uppercase">End-To-End Growth Services</span>
    <h2 class="text-2xl sm:text-3xl font-black text-[#1A237E]">Designed for Measurable Business Revenue</h2>
    <p class="text-slate-600 text-xs sm:text-sm">We manage technical SEO, custom web portals, and ad performance so you can focus on operations.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <?php if (!empty($services)): ?>
      <?php foreach ($services as $svc): ?>
        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <img src="<?php echo sanitize($svc['image']); ?>" alt="<?php echo sanitize($svc['title']); ?>" class="w-full h-40 object-cover rounded-xl">
            <span class="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1A237E] font-bold text-[11px]">
              <?php echo sanitize($svc['category']); ?>
            </span>
            <h3 class="text-base font-extrabold text-[#1A237E]"><?php echo sanitize($svc['title']); ?></h3>
            <p class="text-slate-600 text-xs leading-relaxed"><?php echo sanitize($svc['short_desc']); ?></p>
          </div>
          <a href="services.php" class="text-xs font-bold text-[#FF9933] hover:underline flex items-center gap-1.5 pt-2">
            <span>View Packages & Pricing</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </a>
        </div>
      <?php endforeach; ?>
    <?php else: ?>
      <p class="text-center text-slate-500 text-xs col-span-3">No services found in database.</p>
    <?php endif; ?>
  </div>
</section>

<!-- CTA Section -->
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
  <div class="bg-gradient-to-r from-[#1A237E] to-blue-900 rounded-2xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
    <div class="space-y-2 text-center sm:text-left">
      <h3 class="text-2xl font-black">Ready to Grow Your Traffic & Sales?</h3>
      <p class="text-xs sm:text-sm text-slate-200 max-w-xl">Get a free, detailed audit of your website's search rankings, speed bottlenecks, and conversion opportunities from our senior strategists.</p>
    </div>
    <a href="contact.php" class="bg-[#FF9933] hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-full text-xs shadow-md transition whitespace-nowrap">
      Request Free Audit
    </a>
  </div>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
