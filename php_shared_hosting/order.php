<?php
require_once __DIR__ . '/config.php';

// If not logged in, prompt user to login/register or register quickly during order
$service_id = intval($_GET['service_id'] ?? 0);
$plan_name = sanitize($_GET['plan'] ?? '');
$service_name = sanitize($_GET['service'] ?? '');

$service = null;
$plan = null;

if ($pdo) {
    if ($service_id > 0) {
        $stmt = $pdo->prepare("SELECT * FROM services WHERE id = ?");
        $stmt->execute([$service_id]);
        $service = $stmt->fetch();
    } elseif (!empty($service_name)) {
        $stmt = $pdo->prepare("SELECT * FROM services WHERE title = ? OR slug = ? LIMIT 1");
        $stmt->execute([$service_name, $service_name]);
        $service = $stmt->fetch();
    }

    if ($service && !empty($plan_name)) {
        $pstmt = $pdo->prepare("SELECT * FROM service_plans WHERE service_id = ? AND LOWER(plan_name) = LOWER(?) LIMIT 1");
        $pstmt->execute([$service['id'], $plan_name]);
        $plan = $pstmt->fetch();
    }

    // Default to first service and plan if not specified
    if (!$service) {
        $stmt = $pdo->query("SELECT * FROM services WHERE status = 'active' ORDER BY id ASC LIMIT 1");
        $service = $stmt->fetch();
    }
    if ($service && !$plan) {
        $pstmt = $pdo->prepare("SELECT * FROM service_plans WHERE service_id = ? ORDER BY id ASC LIMIT 1");
        $pstmt->execute([$service['id']]);
        $plan = $pstmt->fetch();
    }
}

$success_order = null;
$error = '';

// Handle Order Placement
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['place_order'])) {
    $sel_service_id = intval($_POST['service_id'] ?? ($service['id'] ?? 0));
    $sel_plan_name = sanitize($_POST['plan_name'] ?? ($plan['plan_name'] ?? 'Starter'));
    $notes = sanitize($_POST['order_notes'] ?? '');
    $website_url = sanitize($_POST['website_url'] ?? '');
    $target_keywords = sanitize($_POST['target_keywords'] ?? '');

    $user_id = $_SESSION['user_id'] ?? 0;
    
    // If not logged in, auto-create/login user with provided details
    if (!$user_id) {
        $cust_name = sanitize($_POST['customer_name'] ?? '');
        $cust_email = sanitize($_POST['customer_email'] ?? '');
        $cust_phone = sanitize($_POST['customer_phone'] ?? '');
        $cust_pass = $_POST['customer_password'] ?? '';

        if (empty($cust_name) || empty($cust_email) || empty($cust_phone)) {
            $error = 'Please provide your Full Name, Email, and Phone number to create your client order.';
        } else {
            if ($pdo) {
                // Check if user already exists
                $ustmt = $pdo->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
                $ustmt->execute([$cust_email]);
                $existing_user = $ustmt->fetch();

                if ($existing_user) {
                    $user_id = $existing_user['id'];
                    $_SESSION['user_id'] = $existing_user['id'];
                    $_SESSION['user_name'] = $existing_user['name'];
                    $_SESSION['user_email'] = $existing_user['email'];
                    $_SESSION['user_role'] = $existing_user['role'];
                } else {
                    $hash = password_hash(!empty($cust_pass) ? $cust_pass : 'Client@123', PASSWORD_DEFAULT);
                    $inst = $pdo->prepare("INSERT INTO users (name, email, phone, password, role, status) VALUES (?, ?, ?, ?, 'client', 'active')");
                    $inst->execute([$cust_name, $cust_email, $cust_phone, $hash]);
                    $user_id = $pdo->lastInsertId();

                    $_SESSION['user_id'] = $user_id;
                    $_SESSION['user_name'] = $cust_name;
                    $_SESSION['user_email'] = $cust_email;
                    $_SESSION['user_role'] = 'client';
                }
            }
        }
    }

    if ($user_id && $pdo && empty($error)) {
        // Fetch accurate plan price
        $pp_stmt = $pdo->prepare("SELECT price FROM service_plans WHERE service_id = ? AND plan_name = ? LIMIT 1");
        $pp_stmt->execute([$sel_service_id, $sel_plan_name]);
        $fetched_plan = $pp_stmt->fetch();
        $amount = $fetched_plan ? $fetched_plan['price'] : 14999.00;

        $order_number = 'BSEO-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -4));

        try {
            $order_stmt = $pdo->prepare("INSERT INTO orders (order_number, user_id, service_id, plan_name, amount, payment_status, order_status) VALUES (?, ?, ?, ?, ?, 'paid', 'In Progress')");
            $order_stmt->execute([$order_number, $user_id, $sel_service_id, $sel_plan_name, $amount]);
            
            // Also log enquiry notes
            if (!empty($notes) || !empty($website_url)) {
                $enq_stmt = $pdo->prepare("INSERT INTO enquiries (name, email, phone, service_interest, message) VALUES (?, ?, ?, ?, ?)");
                $enq_stmt->execute([
                    $_SESSION['user_name'] ?? 'Client',
                    $_SESSION['user_email'] ?? '',
                    $_SESSION['user_phone'] ?? '',
                    'Order ' . $order_number . ': ' . $sel_plan_name,
                    "Website: $website_url | Keywords: $target_keywords | Notes: $notes"
                ]);
            }

            $success_order = [
                'order_number' => $order_number,
                'amount' => $amount,
                'plan_name' => $sel_plan_name,
                'service_title' => $service['title'] ?? 'Digital Growth Campaign'
            ];
        } catch (Exception $e) {
            $error = "Order creation notice: " . $e->getMessage();
        }
    }
}

require_once __DIR__ . '/header.php';
?>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">

  <?php if ($success_order): ?>
    <!-- ORDER SUCCESS CONFIRMATION SCREEN -->
    <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl text-center space-y-6 animate-fadeIn">
      <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
        <i class="fa-solid fa-circle-check"></i>
      </div>

      <div class="space-y-2">
        <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">Campaign Confirmed & Active</span>
        <h1 class="text-2xl sm:text-3xl font-black text-[#1A237E]">Thank You! Your Order is Placed</h1>
        <p class="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          We have generated your campaign invoice and assigned a senior strategist to review your website metrics.
        </p>
      </div>

      <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-md mx-auto text-left space-y-3 text-xs">
        <div class="flex justify-between border-b border-slate-200 pb-2">
          <span class="text-slate-500">Order Reference:</span>
          <span class="font-mono font-bold text-[#1A237E]"><?php echo sanitize($success_order['order_number']); ?></span>
        </div>
        <div class="flex justify-between border-b border-slate-200 pb-2">
          <span class="text-slate-500">Selected Plan:</span>
          <span class="font-bold text-slate-800"><?php echo sanitize($success_order['plan_name']); ?></span>
        </div>
        <div class="flex justify-between border-b border-slate-200 pb-2">
          <span class="text-slate-500">Campaign Package:</span>
          <span class="font-bold text-slate-800"><?php echo sanitize($success_order['service_title']); ?></span>
        </div>
        <div class="flex justify-between pt-1">
          <span class="text-slate-700 font-bold">Total Amount:</span>
          <span class="font-black text-emerald-600 text-base">₹<?php echo number_format($success_order['amount']); ?></span>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
        <a href="dashboard.php" class="px-6 py-3.5 rounded-full bg-[#1A237E] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition flex items-center gap-2">
          <i class="fa-solid fa-gauge"></i>
          <span>Open Client Dashboard</span>
        </a>
        <?php $clean_wa = preg_replace('/[^0-9]/', '', !empty($whatsapp_number) ? $whatsapp_number : $contact_phone); ?>
        <a href="https://wa.me/<?php echo $clean_wa; ?>?text=<?php echo urlencode('Hi Bharat SEO, I placed order ' . $success_order['order_number'] . '. Please share next steps!'); ?>" target="_blank" rel="noreferrer" class="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2">
          <i class="fa-brands fa-whatsapp text-sm"></i>
          <span>Discuss on WhatsApp</span>
        </a>
      </div>
    </div>

  <?php else: ?>

    <!-- ORDER CHECKOUT FORM -->
    <div class="text-center max-w-2xl mx-auto space-y-2">
      <span class="text-[#FF9933] font-black text-xs uppercase tracking-wider">Fast Campaign Checkout</span>
      <h1 class="text-2xl sm:text-3xl font-black text-[#1A237E]">Complete Your Campaign Order</h1>
      <p class="text-slate-600 text-xs sm:text-sm">Instant activation, dedicated strategist assignment, and live campaign dashboard.</p>
    </div>

    <?php if (!empty($error)): ?>
      <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
        <i class="fa-solid fa-triangle-exclamation text-rose-600"></i>
        <span><?php echo $error; ?></span>
      </div>
    <?php endif; ?>

    <form action="order.php" method="POST" class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      <!-- Left: Client & Project Details (2 Columns) -->
      <div class="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        <!-- Step 1: Client Information -->
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 class="text-base font-black text-[#1A237E] flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-[#1A237E] text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Client Account Details</span>
            </h2>
            <?php if (is_logged_in()): ?>
              <span class="text-xs text-emerald-600 font-bold"><i class="fa-solid fa-circle-check"></i> Signed In as <?php echo sanitize($_SESSION['user_name']); ?></span>
            <?php endif; ?>
          </div>

          <?php if (!is_logged_in()): ?>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label class="block text-slate-700 font-bold mb-1.5">Full Name *</label>
                <input type="text" name="customer_name" required placeholder="e.g. Rajesh Verma" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-slate-800 focus:outline-none focus:border-[#FF9933] focus:bg-white text-xs">
              </div>
              <div>
                <label class="block text-slate-700 font-bold mb-1.5">Work Email Address *</label>
                <input type="email" name="customer_email" required placeholder="rajesh@brand.com" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-slate-800 focus:outline-none focus:border-[#FF9933] focus:bg-white text-xs">
              </div>
              <div>
                <label class="block text-slate-700 font-bold mb-1.5">WhatsApp / Phone Number *</label>
                <input type="tel" name="customer_phone" required placeholder="+91 98765 43210" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-slate-800 focus:outline-none focus:border-[#FF9933] focus:bg-white text-xs">
              </div>
              <div>
                <label class="block text-slate-700 font-bold mb-1.5">Portal Password (For Tracking)</label>
                <input type="password" name="customer_password" placeholder="Create password (optional)" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-slate-800 focus:outline-none focus:border-[#FF9933] focus:bg-white text-xs">
              </div>
            </div>
          <?php else: ?>
            <div class="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 space-y-1">
              <p><strong>Name:</strong> <?php echo sanitize($_SESSION['user_name']); ?></p>
              <p><strong>Email:</strong> <?php echo sanitize($_SESSION['user_email']); ?></p>
            </div>
          <?php endif; ?>
        </div>

        <!-- Step 2: Project & Website Brief -->
        <div class="space-y-4 pt-2">
          <div class="border-b border-slate-100 pb-3">
            <h2 class="text-base font-black text-[#1A237E] flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-[#1A237E] text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Project & Website Details</span>
            </h2>
          </div>

          <div class="space-y-4 text-xs">
            <div>
              <label class="block text-slate-700 font-bold mb-1.5">Website URL / Domain (if any)</label>
              <input type="text" name="website_url" placeholder="e.g. https://mybusiness.com" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-slate-800 focus:outline-none focus:border-[#FF9933] focus:bg-white text-xs">
            </div>

            <div>
              <label class="block text-slate-700 font-bold mb-1.5">Target Keywords or Business Goals</label>
              <input type="text" name="target_keywords" placeholder="e.g. Dental clinic Delhi, Organic fashion store, etc." class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-slate-800 focus:outline-none focus:border-[#FF9933] focus:bg-white text-xs">
            </div>

            <div>
              <label class="block text-slate-700 font-bold mb-1.5">Additional Requirements / Notes</label>
              <textarea name="order_notes" rows="3" placeholder="Tell us specific targets, competitors, or questions..." class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-800 focus:outline-none focus:border-[#FF9933] focus:bg-white text-xs"></textarea>
            </div>
          </div>
        </div>

      </div>

      <!-- Right: Order Summary Sidebar -->
      <div class="space-y-6">
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-5">
          <h3 class="text-base font-black text-[#1A237E] border-b border-slate-100 pb-3">Campaign Summary</h3>

          <div class="space-y-3 text-xs">
            <div>
              <label class="block text-slate-500 text-[11px] font-semibold mb-1">Selected Service</label>
              <select name="service_id" onchange="window.location.href='order.php?service_id=' + this.value" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 text-xs focus:outline-none focus:border-[#FF9933]">
                <?php
                if ($pdo) {
                    $all_svc = $pdo->query("SELECT id, title FROM services WHERE status = 'active' ORDER BY id ASC")->fetchAll();
                    foreach ($all_svc as $s) {
                        $sel = ($service && $service['id'] == $s['id']) ? 'selected' : '';
                        echo "<option value='{$s['id']}' $sel>" . sanitize($s['title']) . "</option>";
                    }
                }
                ?>
              </select>
            </div>

            <div>
              <label class="block text-slate-500 text-[11px] font-semibold mb-1">Selected Package</label>
              <select name="plan_name" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 text-xs focus:outline-none focus:border-[#FF9933]">
                <?php
                if ($pdo && $service) {
                    $all_plans = $pdo->prepare("SELECT plan_name, price, billing_period FROM service_plans WHERE service_id = ? ORDER BY id ASC");
                    $all_plans->execute([$service['id']]);
                    foreach ($all_plans->fetchAll() as $pl) {
                        $sel = ($plan && strtolower($plan['plan_name']) === strtolower($pl['plan_name'])) ? 'selected' : '';
                        echo "<option value='{$pl['plan_name']}' $sel>" . sanitize($pl['plan_name']) . " Plan — ₹" . number_format($pl['price']) . " / " . sanitize($pl['billing_period']) . "</option>";
                    }
                }
                ?>
              </select>
            </div>

            <div class="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-100 space-y-2 pt-3">
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-600">Package Base:</span>
                <span class="font-bold text-slate-800">₹<?php echo number_format($plan['price'] ?? 14999); ?></span>
              </div>
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-600">Onboarding Setup Fee:</span>
                <span class="font-bold text-emerald-600">FREE (Waived)</span>
              </div>
              <div class="border-t border-orange-200/80 pt-2 flex justify-between items-center">
                <span class="font-extrabold text-[#1A237E]">Total Payable:</span>
                <span class="font-black text-xl text-[#FF9933]">₹<?php echo number_format($plan['price'] ?? 14999); ?></span>
              </div>
            </div>

            <!-- Features Included -->
            <?php if (!empty($plan['features'])): ?>
              <div class="space-y-1.5 pt-2 text-[11px] text-slate-600">
                <p class="font-bold text-slate-800">Highlights Included:</p>
                <?php foreach (explode(',', $plan['features']) as $feat): ?>
                  <p class="flex items-start gap-1.5">
                    <i class="fa-solid fa-check text-emerald-500 mt-0.5 shrink-0"></i>
                    <span><?php echo sanitize(trim($feat)); ?></span>
                  </p>
                <?php endforeach; ?>
              </div>
            <?php endif; ?>
          </div>

          <button 
            type="submit" 
            name="place_order"
            class="w-full py-4 rounded-2xl bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs shadow-lg hover:shadow-xl transition active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <i class="fa-solid fa-lock"></i>
            <span>Confirm & Launch Campaign</span>
          </button>

          <p class="text-[10px] text-slate-400 text-center leading-relaxed">
            100% Satisfaction Guarantee • Invoices with GST & Live Status Dashboard
          </p>
        </div>
      </div>

    </form>

  <?php endif; ?>

</div>

<?php require_once __DIR__ . '/footer.php'; ?>
