<?php
require_once __DIR__ . '/config.php';

if (!is_logged_in() || !is_admin()) {
    header("Location: login.php");
    echo "<script>window.location.href='login.php';</script>";
    exit();
}

$save_msg = '';

// Handle Settings Update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_settings'])) {
    if ($pdo) {
        save_setting($pdo, 'site_name', sanitize($_POST['site_name'] ?? ''));
        save_setting($pdo, 'agency_tagline', sanitize($_POST['agency_tagline'] ?? ''));
        save_setting($pdo, 'contact_phone', sanitize($_POST['contact_phone'] ?? ''));
        save_setting($pdo, 'whatsapp_number', sanitize($_POST['whatsapp_number'] ?? ''));
        save_setting($pdo, 'contact_email', sanitize($_POST['contact_email'] ?? ''));
        save_setting($pdo, 'office_address', sanitize($_POST['office_address'] ?? ''));
        save_setting($pdo, 'razorpay_key_id', sanitize($_POST['razorpay_key_id'] ?? ''));
        save_setting($pdo, 'google_client_id', sanitize($_POST['google_client_id'] ?? ''));
        $save_msg = "All agency, contact & headquarters settings saved successfully!";
    }
}

// Fetch Stats & Data
$enquiries = [];
$orders = [];

if ($pdo) {
    $e_stmt = $pdo->query("SELECT * FROM enquiries ORDER BY id DESC LIMIT 20");
    $enquiries = $e_stmt->fetchAll();

    $o_stmt = $pdo->query("SELECT o.*, u.name as user_name, u.email as user_email, s.title as service_title FROM orders o JOIN users u ON o.user_id = u.id JOIN services s ON o.service_id = s.id ORDER BY o.id DESC");
    $orders = $o_stmt->fetchAll();
}

require_once __DIR__ . '/header.php';
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
  
  <div class="bg-[#1A237E] text-white p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
    <div>
      <h1 class="text-2xl font-black">Agency Admin Panel</h1>
      <p class="text-xs text-slate-300">Manage Headquarters Address, Branding, Enquiries & Orders</p>
    </div>
    <span class="px-3.5 py-1.5 rounded-full bg-[#FF9933] font-bold text-xs">
      <i class="fa-solid fa-[#FF9933] fa-user-shield"></i> Master Administrator
    </span>
  </div>

  <?php if (!empty($save_msg)): ?>
    <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
      <i class="fa-solid fa-circle-check"></i> <?php echo $save_msg; ?>
    </div>
  <?php endif; ?>

  <!-- Settings Form Section -->
  <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
    <div class="border-b border-slate-100 pb-4">
      <h2 class="text-xl font-black text-[#1A237E]">1. Branding, Contact & Headquarters Settings</h2>
      <p class="text-xs text-slate-500 mt-0.5">Update agency name, tagline, office address, and hotline across the site.</p>
    </div>

    <form action="admin.php" method="POST" class="space-y-6 text-xs">
      <!-- Brand Details -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-semibold text-slate-700 mb-1">Agency Name *</label>
          <input type="text" name="site_name" required value="<?php echo sanitize(get_setting($pdo, 'site_name', 'Bharat SEO')); ?>" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">Tagline / Mission *</label>
          <input type="text" name="agency_tagline" required value="<?php echo sanitize(get_setting($pdo, 'agency_tagline', '')); ?>" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
        </div>
      </div>

      <!-- Contact Details -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block font-semibold text-slate-700 mb-1">Phone Hotline *</label>
          <input type="text" name="contact_phone" required value="<?php echo sanitize(get_setting($pdo, 'contact_phone', '')); ?>" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">WhatsApp Number *</label>
          <input type="text" name="whatsapp_number" required value="<?php echo sanitize(get_setting($pdo, 'whatsapp_number', '')); ?>" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">Contact Email *</label>
          <input type="email" name="contact_email" required value="<?php echo sanitize(get_setting($pdo, 'contact_email', '')); ?>" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
        </div>
      </div>

      <!-- Address -->
      <div>
        <label class="block font-semibold text-slate-700 mb-1">Headquarters & Office Address *</label>
        <textarea name="office_address" rows="3" required class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]"><?php echo sanitize(get_setting($pdo, 'office_address', '')); ?></textarea>
      </div>

      <!-- Keys -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-semibold text-slate-700 mb-1">Razorpay Key ID</label>
          <input type="text" name="razorpay_key_id" value="<?php echo sanitize(get_setting($pdo, 'razorpay_key_id', '')); ?>" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono focus:outline-none focus:border-[#FF9933]">
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">Google OAuth Client ID</label>
          <input type="text" name="google_client_id" value="<?php echo sanitize(get_setting($pdo, 'google_client_id', '')); ?>" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono focus:outline-none focus:border-[#FF9933]">
        </div>
      </div>

      <button type="submit" name="save_settings" class="py-3.5 px-8 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs shadow-md transition">
        Save All Settings
      </button>
    </form>
  </div>

  <!-- Lead Inquiries Section -->
  <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
    <h2 class="text-xl font-black text-[#1A237E]">2. Recent Lead Inquiries</h2>
    <?php if (!empty($enquiries)): ?>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50 text-[#1A237E] font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th class="p-3">Client Name</th>
              <th class="p-3">Email & Phone</th>
              <th class="p-3">Service Interest</th>
              <th class="p-3">Message</th>
              <th class="p-3">Date</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <?php foreach ($enquiries as $enq): ?>
              <tr>
                <td class="p-3 font-bold text-slate-900"><?php echo sanitize($enq['name']); ?></td>
                <td class="p-3">
                  <p><?php echo sanitize($enq['email']); ?></p>
                  <p class="text-[10px] text-slate-500"><?php echo sanitize($enq['phone']); ?></p>
                </td>
                <td class="p-3 font-semibold text-[#1A237E]"><?php echo sanitize($enq['service_interest']); ?></td>
                <td class="p-3 text-slate-600 max-w-xs truncate"><?php echo sanitize($enq['message']); ?></td>
                <td class="p-3 text-slate-400 text-[11px]"><?php echo date('M d, Y', strtotime($enq['created_at'])); ?></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    <?php else: ?>
      <p class="text-xs text-slate-500">No lead inquiries captured yet.</p>
    <?php endif; ?>
  </div>

</div>

<?php require_once __DIR__ . '/footer.php'; ?>
