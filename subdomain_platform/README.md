# 🚀 BharatSEO Platform — Subdomain Deployment Package

This directory (`/subdomain_platform`) contains the complete, self-contained standalone portal for **BharatSEO Platform (Coming 2027)**.

You can upload this entire folder directly to your subdomain directory (e.g. `public_html/platform` or a separate subdomain root `platform.bharatseo.site`).

---

## 📁 Package Contents

| File | Description |
| :--- | :--- |
| **`index.php`** | Master high-converting SaaS portal with all 4 product module deep dives, roadmap, architecture, and live waitlist. |
| **`schema.sql`** | Full MySQL Database Schema for storing VIP waitlist subscribers, feature feedback, roadmap milestones, and module metadata. |
| **`config.php`** | Central configuration file for MySQL credentials, site URLs, and helper functions. |
| **`api.php`** | REST API endpoint for AJAX waitlist registration, duplicates validation, and fallback caching. |
| **`install.php`** | 1-Click Database Setup script! Open in your browser to automatically create tables and seed default data. |

---

## 🛠️ Easy 2-Step Installation on cPanel / Shared Hosting

### Step 1: Upload to Subdomain
1. In your cPanel **File Manager**, create your subdomain folder (e.g., `public_html/platform` for `platform.bharatseo.site`).
2. Upload all files from this `subdomain_platform` folder into that directory.

### Step 2: 1-Click Database Setup
1. Create a MySQL Database & User in cPanel.
2. Open `https://platform.bharatseo.site/install.php` in your browser.
3. Enter your DB Host (`localhost`), Database Name, User, and Password.
4. Click **"Run 1-Click Database Setup"**!

*(Note: Even if you don't connect a database immediately, the form will safely save subscribers in `waitlist_subscribers.json` automatically without crashing!)*

---

## 💎 Features Included:
- **4 Core Modules Explained in Detail**:
  1. **AI Resume Builder** (Live ATS 0-100 scoring, contextual bullet rewrites, LaTeX exports).
  2. **AI Website Generator** (Core Web Vitals 99+, automated Schema.org JSON-LD, CloudFront edge deployment).
  3. **SEO Intelligence Suite** (Regional Indian search intent clustering, JSON-LD engine, algorithm leak alerts).
  4. **Business Dashboard** (GST invoice automation, Kanban client boards, MRR & campaign metrics).
- **Interactive Architecture Visualizer**: Detailed breakdown of AWS S3, CloudFront, Lambda, PostgreSQL, Next.js 15, and Bedrock.
- **Detailed 2026-2027 Quarterly Roadmap**: Phased milestones with engineering deliverables.
- **Early Access VIP Waitlist with Live Database API**: Collects names, emails, roles, module interests, and suggestions.
- **Deep Indigo Founder Note**: Communicating the long-term technology vision for India's digital economy.
