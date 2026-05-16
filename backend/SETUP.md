# Backend Setup Guide - BRDT Charity API

Complete step-by-step guide to setup the BRDT backend server with MySQL and Node.js.

---

## 📋 Prerequisites

### System Requirements
- **Node.js:** v16 or higher
- **npm:** v8 or higher
- **MySQL:** 8.0 or higher
- **RAM:** 2GB minimum
- **Storage:** 500MB minimum

### Skills Required
- Basic command line usage
- Understanding of REST APIs
- Basic MySQL knowledge

---

## 🔧 Step 1: Install Dependencies

### 1.1 Install Node.js
- **Download:** https://nodejs.org/ (LTS version recommended)
- **Verify installation:**
```bash
node --version
npm --version
```

### 1.2 Install MySQL
- **Download:** https://dev.mysql.com/downloads/mysql/
- **Or use:** XAMPP, WAMP, or MAMP for local development

**Verify MySQL installation:**
```bash
mysql --version
```

---

## 📂 Step 2: Setup Project

### 2.1 Navigate to Backend Directory
```bash
cd "f:/BRDT-Charity v1/backend"
```

### 2.2 Install Node Dependencies
```bash
npm install
```

This will install all required packages from `package.json`:
- express (web framework)
- mysql2 (database driver)
- nodemailer (email service)
- stripe (payment processing)
- pdfkit (PDF generation)
- bcryptjs (password hashing)
- jsonwebtoken (authentication)
- And more...

---

## 🗄️ Step 3: Setup MySQL Database

### 3.1 Create Database

**Option A: Using Command Line**
```bash
mysql -u root -p < src/config/schema.sql
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Create new connection if needed
3. Click "File" → "Open SQL Script"
4. Select `src/config/schema.sql`
5. Click Execute (lightning icon)

**Option C: Using phpMyAdmin**
1. Open phpMyAdmin (usually at `http://localhost/phpmyadmin`)
2. Click "Import" tab
3. Select `src/config/schema.sql`
4. Click "Go"

### 3.2 Verify Database Creation

```bash
mysql -u root -p
# Enter password

# In MySQL prompt:
SHOW DATABASES;
USE brdt_charity;
SHOW TABLES;
```

Expected tables: users, donations, invoices, contact_submissions, email_logs, newsletter_subscriptions, etc.

---

## ⚙️ Step 4: Configure Environment Variables

### 4.1 Create .env File

```bash
cp .env.example .env
```

### 4.2 Edit .env File

Open `.env` in any text editor and configure:

```env
# ==================== DATABASE ====================
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=brdt_charity
DB_PORT=3306

# ==================== SERVER ====================
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:8000

# ==================== SECURITY ====================
JWT_SECRET=your_super_secret_jwt_key_123456789
JWT_EXPIRE=7d

# ==================== EMAIL SERVICE ====================
# Using Gmail (easiest for testing)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password  # NOT your regular password!
BRDT_EMAIL=noreply@brdtrust.org
BRDT_DISPLAY_NAME=BRDT - Belghar Rural Development Trust

# ==================== STRIPE (Payment Processing) ====================
STRIPE_SECRET_KEY=sk_test_your_test_key_here
STRIPE_PUBLIC_KEY=pk_test_your_test_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# ==================== ORGANIZATION ====================
ORG_NAME=Belghar Rural Development Trust
ORG_PHONE=+44 7540 253384
ORG_WEBSITE=https://www.brdtrust.org
```

---

## 📧 Step 5: Setup Email Service

### Option A: Using Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication:**
   - Visit: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Create App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password
   - Paste in `.env` as `EMAIL_PASSWORD`

3. **Configure .env:**
```env
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

### Option B: Using SendGrid (Recommended for Production)

1. **Create Account:**
   - Visit: https://sendgrid.com
   - Sign up for free account
   - Verify email

2. **Create API Key:**
   - Navigate to: Settings → API Keys
   - Create "Full Access" API key
   - Copy the key

3. **Install SendGrid Package:**
```bash
npm install @sendgrid/mail
```

4. **Update .env:**
```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

---

## 💳 Step 6: Setup Stripe (Payment Processing)

### 6.1 Create Stripe Account

1. **Visit:** https://dashboard.stripe.com/register
2. **Sign up** with your email
3. **Verify** your email address

### 6.2 Get Test Keys

1. **Navigate to:** Developers → API Keys
2. **View test data toggle:** ON
3. **Copy:**
   - Publishable key → `STRIPE_PUBLIC_KEY`
   - Secret key → `STRIPE_SECRET_KEY`

### 6.3 Test Credentials

**Use these for testing:**
- Card: `4242 4242 4242 4242`
- Exp: Any future date (e.g., `12/25`)
- CVC: Any 3 digits (e.g., `123`)

### 6.4 Setup Webhook (Optional)

```bash
# For development
npm install stripe
stripe listen --forward-to localhost:5000/api/webhooks
```

---

## 🚀 Step 7: Start the Server

### 7.1 Development Mode (with auto-reload)

```bash
npm run dev
```

Expected output:
```
╔════════════════════════════════════════════╗
║  🌿 BRDT Charity API Server Started       ║
║                                            ║
║  Server: http://localhost:5000            ║
║  Environment: development                 ║
║  Database: brdt_charity                   ║
╚════════════════════════════════════════════╝
```

### 7.2 Production Mode

```bash
npm start
```

---

## ✅ Step 8: Verify Installation

### 8.1 Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "success",
  "message": "BRDT API is running",
  "timestamp": "2026-05-13T10:00:00.000Z",
  "environment": "development"
}
```

### 8.2 Test User Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!",
    "fullName": "Test User"
  }'
```

Expected response:
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "userId": "uuid-here",
    "email": "test@example.com",
    "token": "jwt-token-here"
  }
}
```

### 8.3 Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

---

## 🔧 Common Issues & Solutions

### Issue: MySQL Connection Failed
**Error:** `Error: connect ECONNREFUSED 127.0.0.1:3306`

**Solutions:**
1. Check MySQL is running:
   - Windows: Services → MySQL80 (start if stopped)
   - Mac: System Preferences → MySQL (start if stopped)
   - Linux: `sudo systemctl start mysql`

2. Verify credentials in `.env`:
   ```bash
   mysql -u root -p
   ```

3. Ensure database exists:
   ```bash
   mysql -u root -p -e "SHOW DATABASES;" | grep brdt_charity
   ```

### Issue: Email Not Sending
**Error:** `Invalid login credentials` or `Authentication failed`

**Solutions:**
1. For Gmail:
   - Verify 2-factor auth is enabled
   - Check app password (not regular password)
   - Allow "Less secure apps" (if not using app password)

2. For SendGrid:
   - Verify API key is correct
   - Check email address is verified
   - Ensure domain is verified (for production)

3. Check logs:
   ```bash
   # Look for email service errors in console
   ```

### Issue: Stripe Errors
**Error:** `Invalid API Key` or `Missing API Key`

**Solutions:**
1. Verify keys are in `.env`:
   ```bash
   grep STRIPE .env
   ```

2. Use correct environment (test keys for development):
   - Test keys start with: `sk_test_` and `pk_test_`
   - Live keys start with: `sk_live_` and `pk_live_`

3. Restart server after updating keys:
   ```bash
   # Stop: Ctrl+C
   # Restart: npm run dev
   ```

### Issue: Port Already in Use
**Error:** `listen EADDRINUSE: address already in use :::5000`

**Solutions:**
1. Use different port:
   ```bash
   PORT=5001 npm run dev
   ```

2. Kill existing process:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F

   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   ```

---

## 📚 Next Steps

### 1. Frontend Integration
Connect frontend to API endpoints:
```javascript
const API_URL = 'http://localhost:5000/api';

// Create donation
fetch(`${API_URL}/donations/create`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 50,
    donationType: 'one-off',
    appealType: 'zakat'
  })
});
```

### 2. Admin Dashboard (Future)
Create admin panel to:
- View all donations
- Generate reports
- Manage users
- Send newsletters

### 3. Testing
```bash
npm test
```

### 4. Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup

---

## 📞 Getting Help

### Documentation
- Express.js: https://expressjs.com
- MySQL: https://dev.mysql.com/doc
- Stripe: https://stripe.com/docs
- Nodemailer: https://nodemailer.com

### Community
- Node.js: https://nodejs.org/en/community
- Stack Overflow: Tag `node.js`, `express`, `mysql`

### Support
- Email: support@brdtrust.org
- GitHub Issues: [Report Issues](https://github.com/akramrafid/BRDT-Website/issues)

---

## ✨ You're All Set!

Your BRDT backend is now running and ready to receive donations!

**Next:** Connect your frontend to the API and start processing donations.

---

**Last Updated:** May 2026  
**Version:** 1.0.0
