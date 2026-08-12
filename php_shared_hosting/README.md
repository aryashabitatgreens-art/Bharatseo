# 🚀 Shared Hosting PHP Deployment Guide

This package contains the complete **Pure PHP + MySQL** standalone website and Admin Panel for **Bharat SEO / Your Digital Startup**.

It is pre-configured to run out-of-the-box on **cPanel**, **Hostinger**, **GoDaddy**, **Namecheap**, or any standard shared web hosting running **PHP 7.4 / 8.0 / 8.1 / 8.2 / 8.3** & **MySQL / MariaDB**.

---

## 📂 Package Folder Contents (`/php_shared_hosting/`)

- `config.php`: Database connection settings & helper functions.
- `schema.sql`: Complete MySQL database schema + pre-loaded sample data.
- `index.php`: Agency Homepage with high-converting layout.
- `services.php`: Services & Service Plans with pricing cards.
- `about.php`: Agency story, vision, and team members.
- `portfolio.php`: Case studies & client success stories.
- `blog.php`: Search & web growth insights blog.
- `career.php`: Job openings & online application form.
- `contact.php`: Contact form with database lead capture.
- `login.php` & `logout.php`: Client & Admin Portal Authentication.
- `dashboard.php`: Client Portal for tracking active orders.
- `admin.php`: Full Admin Dashboard to manage Headquarters Address, Branding, Inquiries & Settings.
- `.htaccess`: URL rewriting, gzip compression, and security headers.

---

## ⚙️ Step-by-Step Installation Steps

### Step 1: Create MySQL Database in cPanel / Hostinger
1. Log into your **cPanel** or **Hostinger hPanel**.
2. Go to **MySQL Databases**.
3. Create a new database (e.g., `u123456_bharat_db`).
4. Create a new database user (e.g., `u123456_bharat_user`) with a strong password.
5. Assign all privileges to the user for this database.

### Step 2: Import `schema.sql` in phpMyAdmin
1. Open **phpMyAdmin** from your hosting control panel.
2. Select your newly created database.
3. Click on the **Import** tab.
4. Choose the `schema.sql` file from this folder and click **Go**.

### Step 3: Configure `config.php`
Open `config.php` and update lines 11–14 with your database credentials:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'u123456_bharat_user'); // Your MySQL Username
define('DB_PASS', 'YourSecurePassword123!'); // Your MySQL Password
define('DB_NAME', 'u123456_bharat_db');   // Your MySQL Database Name
```

### Step 4: Upload Files to `public_html`
1. Go to **File Manager** in cPanel.
2. Open `public_html/`.
3. Upload all files inside the `php_shared_hosting` folder directly into `public_html/`.

---

## 🔐 Admin Login Credentials

- **Admin Login URL**: `https://yourdomain.com/login.php`
- **Default Email**: `admin@bharatseo.in`
- **Default Password**: `admin123`

*(You can update the password or admin email anytime from `login.php` or `admin.php`)*
