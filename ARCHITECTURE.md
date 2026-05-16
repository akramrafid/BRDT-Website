# Project Architecture - BRDT Charity Website

Complete project structure and organization documentation.

---

## 📦 Root Level Structure

```
BRDT-Charity v1/
├── frontend/                    # Frontend application (HTML/CSS/JS)
├── backend/                     # Backend API (Node.js/Express)
├── docs/                        # Project documentation
├── config/                      # Configuration files
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Root workspace config
└── README.md                    # Project overview
```

---

## 🎨 Frontend Structure (`/frontend`)

```
frontend/
├── public/                      # Static served files
│   ├── index.html              # Homepage
│   ├── about.html              # About Us
│   ├── projects.html           # Projects page
│   ├── madrasah.html           # Madrasah program
│   ├── ramadan.html            # Ramadan campaign
│   ├── contact.html            # Contact form
│   ├── login.html              # User login
│   ├── register.html           # User registration
│   ├── appeal-*.html           # 7 Appeal campaign pages
│   ├── logo.png                # Organization logo
│   │
│   └── assets/                 # Static assets
│       ├── images/             # Image files
│       │   ├── hero.jpg
│       │   ├── projects/
│       │   ├── team/
│       │   └── logos/
│       │
│       └── css/                # Stylesheets
│           ├── style.css       # Main stylesheet
│           ├── responsive.css  # Responsive design
│           └── animations.css  # CSS animations
│
├── src/                        # Source code (optional future)
│   ├── js/                     # JavaScript modules
│   │   ├── modules/            # Feature modules
│   │   │   ├── donation.js     # Donation widget
│   │   │   ├── auth.js         # Authentication
│   │   │   ├── api.js          # API client
│   │   │   └── form.js         # Form handling
│   │   │
│   │   ├── utils/              # Utility functions
│   │   │   ├── helpers.js      # General helpers
│   │   │   ├── validators.js   # Input validation
│   │   │   └── constants.js    # App constants
│   │   │
│   │   └── main.js             # Entry point
│   │
│   └── css/                    # CSS source (SCSS optional)
│       └── main.scss
│
├── package.json                # Frontend dependencies
├── .env.example                # Frontend env template
└── README.md                   # Frontend documentation
```

---

## 🔧 Backend Structure (`/backend`)

```
backend/
├── src/
│   ├── api/                    # Route handlers
│   │   ├── auth.js             # Authentication routes
│   │   ├── donations.js        # Donation processing
│   │   ├── invoices.js         # Invoice management
│   │   ├── contact.js          # Contact form
│   │   └── users.js            # User profiles
│   │
│   ├── services/               # Business logic
│   │   ├── emailService.js     # Email sending
│   │   ├── pdfService.js       # PDF generation
│   │   ├── paymentService.js   # Stripe integration
│   │   └── authService.js      # Auth logic
│   │
│   ├── models/                 # Database operations
│   │   ├── User.js
│   │   ├── Donation.js
│   │   ├── Invoice.js
│   │   └── Contact.js
│   │
│   ├── middleware/             # Express middleware
│   │   ├── auth.js             # JWT verification
│   │   ├── validation.js       # Input validation
│   │   ├── errorHandler.js     # Error handling
│   │   └── requestLogger.js    # Request logging
│   │
│   ├── config/                 # Configuration
│   │   ├── database.js         # MySQL connection pool
│   │   ├── schema.sql          # Database schema
│   │   └── constants.js        # App constants
│   │
│   └── utils/                  # Helper utilities
│       ├── helpers.js          # General helpers
│       ├── validators.js       # Validation logic
│       └── formatters.js       # Data formatting
│
├── uploads/                    # File uploads
│   ├── invoices/               # Generated PDF invoices
│   ├── documents/              # User documents
│   └── temp/                   # Temporary files
│
├── templates/                  # Email templates
│   ├── donation-confirmation.html
│   ├── invoice.html
│   ├── contact-response.html
│   └── newsletter.html
│
├── server.js                   # Express app setup
├── package.json                # Backend dependencies
├── .env.example                # Backend env template
├── .gitignore                  # Git ignore rules
│
├── README.md                   # Backend quick start
├── SETUP.md                    # Detailed setup guide
├── API.md                      # API documentation
├── CHECKLIST.md                # Installation checklist
├── COMPLETE.md                 # Completion summary
└── ARCHITECTURE.md             # Backend architecture
```

---

## 📚 Documentation Structure (`/docs`)

```
docs/
├── architecture/
│   ├── ARCHITECTURE.md         # Overall architecture
│   ├── DATA-FLOW.md           # Data flow diagrams
│   ├── DATABASE-SCHEMA.md     # Database design
│   └── DEPLOYMENT.md          # Deployment guide
│
├── backend/
│   ├── API-ENDPOINTS.md       # Complete API reference
│   ├── SETUP-BACKEND.md       # Backend setup guide
│   ├── SECURITY.md            # Security guidelines
│   └── TROUBLESHOOTING.md     # Common issues
│
├── frontend/
│   ├── STRUCTURE.md           # Frontend organization
│   ├── COMPONENTS.md          # Component documentation
│   ├── STYLING.md             # CSS guidelines
│   └── JAVASCRIPT.md          # JS guidelines
│
└── CONTRIBUTING.md            # Contribution guidelines
```

---

## 🔐 Configuration Structure (`/config`)

```
config/
├── development.env             # Development config
├── production.env              # Production config
├── test.env                    # Test config
├── database.json              # Database config
└── stripe.json                # Stripe config
```

---

## 📋 Key Files Location

| File | Location | Purpose |
|------|----------|---------|
| HTML Pages | `frontend/public/` | Website content |
| Stylesheets | `frontend/public/assets/css/` | Styling |
| Images | `frontend/public/assets/images/` | Images |
| Backend Routes | `backend/src/api/` | API endpoints |
| Email Templates | `backend/templates/` | Email HTML |
| Database Schema | `backend/src/config/schema.sql` | DB structure |
| Invoices | `backend/uploads/invoices/` | Generated PDFs |
| API Docs | `docs/` | API reference |

---

## 🚀 Development Workflow

### Starting Both Services
```bash
# Install dependencies
npm install-all

# Start both frontend and backend
npm run dev

# Frontend: http://localhost:8000
# Backend: http://localhost:5000/api
```

### Frontend Only
```bash
npm run frontend:dev
# Runs on http://localhost:8000
```

### Backend Only
```bash
npm run backend:dev
# Runs on http://localhost:5000
```

---

## 📤 Deployment Structure

### Production Build
```
dist/
├── frontend/                   # Compiled frontend
│   └── public/                 # Static files
│
└── backend/                    # Built backend
    ├── dist/
    └── uploads/
```

---

## 🔄 Data Flow

```
Browser (Frontend)
    ↓
HTML/CSS/JS (frontend/public/)
    ↓
API Calls to Backend
    ↓
Express Routes (backend/src/api/)
    ↓
Services (backend/src/services/)
    ↓
Models (backend/src/models/)
    ↓
MySQL Database
    ↓
Response back to Frontend
```

---

## 🔐 Environment Variables

### Frontend (.env)
- `VITE_API_URL` - Backend API URL
- `VITE_APP_NAME` - App name
- `VITE_ENVIRONMENT` - dev/prod

### Backend (.env)
- Database credentials
- JWT secret
- Email service credentials
- Stripe keys
- Organization details

---

## 📊 Database Location

- **Schema Definition:** `backend/src/config/schema.sql`
- **Connection Config:** `backend/src/config/database.js`
- **Models:** `backend/src/models/`

---

## 🐛 Debugging Paths

| Issue | Check Path |
|-------|-----------|
| Frontend not loading | `frontend/public/` |
| API not responding | `backend/src/api/` |
| Database error | `backend/src/models/` |
| Email not sending | `backend/services/emailService.js` |
| PDF generation fails | `backend/services/pdfService.js` |
| Database connection | `backend/src/config/database.js` |

---

## 📦 Dependencies

### Frontend
- No NPM dependencies (static HTML/CSS/JS)

### Backend
- express
- mysql2
- stripe
- nodemailer
- pdfkit
- jsonwebtoken
- bcryptjs
- And 10+ others (see package.json)

### Root
- concurrently (for running both in dev)

---

## 🎯 Architecture Principles

1. **Separation of Concerns** - Frontend and backend are separate
2. **Modular Code** - Services, models, middleware are organized
3. **Configuration Management** - Environment variables for all settings
4. **Security First** - JWT, password hashing, input validation
5. **Scalability** - Easy to add new features/modules
6. **Documentation** - Clear structure and guidelines
7. **DRY Principle** - Reusable utilities and helpers

---

## 📝 Adding New Features

### New Backend Endpoint

1. Create route in `backend/src/api/`
2. Create model in `backend/src/models/` if needed
3. Create service in `backend/src/services/` for business logic
4. Add validation in `backend/src/middleware/validation.js`
5. Test endpoint with curl or Postman

### New Frontend Page

1. Create HTML in `frontend/public/`
2. Add CSS in `frontend/public/assets/css/`
3. Add images in `frontend/public/assets/images/`
4. Link from navigation
5. Test in browser

---

## 🔗 Related Documents

- [Backend Architecture](../backend/ARCHITECTURE.md)
- [API Documentation](../docs/architecture/API.md)
- [Database Schema](../docs/architecture/DATABASE-SCHEMA.md)
- [Deployment Guide](../docs/architecture/DEPLOYMENT.md)

---

**Last Updated:** May 13, 2026  
**Version:** 1.0.0  
**Status:** ✅ Complete and Organized
