<?php
require_once __DIR__ . '/header.php';

$success_msg = '';
$error_msg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit_contact'])) {
    $name = sanitize($_POST['name'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $phone = sanitize($_POST['phone'] ?? '');
    $service = sanitize($_POST['service'] ?? 'SEO & Web Development');
    $message = sanitize($_POST['message'] ?? '');

    if (!empty($name) && !empty($email) && !empty($phone)) {
        if ($pdo) {
            $stmt = $pdo->prepare("INSERT INTO enquiries (name, email, phone, service_interest, message) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$name, $email, $phone, $service, $message]);
            $success_msg = "Thank you $name! Your consultation enquiry has been logged successfully. A senior strategist will call you shortly.";
        } else {
            $error_msg = "Database connection error. Please verify database connection settings.";
        }
    } else {
        $error_msg = "Please fill in all required fields (Name, Email, Phone).";
    }
}
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
  <div class="text-center max-w-3xl mx-auto space-y-3">
    <span class="text-[#FF9933] font-black text-xs tracking-wider uppercase">Let's Connect</span>
    <h1 class="text-3xl font-black text-[#1A237E]">Contact Our Senior Strategist Team</h1>
    <p class="text-slate-600 text-xs sm:text-sm">Get a custom audit, quotation, or campaign consultation for your brand.</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
    
    <!-- Contact Form -->
    <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <h2 class="text-xl font-black text-[#1A237E]">Send Us a Direct Inquiry</h2>

      <?php if (!empty($success_msg)): ?>
        <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <i class="fa-solid fa-circle-check"></i> <?php echo $success_msg; ?>
        </div>
      <?php endif; ?>

      <?php if (!empty($error_msg)): ?>
        <div class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
          <i class="fa-solid fa-triangle-exclamation"></i> <?php echo $error_msg; ?>
        </div>
      <?php endif; ?>

      <form action="contact.php" method="POST" class="space-y-4 text-xs">
        <div>
          <label class="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
          <input type="text" name="name" required placeholder="e.g. Rajesh Sharma" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Work Email *</label>
            <input type="email" name="email" required placeholder="rajesh@company.com" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Mobile Phone *</label>
            <input type="text" name="phone" required placeholder="+91 95208 68276" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
          </div>
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">Service Interest</label>
          <select name="service" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]">
            <option value="Google SEO & Local GMB">Google SEO & Local GMB</option>
            <option value="Custom Web Development">Custom Web Development</option>
            <option value="Google & Meta Ads">Google & Meta Ads</option>
            <option value="E-Commerce Store Engineering">E-Commerce Store Engineering</option>
          </select>
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">Project Details / Goals</label>
          <textarea name="message" rows="4" placeholder="Tell us about your current website URL, target keywords, or project timeline..." class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#FF9933]"></textarea>
        </div>

        <button type="submit" name="submit_contact" class="w-full py-3.5 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs shadow-md transition">
          Submit & Get Free Consultation
        </button>
      </form>
    </div>

    <!-- Contact Info Card -->
    <div class="space-y-6">
      <div class="bg-[#1A237E] text-white p-8 rounded-2xl space-y-6 shadow-md">
        <h2 class="text-xl font-black">Direct Agency Hotline</h2>
        
        <div class="space-y-4 text-xs text-slate-200">
          <div class="flex items-start gap-3">
            <i class="fa-solid fa-location-dot text-[#FF9933] text-base mt-0.5"></i>
            <div>
              <p class="font-bold text-white text-sm">Headquarters Address</p>
              <p class="text-slate-300 leading-relaxed mt-1"><?php echo sanitize($office_address); ?></p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <i class="fa-solid fa-phone text-[#FF9933] text-base"></i>
            <div>
              <p class="font-bold text-white text-sm">Phone Consultation</p>
              <p class="text-slate-300"><?php echo sanitize($contact_phone); ?></p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <i class="fa-solid fa-envelope text-[#FF9933] text-base"></i>
            <div>
              <p class="font-bold text-white text-sm">Email Inquiries</p>
              <p class="text-slate-300"><?php echo sanitize($contact_email); ?></p>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-blue-900">
          <?php $clean_wa = preg_replace('/[^0-9]/', '', !empty($whatsapp_number) ? $whatsapp_number : $contact_phone); ?>
          <a href="https://wa.me/<?php echo $clean_wa; ?>?text=<?php echo urlencode('Hi ' . $site_name . ', I would like to chat on WhatsApp!'); ?>" target="_blank" rel="noreferrer" class="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition shadow-md" id="contact-chat-on-whatsapp-btn-php">
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>

  </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
