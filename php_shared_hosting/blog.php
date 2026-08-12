<?php
require_once __DIR__ . '/header.php';

$single_blog = null;
$blogs = [];

if ($pdo) {
    if (!empty($_GET['slug'])) {
        $stmt = $pdo->prepare("SELECT * FROM blogs WHERE slug = ? AND status = 'published'");
        $stmt->execute([$_GET['slug']]);
        $single_blog = $stmt->fetch();
    }

    if (!$single_blog) {
        $stmt = $pdo->query("SELECT * FROM blogs WHERE status = 'published' ORDER BY id DESC");
        $blogs = $stmt->fetchAll();
    }
}
?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <?php if ($single_blog): ?>
    <!-- Single Blog Post View -->
    <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
      <a href="blog.php" class="text-xs font-bold text-[#FF9933] hover:underline inline-flex items-center gap-1.5">
        <i class="fa-solid fa-arrow-left"></i> Back to All Articles
      </a>
      
      <span class="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1A237E] font-bold text-[11px]"><?php echo sanitize($single_blog['category']); ?></span>
      <h1 class="text-2xl sm:text-3xl font-black text-[#1A237E] leading-tight"><?php echo sanitize($single_blog['title']); ?></h1>
      
      <div class="flex items-center text-xs text-slate-500 gap-4 border-y border-slate-100 py-3">
        <span><i class="fa-solid fa-user text-[#FF9933]"></i> <?php echo sanitize($single_blog['author']); ?></span>
        <span><i class="fa-solid fa-calendar"></i> <?php echo date('M d, Y', strtotime($single_blog['created_at'])); ?></span>
      </div>

      <img src="<?php echo sanitize($single_blog['image']); ?>" alt="<?php echo sanitize($single_blog['title']); ?>" class="w-full h-72 object-cover rounded-xl">

      <div class="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-4">
        <?php echo sanitize($single_blog['content']); ?>
      </div>
    </div>

  <?php else: ?>
    <!-- Blog List Grid -->
    <div class="space-y-10">
      <div class="text-center max-w-3xl mx-auto space-y-3">
        <span class="text-[#FF9933] font-black text-xs tracking-wider uppercase">Search & Web Growth Insights</span>
        <h1 class="text-3xl font-black text-[#1A237E]">Latest Articles & Growth Strategies</h1>
        <p class="text-slate-600 text-xs sm:text-sm">Actionable guides on technical SEO, speed optimization, and lead generation.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <?php if (!empty($blogs)): ?>
          <?php foreach ($blogs as $b): ?>
            <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
              <div>
                <img src="<?php echo sanitize($b['image']); ?>" alt="<?php echo sanitize($b['title']); ?>" class="w-full h-52 object-cover">
                <div class="p-6 space-y-3">
                  <span class="px-3 py-1 rounded-full bg-blue-50 text-[#1A237E] font-bold text-[11px]"><?php echo sanitize($b['category']); ?></span>
                  <h2 class="text-lg font-black text-[#1A237E]"><?php echo sanitize($b['title']); ?></h2>
                  <p class="text-slate-600 text-xs leading-relaxed line-clamp-3"><?php echo sanitize($b['excerpt']); ?></p>
                </div>
              </div>

              <div class="px-6 pb-6 pt-0 flex justify-between items-center text-xs">
                <span class="text-slate-400 font-medium"><?php echo date('M d, Y', strtotime($b['created_at'])); ?></span>
                <a href="blog.php?slug=<?php echo urlencode($b['slug']); ?>" class="font-bold text-[#FF9933] hover:underline flex items-center gap-1">
                  Read Full Article <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </a>
              </div>
            </div>
          <?php endforeach; ?>
        <?php else: ?>
          <p class="text-center text-slate-500 text-xs col-span-2">No blog articles published yet.</p>
        <?php endif; ?>
      </div>
    </div>
  <?php endif; ?>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
