<?php
require_once __DIR__ . '/header.php';

// Fetch services and their plans
$services_data = [];
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM services WHERE status = 'active' ORDER BY id ASC");
    $services = $stmt->fetchAll();

    foreach ($services as $svc) {
        $p_stmt = $pdo->prepare("SELECT * FROM service_plans WHERE service_id = ? ORDER BY id ASC");
        $p_stmt->execute([$svc['id']]);
        $plans = $p_stmt->fetchAll();
        $svc['plans'] = $plans;
        $services_data[] = $svc;
    }
}
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
  <div class="text-center max-w-3xl mx-auto space-y-3">
    <span class="text-[#FF9933] font-black text-xs tracking-wider uppercase">Transparent Investment</span>
    <h1 class="text-3xl font-black text-[#1A237E]">Services & Pricing Packages</h1>
    <p class="text-slate-600 text-xs sm:text-sm">Choose a predictable monthly or one-time plan tailored for high search traffic and sales growth.</p>
  </div>

  <?php if (!empty($services_data)): ?>
    <?php foreach ($services_data as $svc): ?>
      <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div class="space-y-1">
            <span class="px-3 py-1 rounded-full bg-blue-50 text-[#1A237E] font-bold text-[11px]"><?php echo sanitize($svc['category']); ?></span>
            <h2 class="text-xl font-black text-[#1A237E]"><?php echo sanitize($svc['title']); ?></h2>
            <p class="text-slate-600 text-xs max-w-2xl"><?php echo sanitize($svc['description']); ?></p>
          </div>
        </div>

        <!-- Pricing Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <?php if (!empty($svc['plans'])): ?>
            <?php foreach ($svc['plans'] as $plan): ?>
              <?php 
                $is_growth = strtolower($plan['plan_name']) === 'growth';
                $card_border = $is_growth ? 'border-2 border-[#FF9933] bg-orange-50/20' : 'border border-slate-200 bg-slate-50/50';
              ?>
              <div class="rounded-2xl p-6 <?php echo $card_border; ?> flex flex-col justify-between space-y-6 relative">
                <?php if ($is_growth): ?>
                  <span class="absolute -top-3 right-6 bg-[#FF9933] text-white font-bold text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                <?php endif; ?>

                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-black text-[#1A237E]"><?php echo sanitize($plan['plan_name']); ?></h3>
                    <div class="mt-2 flex items-baseline gap-1">
                      <span class="text-2xl font-black text-[#1A237E]">₹<?php echo number_format($plan['price']); ?></span>
                      <span class="text-xs text-slate-500 font-semibold">/ <?php echo sanitize($plan['billing_period']); ?></span>
                    </div>
                  </div>

                  <hr class="border-slate-200">

                  <div class="space-y-2.5 text-xs text-slate-700">
                    <p class="font-bold text-[#1A237E] text-[11px] uppercase tracking-wider">Plan Highlights:</p>
                    <ul class="space-y-2">
                      <?php 
                        $features = explode(',', $plan['features']);
                        foreach ($features as $f): 
                      ?>
                        <li class="flex items-start gap-2">
                          <i class="fa-solid fa-circle-check text-emerald-500 mt-0.5 shrink-0 text-xs"></i>
                          <span><?php echo sanitize($f); ?></span>
                        </li>
                      <?php endforeach; ?>
                    </ul>
                  </div>
                </div>

                <a href="contact.php?service=<?php echo urlencode($svc['title']); ?>&plan=<?php echo urlencode($plan['plan_name']); ?>" class="w-full py-3 rounded-full text-center text-xs font-bold transition shadow-sm <?php echo $is_growth ? 'bg-[#FF9933] hover:bg-orange-600 text-white' : 'bg-[#1A237E] hover:bg-blue-900 text-white'; ?>">
                  Order <?php echo sanitize($plan['plan_name']); ?> Plan
                </a>
              </div>
            <?php endforeach; ?>
          <?php endif; ?>
        </div>
      </div>
    <?php endforeach; ?>
  <?php else: ?>
    <p class="text-center text-slate-500 text-xs">No service packages available at the moment.</p>
  <?php endif; ?>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
