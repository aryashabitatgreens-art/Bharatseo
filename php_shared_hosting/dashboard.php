<?php
require_once __DIR__ . '/config.php';

if (!is_logged_in()) {
    header("Location: login.php");
    echo "<script>window.location.href='login.php';</script>";
    exit();
}

$user = get_current_user_data();

$user_orders = [];
if ($pdo) {
    $stmt = $pdo->prepare("SELECT o.*, s.title as service_title FROM orders o JOIN services s ON o.service_id = s.id WHERE o.user_id = ? ORDER BY o.id DESC");
    $stmt->execute([$user['id']]);
    $user_orders = $stmt->fetchAll();
}

require_once __DIR__ . '/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
  <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-2xl font-black text-[#1A237E]">Welcome, <?php echo sanitize($user['name']); ?></h1>
      <p class="text-xs text-slate-500 mt-0.5">Manage your active service campaigns, view status timelines, and invoices.</p>
    </div>
    <a href="services.php" class="px-5 py-2.5 rounded-full bg-[#FF9933] text-white font-bold text-xs shadow-sm hover:bg-orange-600 transition">
      + Order New Campaign
    </a>
  </div>

  <!-- Orders List -->
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
    <h2 class="text-lg font-black text-[#1A237E]">Your Campaign Orders</h2>

    <?php if (!empty($user_orders)): ?>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50 text-[#1A237E] font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th class="p-3">Order ID</th>
              <th class="p-3">Service & Plan</th>
              <th class="p-3">Amount</th>
              <th class="p-3">Payment</th>
              <th class="p-3">Order Status</th>
              <th class="p-3">Date</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <?php foreach ($user_orders as $ord): ?>
              <tr>
                <td class="p-3 font-mono font-bold text-[#1A237E]"><?php echo sanitize($ord['order_number']); ?></td>
                <td class="p-3">
                  <p class="font-bold text-slate-800"><?php echo sanitize($ord['service_title']); ?></p>
                  <p class="text-[10px] text-slate-500"><?php echo sanitize($ord['plan_name']); ?> Plan</p>
                </td>
                <td class="p-3 font-bold text-slate-900">₹<?php echo number_format($ord['amount']); ?></td>
                <td class="p-3">
                  <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    <?php echo strtoupper(sanitize($ord['payment_status'])); ?>
                  </span>
                </td>
                <td class="p-3">
                  <span class="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1A237E] font-bold text-[10px]">
                    <?php echo sanitize($ord['order_status']); ?>
                  </span>
                </td>
                <td class="p-3 text-slate-400 text-[11px]"><?php echo date('M d, Y', strtotime($ord['created_at'])); ?></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    <?php else: ?>
      <div class="p-8 text-center text-slate-500 text-xs space-y-2">
        <p>No active service orders found in your client portal.</p>
        <a href="services.php" class="text-[#FF9933] font-bold hover:underline">Explore Packages & Order Now</a>
      </div>
    <?php endif; ?>
  </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
