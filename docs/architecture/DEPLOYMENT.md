# Development & Deployment Guide

Complete guide for developing, testing, and deploying the BRDT Charity website.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ 
- MySQL 8.0+
- npm or yarn
- Stripe account (testing)
- Email service (Gmail/SendGrid)

### Installation Steps

#### 1. Clone Repository
```bash
git clone <repository-url>
cd "BRDT-Charity v1"
```

#### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Or for all workspaces (if using npm 7+)
npm install --workspaces
```

#### 3. Setup Environment Variables
```bash
# Copy template
cp .env.example .env

# Edit .env with your values
nano .env
```

**Required Variables:**
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET`
- `STRIPE_SECRET_KEY`, `STRIPE_PUBLIC_KEY`
- `GMAIL_USER`, `GMAIL_PASSWORD` (or SendGrid key)
- `ORGANIZATION_EMAIL`

#### 4. Setup Database
```bash
# Navigate to backend
cd backend

# Run schema
mysql -u root -p < src/config/schema.sql

# Or using database client
# Import backend/src/config/schema.sql
```

#### 5. Start Services

**Development (Both Services):**
```bash
npm run dev
```

**Frontend Only:**
```bash
npm run frontend:dev
# Serve on http://localhost:8000
```

**Backend Only:**
```bash
npm run backend:dev
# API on http://localhost:5000/api
```

---

## 🔧 Development Workflow

### Frontend Development

**Add New Page:**
1. Create HTML in `frontend/public/`
2. Include CSS: `<link href="assets/css/style.css" rel="stylesheet">`
3. Include images: `<img src="assets/images/..." alt="...">`
4. Update navigation in header
5. Test across devices

**Update Styles:**
- Edit `frontend/public/assets/css/style.css`
- CSS properties defined at root for theming
- Use responsive breakpoints: 768px (tablet), 1025px (desktop)

**Add Assets:**
- Images: `frontend/public/assets/images/[category]/`
- Must be optimized (< 200KB recommended)
- Use descriptive names

### Backend Development

**Create New API Endpoint:**
1. Create route in `backend/src/api/[resource].js`
2. Add model in `backend/src/models/[Resource].js` if needed
3. Create service in `backend/src/services/` for business logic
4. Add validation in `backend/src/middleware/validation.js`
5. Test with curl or Postman

**Example Endpoint:**
```javascript
// backend/src/api/example.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { validateInput } from '../middleware/validation.js';
import * as ExampleModel from '../models/Example.js';

const router = express.Router();

// GET /api/example/:id
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const data = await ExampleModel.getById(req.params.id);
    res.json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
});

export default router;
```

---

## 🧪 Testing

### Manual Testing

**Frontend:**
```bash
# Test in browser
npm run frontend:dev

# Check all pages load
# Validate forms work
# Test responsive design (DevTools)
```

**Backend:**
```bash
# Start backend
npm run backend:dev

# Test endpoints with curl
curl -X GET http://localhost:5000/api/health

# Or use Postman/Insomnia
```

### Test Credentials

**Stripe Test Card:**
- Number: `4242 4242 4242 4242`
- Expiry: `12/25`
- CVC: `123`

**Test Donation:**
```bash
curl -X POST http://localhost:5000/api/donations/create \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "currency": "bdt",
    "donationType": "one-off",
    "appealType": "most-needed"
  }'
```

---

## 📦 Building for Production

### Frontend Build

```bash
# No build step needed for static site
# Just ensure all assets are in frontend/public/

# Optional: Minify CSS
# Use tools like cssnano or clean-css
npx cleancss -o frontend/public/assets/css/style.min.css \
  frontend/public/assets/css/style.css
```

### Backend Build

```bash
cd backend

# Dependencies already installed
# No TypeScript compilation needed

# Production start
npm start
```

### Environment Configuration

**Production .env:**
```env
NODE_ENV=production
PORT=5000
DB_HOST=production-db-server
DB_USER=prod_user
JWT_SECRET=<long-random-string>
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLIC_KEY=pk_live_xxxxx
ORGANIZATION_EMAIL=donations@brdt.org
```

---

## 🚀 Deployment

### Option 1: Traditional Server (VPS/EC2)

```bash
# 1. SSH into server
ssh user@server.ip

# 2. Clone repository
git clone <repo-url>
cd "BRDT-Charity v1"

# 3. Install dependencies
npm install

# 4. Setup .env
nano .env

# 5. Setup MySQL
mysql < backend/src/config/schema.sql

# 6. Start with PM2 (process manager)
npm install -g pm2
pm2 start backend/server.js --name "brdt-api"
pm2 startup
pm2 save

# 7. Serve frontend with Nginx
# See Nginx config below
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/brdt

upstream brdt_api {
  server localhost:5000;
}

server {
  listen 80;
  server_name brdt.org www.brdt.org;

  # Frontend
  location / {
    root /var/www/brdt/frontend/public;
    try_files $uri $uri/ =404;
  }

  # Backend API
  location /api/ {
    proxy_pass http://brdt_api;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  # File uploads
  location /uploads/ {
    alias /var/www/brdt/backend/uploads/;
  }
}
```

### Option 2: Docker Deployment

Create `Dockerfile` for backend:
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --only=production

COPY backend/ ./

EXPOSE 5000
CMD ["node", "server.js"]
```

Build and deploy:
```bash
docker build -t brdt-api:latest .
docker run -d --name brdt-api -p 5000:5000 --env-file .env brdt-api:latest
```

### Option 3: Vercel/Netlify

**Frontend (Netlify):**
```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = "frontend/public"

[[redirects]]
  from = "/api/*"
  to = "https://api.brdt.org/api/:splat"
  status = 200
```

**Backend (Vercel):**
```bash
# vercel.json
{
  "version": 2,
  "builds": [{ "src": "backend/server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "backend/server.js" }]
}
```

---

## 🔒 Security Checklist

- [ ] JWT_SECRET is strong (32+ characters)
- [ ] Environment variables not committed to git
- [ ] HTTPS enabled in production
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL queries parameterized
- [ ] Password hashing with bcrypt
- [ ] Sensitive logs removed
- [ ] Security headers enabled (Helmet.js)
- [ ] No test credentials in production

---

## 📊 Monitoring & Logs

### Backend Logs

```bash
# View PM2 logs
pm2 logs brdt-api

# Or check application logs
tail -f backend/logs/app.log
```

### Database Monitoring

```sql
-- Check active connections
SHOW PROCESSLIST;

-- Monitor query performance
EXPLAIN SELECT ...;

-- Check table sizes
SELECT table_name, ROUND(((data_length + index_length) / 1024 / 1024), 2) MB
FROM information_schema.tables
WHERE table_schema = 'brdt';
```

### Stripe Monitoring

- Check Stripe Dashboard for payment statuses
- Monitor webhook delivery logs
- Review dispute/chargeback logs regularly

---

## 🔄 Updating & Maintenance

### Code Updates

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Run database migrations (if any)
npm run migrate

# Restart services
pm2 restart brdt-api
```

### Database Maintenance

```bash
# Backup database
mysqldump -u user -p database > backup-$(date +%Y%m%d).sql

# Optimize tables
OPTIMIZE TABLE users, donations, invoices;

# Check integrity
CHECK TABLE users, donations, invoices;
```

### SSL Certificate Renewal

```bash
# Using Let's Encrypt
sudo certbot renew

# Auto-renewal should be enabled
systemctl status certbot.timer
```

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check port is available
lsof -i :5000

# Check logs
npm run backend:dev

# Check database connection
mysql -h DB_HOST -u DB_USER -p
```

### Database Connection Fails
```bash
# Verify credentials in .env
# Check MySQL is running
systemctl status mysql

# Check connection
mysql -u root -p -e "SELECT 1;"
```

### Emails Not Sending
```bash
# Check email credentials
# Verify Gmail App Password (if using Gmail)
# Check SendGrid API key (if using SendGrid)
# Review email logs in database
SELECT * FROM email_logs ORDER BY created_at DESC;
```

### Payment Processing Issues
```bash
# Check Stripe keys
# Verify Stripe webhook is configured
# Check payment logs
SELECT * FROM donation_transactions ORDER BY created_at DESC;
```

---

## 📚 Related Documentation

- [Architecture Guide](ARCHITECTURE.md)
- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
- [API Documentation](docs/architecture/API-ENDPOINTS.md)
- [Database Schema](docs/architecture/DATABASE-SCHEMA.md)

---

**Last Updated:** May 13, 2026  
**Version:** 1.0.0
