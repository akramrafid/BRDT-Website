# BRDT Backend - Installation Checklist

Complete this checklist to get your backend running:

---

## 📋 Pre-Installation

- [ ] Node.js v16+ installed (`node --version`)
- [ ] MySQL 8.0+ installed and running
- [ ] npm v8+ installed (`npm --version`)
- [ ] Text editor (VS Code, Sublime, etc.)
- [ ] Stripe account created (https://stripe.com)
- [ ] Email service configured (Gmail or SendGrid)

---

## 🔧 Installation Steps

### Step 1: Install Dependencies
```bash
cd backend
npm install
```
- [ ] Command executed without errors
- [ ] `node_modules/` folder created
- [ ] Takes 2-5 minutes depending on internet speed

### Step 2: Create MySQL Database
```bash
mysql -u root -p < src/config/schema.sql
```
- [ ] Enter MySQL password when prompted
- [ ] No errors in output
- [ ] Database `brdt_charity` created
- [ ] All 8 tables created

### Step 3: Setup Environment File
```bash
cp .env.example .env
```
- [ ] `.env` file created in backend folder
- [ ] Open `.env` in text editor

### Step 4: Configure Database
Edit `.env` file:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=brdt_charity
DB_PORT=3306
```
- [ ] Replace `your_mysql_password` with your MySQL password
- [ ] Save `.env` file

### Step 5: Configure JWT Secret
Generate secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy output and paste in `.env`:
```
JWT_SECRET=your_copied_value_here
```
- [ ] JWT_SECRET updated with random value
- [ ] Not using the default value

### Step 6: Setup Email Service

#### Option A: Gmail (Easiest for Testing)
1. [ ] Go to: https://myaccount.google.com/security
2. [ ] Enable 2-Step Verification
3. [ ] Go to: https://myaccount.google.com/apppasswords
4. [ ] Create app password
5. [ ] Copy 16-character password
6. [ ] Update `.env`:
```
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

#### Option B: SendGrid (Better for Production)
1. [ ] Go to: https://sendgrid.com
2. [ ] Create account
3. [ ] Go to: Settings → API Keys
4. [ ] Create new API key
5. [ ] Copy key
6. [ ] Update `.env`:
```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

### Step 7: Setup Stripe

1. [ ] Go to: https://dashboard.stripe.com
2. [ ] Go to: Developers → API Keys
3. [ ] Toggle "View test data"
4. [ ] Copy test keys
5. [ ] Update `.env`:
```
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLIC_KEY=pk_test_xxxxx
```

### Step 8: Update Organization Details
```env
ORG_NAME=Belghar Rural Development Trust
ORG_PHONE=+44 7540 253384
ORG_WEBSITE=https://www.brdtrust.org
BRDT_EMAIL=noreply@brdtrust.org
BRDT_DISPLAY_NAME=BRDT - Belghar Rural Development Trust
```
- [ ] All fields filled in
- [ ] Email address configured

### Step 9: Start Server
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] See: "🌿 BRDT Charity API Server Started"
- [ ] Running on http://localhost:5000
- [ ] ✅ MySQL connected message

---

## ✅ Verification Steps

### Test 1: Health Check
```bash
curl http://localhost:5000/api/health
```
- [ ] Response: `"BRDT API is running"`
- [ ] Status code: 200

### Test 2: Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!",
    "fullName": "Test Donor"
  }'
```
- [ ] Response includes `token`
- [ ] Response includes `userId`
- [ ] Status code: 201

### Test 3: Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```
- [ ] Response includes `token`
- [ ] Status code: 200

### Test 4: Database Connection
In MySQL terminal:
```sql
mysql -u root -p
USE brdt_charity;
SHOW TABLES;
```
- [ ] See 8 tables listed
- [ ] All tables created without errors

### Test 5: Email Service
Check `.env` has email configured:
- [ ] EMAIL_USER set
- [ ] EMAIL_PASSWORD set
- [ ] BRDT_EMAIL set

Look for email service startup message in console.

---

## 🚀 Final Checks

- [ ] All 5 tests passed
- [ ] No errors in console
- [ ] `.env` file configured with all values
- [ ] Server running on http://localhost:5000
- [ ] Database tables created
- [ ] Ready for frontend integration

---

## 🔗 Frontend Integration

### Update Frontend URLs
In your frontend HTML/JavaScript:

```javascript
const API_URL = 'http://localhost:5000/api';

// Example: Create donation
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

---

## 📚 Documentation References

- **Setup Guide:** See SETUP.md
- **API Docs:** See API.md
- **Project Overview:** See README.md

---

## ⚠️ Common Issues

### Issue: MySQL Connection Failed
**Solution:** 
1. Check MySQL is running
2. Verify DB_USER and DB_PASSWORD in `.env`
3. Restart server

### Issue: Email Not Sending
**Solution:**
1. For Gmail: Enable app passwords
2. Verify EMAIL_USER and EMAIL_PASSWORD
3. Check BRDT_EMAIL is set

### Issue: Port Already in Use
**Solution:**
```bash
# Change port in .env
PORT=5001

# Or kill existing process
# Windows: netstat -ano | findstr :5000
# Mac: lsof -ti:5000 | xargs kill -9
```

### Issue: npm install Failed
**Solution:**
```bash
rm package-lock.json
npm cache clean --force
npm install
```

---

## 📞 Getting Help

If you get stuck:

1. **Check Console Output** - Look for error messages
2. **Review Documentation** - See SETUP.md and API.md
3. **Check .env File** - Verify all credentials
4. **Verify Services** - MySQL, Email, Stripe all configured
5. **Try Tests** - Run curl commands to test endpoints

---

## 🎉 Success!

Once all checks pass:

✅ Your backend is fully operational!  
✅ Ready to process donations  
✅ Ready for frontend integration  
✅ Ready to send invoices and emails  

---

**Checklist Status:** Ready to Start  
**Time Estimate:** 15-30 minutes  
**Difficulty:** Easy (follow steps 1-2-3)  

Start with Step 1: Install Dependencies

Good luck! 🚀
