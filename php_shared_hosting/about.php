<?php
require_once __DIR__ . '/header.php';

$team_members = [];
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM team_members ORDER BY id ASC");
    $team_members = $stmt->fetchAll();
}
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
  <div class="text-center max-w-3xl mx-auto space-y-3">
    <span class="text-[#FF9933] font-black text-xs tracking-wider uppercase">Our Story & Mission</span>
    <h1 class="text-3xl font-black text-[#1A237E]">About <?php echo sanitize($site_name); ?></h1>
    <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
      We are a team of passionate search strategists, full-stack web developers, and performance marketers dedicated to scaling Indian & international brands online.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
    <div class="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
      <h2 class="text-2xl font-black text-[#1A237E]">Empowering Businesses with Data-Backed Growth</h2>
      <p>
        Founded with a mission to eliminate fluff in digital marketing, <?php echo sanitize($site_name); ?> combines deep technical search engine optimization with high-conversion web development.
      </p>
      <p>
        Whether you are an e-commerce brand wanting faster sales or a B2B business seeking high-intent commercial leads, our strategies are built for predictable ROI.
      </p>
      <div class="grid grid-cols-2 gap-4 pt-2">
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p class="text-2xl font-black text-[#1A237E]">100%</p>
          <p class="text-xs text-slate-500 font-medium">Transparent Client Portals</p>
        </div>
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p class="text-2xl font-black text-[#FF9933]">24/7</p>
          <p class="text-xs text-slate-500 font-medium">Support & Order Tracking</p>
        </div>
      </div>
    </div>
    <div>
      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team Office" class="rounded-2xl shadow-md w-full h-80 object-cover">
    </div>
  </div>

  <!-- Team Members -->
  <div class="space-y-6">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-black text-[#1A237E]">Leadership & Senior Strategists</h2>
      <p class="text-slate-600 text-xs">Meet the minds behind your organic traffic and web growth campaigns.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <?php if (!empty($team_members)): ?>
        <?php foreach ($team_members as $m): ?>
          <div class="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-3 shadow-sm hover:shadow-md transition">
            <img src="<?php echo sanitize($m['photo']); ?>" alt="<?php echo sanitize($m['name']); ?>" class="w-24 h-24 rounded-full mx-auto object-cover border-2 border-[#FF9933]">
            <div>
              <h3 class="font-bold text-[#1A237E] text-base"><?php echo sanitize($m['name']); ?></h3>
              <p class="text-slate-500 text-xs font-medium"><?php echo sanitize($m['designation']); ?></p>
            </div>
          </div>
        <?php endforeach; ?>
      <?php endif; ?>
    </div>
  </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
