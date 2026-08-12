<?php
require_once __DIR__ . '/header.php';

$jobs = [];
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM jobs WHERE status = 'open' ORDER BY id DESC");
    $jobs = $stmt->fetchAll();
}

$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['apply_job'])) {
    $name = sanitize($_POST['name'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $phone = sanitize($_POST['phone'] ?? '');
    $job_id = intval($_POST['job_id'] ?? 0);
    $message = sanitize($_POST['message'] ?? '');

    if ($pdo && $name && $email && $phone && $job_id) {
        $stmt = $pdo->prepare("INSERT INTO job_applications (job_id, name, email, phone, resume_path, message) VALUES (?, ?, ?, ?, 'online_application', ?)");
        $stmt->execute([$job_id, $name, $email, $phone, $message]);
        $msg = "Application submitted successfully! Our HR team will reach out to you shortly.";
    }
}
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
  <div class="text-center max-w-3xl mx-auto space-y-3">
    <span class="text-[#FF9933] font-black text-xs tracking-wider uppercase">Join Our Team</span>
    <h1 class="text-3xl font-black text-[#1A237E]">Career Openings at <?php echo sanitize($site_name); ?></h1>
    <p class="text-slate-600 text-xs sm:text-sm">Build cutting-edge search strategies and high-performance web applications alongside senior engineers.</p>
  </div>

  <?php if (!empty($msg)): ?>
    <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
      <?php echo $msg; ?>
    </div>
  <?php endif; ?>

  <div class="space-y-6">
    <?php if (!empty($jobs)): ?>
      <?php foreach ($jobs as $j): ?>
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 class="text-lg font-black text-[#1A237E]"><?php echo sanitize($j['title']); ?></h2>
              <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                <span><i class="fa-solid fa-briefcase text-[#FF9933]"></i> <?php echo sanitize($j['department']); ?></span>
                <span>•</span>
                <span><i class="fa-solid fa-location-dot"></i> <?php echo sanitize($j['location']); ?></span>
                <span>•</span>
                <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1A237E] font-bold text-[10px]"><?php echo sanitize($j['type']); ?></span>
              </div>
            </div>
          </div>

          <p class="text-slate-600 text-xs leading-relaxed"><?php echo sanitize($j['description']); ?></p>

          <form action="career.php" method="POST" class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <h3 class="font-bold text-[#1A237E]">Apply for this position:</h3>
            <input type="hidden" name="job_id" value="<?php echo $j['id']; ?>">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input type="text" name="name" required placeholder="Full Name *" class="p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#FF9933]">
              <input type="email" name="email" required placeholder="Email Address *" class="p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#FF9933]">
              <input type="text" name="phone" required placeholder="Phone Number *" class="p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#FF9933]">
            </div>
            <textarea name="message" rows="2" placeholder="Tell us about your experience / Portfolio URL..." class="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#FF9933]"></textarea>
            <button type="submit" name="apply_job" class="px-6 py-2.5 rounded-full bg-[#1A237E] hover:bg-blue-900 text-white font-bold transition shadow-sm">
              Submit Application
            </button>
          </form>
        </div>
      <?php endforeach; ?>
    <?php else: ?>
      <p class="text-center text-slate-500 text-xs">No active career openings at the moment.</p>
    <?php endif; ?>
  </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
