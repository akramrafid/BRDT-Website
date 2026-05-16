# BRDT Backend API - Node.js + Express + MySQL

Complete backend server for BRDT Charity Website with donation processing, invoice generation, and email notifications.

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone & Navigate**
```bash
cd backend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Environment Variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Create Database**
```bash
mysql -u root -p < src/config/schema.sql
```

5. **Start Server**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

---

## 📋 Project Structure

```
backend/
├── src/
│   ├── api/                 # API Route handlers
│   │   ├── auth.js         # Authentication (Login, Register)
│   │   ├── donations.js    # Donation processing
│   │   ├── invoices.js     # Invoice retrieval
│   │   ├── contact.js      # Contact form handling
│   │   └── users.js        # User profile management
│   │
│   ├── services/            # Business logic
│   │   ├── emailService.js # Email sending (SendGrid/SMTP)
│   │   ├── pdfService.js   # PDF invoice generation
│   │   └── paymentService.js # Stripe integration
│   │
│   ├── models/              # Database operations
│   │   ├── User.js
│   │   ├── Donation.js
│   │   └── Invoice.js
│   │
│   ├── middleware/          # Express middleware
│   │   ├── auth.js         # JWT authentication
│   │   ├── validation.js   # Input validation
│   │   ├── errorHandler.js # Error handling
│   │   └── requestLogger.js # Request logging
│   │
│   ├── config/              # Configuration
│   │   ├── database.js     # MySQL connection pool
│   │   └── schema.sql      # Database schema
│   │
│   └── utils/               # Helper functions
│       └── helpers.js      # Utility functions
│
├── templates/               # Email templates
├── uploads/                 # Generated invoices
├── .env.example            # Environment template
├── package.json            # Dependencies
├── server.js               # Entry point
└── README.md               # Documentation
```

---

## 🔧 Environment Variables

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=brdt_charity
DB_PORT=3306

# Server
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:8000

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

# Email (Gmail/SendGrid)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
BRDT_EMAIL=noreply@brdtrust.org
BRDT_DISPLAY_NAME=BRDT - Belghar Rural Development Trust

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Organization
ORG_NAME=Belghar Rural Development Trust
ORG_PHONE=+44 7540 253384
ORG_WEBSITE=https://www.brdtrust.org
```

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires token)
- `PUT /api/auth/update` - Update profile
- `PUT /api/auth/change-password` - Change password

### Donations
- `POST /api/donations/create` - Create donation
- `POST /api/donations/process` - Process payment & send invoices
- `GET /api/donations/:donationId` - Get donation details
- `GET /api/donations/user/:userId` - Get user donations (requires token)
- `GET /api/donations/appeal/:appealType/stats` - Get appeal statistics

### Invoices
- `GET /api/invoices/:invoiceId` - Get invoice (requires token)
- `GET /api/invoices/number/:invoiceNumber` - Get invoice by number
- `GET /api/invoices/user/:userId` - Get user invoices (requires token)

### Contact
- `POST /api/contact/submit` - Submit contact form
- `POST /api/contact/respond/:submissionId` - Send response to contact

### Users
- `GET /api/users/profile` - Get user profile (requires token)
- `PUT /api/users/profile/update` - Update profile (requires token)

### Health
- `GET /api/health` - Server health check

---

## 💳 Payment Flow

```
1. User submits donation form
   ↓
2. API creates Stripe PaymentIntent
   ↓
3. Frontend collects payment details
   ↓
4. Frontend confirms payment with Stripe
   ↓
5. API receives payment confirmation
   ↓
6. Donation status updated to "completed"
   ↓
7. PDF invoice generated
   ↓
8. Email sent to donor with invoice
   ↓
9. Email sent to admin with invoice
```

---

## 📧 Email Features

### Automated Emails Sent
1. **Donation Confirmation** - To donor with invoice PDF
2. **Admin Notification** - To BRDT email with donation details
3. **Contact Response** - To user when they submit contact form
4. **Invoice** - PDF attachment to both emails

### Email Service Options
- **Gmail** (recommended for testing)
- **SendGrid** (production recommended)
- **Mailgun**
- **Custom SMTP**

---

## 🔒 Security Features

- **HTTPS/TLS** - Encrypted data transmission
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs with salt
- **Input Validation** - express-validator
- **CORS Protection** - Configurable origins
- **Rate Limiting** - Prevent brute force attacks
- **Helmet.js** - Security headers
- **XSS Prevention** - Input sanitization
- **SQL Injection Prevention** - Parameterized queries

---

## 📊 Database Schema

### Key Tables
- **users** - User accounts and profiles
- **donations** - All donation records
- **invoices** - Generated invoices
- **contact_submissions** - Contact form submissions
- **newsletter_subscriptions** - Newsletter signups
- **email_logs** - Email delivery tracking
- **password_reset_tokens** - Password recovery
- **email_verification_tokens** - Email verification

### Indexes
- Email lookups: O(1)
- Donation queries: Indexed by user, appeal, status, date
- Invoice searches: Indexed by number, date, status
- Fast reporting queries via views

---

## 🧪 Testing Endpoints

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "donor@example.com",
    "password": "SecurePass123!",
    "fullName": "John Donor",
    "phone": "+1234567890"
  }'
```

### Create Donation
```bash
curl -X POST http://localhost:5000/api/donations/create \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50,
    "donationType": "one-off",
    "appealType": "zakat",
    "paymentMethod": "stripe"
  }'
```

### Get Appeal Stats
```bash
curl http://localhost:5000/api/donations/appeal/zakat/stats
```

---

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Update `JWT_SECRET` with strong key
- [ ] Configure Stripe production keys
- [ ] Setup SendGrid or email service
- [ ] Configure database backup
- [ ] Enable HTTPS
- [ ] Setup monitoring and logging
- [ ] Configure rate limiting appropriately
- [ ] Test payment flow end-to-end
- [ ] Setup error tracking (Sentry)

### Hosting Options
- **Railway** (recommended)
- **Render**
- **Heroku**
- **DigitalOcean**
- **AWS Lambda** (serverless)

### Database Hosting
- **PlanetScale** (MySQL)
- **AWS RDS**
- **DigitalOcean Managed MySQL**
- **Linode MySQL**

---

## 📄 Invoice Generation

PDF invoices are automatically generated with:
- BRDT branding and logo
- Donor information
- Donation details
- Invoice number and date
- 100% donation policy statement
- Contact information

Files stored in `uploads/invoices/` directory

---

## 🔄 Workflow Examples

### Complete Donation with Invoice
1. POST `/api/donations/create` → Returns clientSecret
2. Frontend confirms Stripe payment
3. POST `/api/donations/process` → Generates invoice & sends emails
4. Both donor and admin receive PDF invoices

### User Login & Donation History
1. POST `/api/auth/login` → Returns JWT token
2. GET `/api/donations/user/:userId` → Returns user's donations
3. GET `/api/invoices/user/:userId` → Returns user's invoices

---

## 🐛 Troubleshooting

### Database Connection Failed
```
Check DB_HOST, DB_USER, DB_PASSWORD in .env
Ensure MySQL is running and database exists
```

### Email Not Sending
```
Verify EMAIL_USER and EMAIL_PASSWORD
Check EMAIL_HOST and EMAIL_PORT
Enable "Less secure app access" for Gmail
```

### Stripe Payment Errors
```
Verify STRIPE_SECRET_KEY is correct
Check payment intent status in Stripe dashboard
Ensure currency matches (BDT/GBP)
```

### CORS Errors
```
Update FRONTEND_URL in .env
Restart server after changing .env
```

---

## 📞 Support

- **Documentation:** See README.md
- **Issues:** GitHub Issues
- **Security:** security@brdtrust.org

---

## 📄 License

MIT License - BRDT Charity 2026

---

**Last Updated:** May 2026  
**Version:** 1.0.0
