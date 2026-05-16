# 🎯 Getting Started with Reorganized Project

**Welcome!** Your BRDT Charity Website has been professionally reorganized. Here's everything you need to know.

---

## ⚡ Quick Start (5 Minutes)

```bash
# 1. Install all dependencies
npm install

# 2. Copy environment template
cp .env.example .env

# 3. Edit with your values
# (database, email, Stripe keys, etc.)
nano .env

# 4. Setup database
cd backend
mysql -u root -p < src/config/schema.sql

# 5. Start everything
cd ..
npm run dev

# 6. Open in browser
# Frontend: http://localhost:8000
# Backend API: http://localhost:5000/api
```

---

## 📚 Documentation Guide

### 👥 For Everyone
**[README.md](README.md)** - Project overview (5 min read)  
Start here to understand what BRDT website does and its key features.

### 🎯 Understand the Structure
**[ARCHITECTURE.md](ARCHITECTURE.md)** - Complete structure (15 min read)  
Learn where everything is organized and how the project is structured.

### 🤝 To Contribute Code
**[CONTRIBUTING.md](CONTRIBUTING.md)** - How to help (20 min read)  
Guidelines for writing code, commit messages, testing, and pull requests.

### 👨‍💻 For Developers

**Frontend Developer?** → [frontend/README.md](frontend/README.md)
- Where HTML files are
- How to edit pages and styles
- Adding new pages

**Backend Developer?** → [backend/README.md](backend/README.md)
- API endpoints overview
- Database schema
- Services and models

**Need API details?** → [backend/API.md](backend/API.md)
- All endpoints documented
- Request/response examples
- Test credentials

### 🚀 For Deployment
**[docs/architecture/DEPLOYMENT.md](docs/architecture/DEPLOYMENT.md)** - Production setup  
- VPS/EC2 setup
- Docker deployment
- Nginx configuration
- Security checklist

### 📊 Project Navigation
**[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - All documentation  
Map of all documents and how to find what you need.

---

## 📁 Folder Explanation

### `frontend/` - Website Frontend
```
frontend/
├── public/              ← All HTML pages and assets
│   ├── index.html       ← Homepage
│   ├── about.html       ← About page
│   ├── [12 more pages]
│   └── assets/
│       ├── css/         ← Stylesheets
│       └── images/      ← Images
└── src/                 ← Future: JavaScript modules
```

**What to do here:**
- Edit HTML files to change page content
- Edit CSS to change styles
- Add images to `assets/images/`
- Create new pages by copying existing HTML

### `backend/` - API Server
```
backend/
├── src/
│   ├── api/             ← API routes
│   ├── models/          ← Database queries
│   ├── services/        ← Business logic
│   └── middleware/      ← Express middleware
├── uploads/             ← Generated files (PDFs)
└── server.js            ← Main entry point
```

**What to do here:**
- Add new API endpoints
- Create new services
- Add database models
- Configure email/payment

### `docs/` - Documentation
```
docs/
├── architecture/        ← Structure and deployment
├── backend/            ← Backend-specific docs
└── frontend/           ← Frontend-specific docs
```

---

## 🎓 What's Ready to Use

✅ **Backend API** - Fully functional with:
- User authentication (login/register)
- Donation processing (Stripe)
- Invoice generation (PDF)
- Email delivery (dual recipients)
- Contact form
- Newsletter subscription

✅ **Frontend** - Complete website with:
- 15 HTML pages
- Responsive design
- Working forms
- Donation widget
- Navigation menu

✅ **Database** - MySQL with:
- 8 tables (users, donations, invoices, etc.)
- 3 views for reporting
- Proper indexes for performance
- Foreign key constraints

---

## 🔧 Common Tasks

### Adding a New HTML Page

1. **Create file:** `frontend/public/new-page.html`
2. **Copy structure** from existing page (e.g., about.html)
3. **Change content**
4. **Update navigation** - Add link in header
5. **Test:** Open in browser at `http://localhost:8000/new-page.html`

**Example:**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My New Page - BRDT</title>
    <link href="assets/css/style.css" rel="stylesheet" />
  </head>
  <body>
    <header><!-- Navigation here --></header>
    <main>
      <h1>My New Page</h1>
      <!-- Your content here -->
    </main>
    <footer><!-- Footer here --></footer>
  </body>
</html>
```

### Updating Styles

1. **Edit:** `frontend/public/assets/css/style.css`
2. **Reload:** Browser will show changes automatically
3. **Changes apply** to all pages

### Adding a New API Endpoint

1. **Create file:** `backend/src/api/resource.js`
2. **Define routes** (GET, POST, PUT, DELETE)
3. **Add model** in `backend/src/models/` if needed
4. **Create service** in `backend/src/services/` for logic
5. **Mount route** in `backend/server.js`
6. **Test:** Using curl or Postman

Example endpoint:
```javascript
// backend/src/api/example.js
import express from 'express';
const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    // Your code here
    res.json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
});

export default router;
```

### Deploying Frontend

Frontend is static files, deploy to:
- **Netlify** - Automatic from git
- **Vercel** - Automatic from git  
- **AWS S3** - Upload `frontend/public/` files
- **Any web server** - Serve `frontend/public/` folder

### Deploying Backend

Backend is Node.js API, deploy to:
- **Heroku** - Push to Heroku git
- **AWS EC2** - Run Node.js server
- **DigitalOcean** - Run Node.js server
- **Replit** - Host for free
- **Railway** - Easy deployment

See [DEPLOYMENT.md](docs/architecture/DEPLOYMENT.md) for detailed guides.

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **HTML Pages** | 15 |
| **API Endpoints** | 20+ |
| **Database Tables** | 8 |
| **Lines of CSS** | 3,400+ |
| **Lines of Documentation** | 3,700+ |
| **Team Size Supported** | Unlimited |
| **Production Ready** | Yes ✅ |

---

## 🔐 Security Notes

✅ **Already configured:**
- Password hashing (bcrypt)
- JWT authentication
- Input validation
- SQL injection protection
- CORS security
- Rate limiting
- Security headers

**To deploy securely:**
1. Change `JWT_SECRET` in `.env`
2. Use HTTPS in production
3. Configure CORS for your domain
4. Review [DEPLOYMENT.md](docs/architecture/DEPLOYMENT.md) security checklist

---

## 📞 Getting Help

| Problem | Solution |
|---------|----------|
| Can't find a file? | Check [ARCHITECTURE.md](ARCHITECTURE.md) |
| Setup issues? | Read [backend/SETUP.md](backend/SETUP.md) |
| How to code? | See [CONTRIBUTING.md](CONTRIBUTING.md) |
| Deploy questions? | Check [DEPLOYMENT.md](docs/architecture/DEPLOYMENT.md) |
| API not working? | See [backend/API.md](backend/API.md) |
| Want to help? | Read [CONTRIBUTING.md](CONTRIBUTING.md) |

---

## 🚀 Development Workflow

### Daily Development

```bash
# Start of day
npm run dev

# Frontend changes: Edit files in frontend/public/
# Backend changes: Edit files in backend/src/

# Test: Frontend at http://localhost:8000
# Test: Backend at http://localhost:5000/api

# Before committing
npm test  # (when tests added)
```

### Making a Change

1. **Create branch:** `git checkout -b feature/my-change`
2. **Make changes:** In frontend/ or backend/
3. **Test locally:** Run and verify works
4. **Commit:** `git commit -m "feat: description"`
5. **Push:** `git push origin feature/my-change`
6. **Pull request:** Create PR on GitHub
7. **Review:** Get approval
8. **Merge:** Merge to main

### Before Production

1. **Test everything** locally
2. **Read deployment guide** [DEPLOYMENT.md](docs/architecture/DEPLOYMENT.md)
3. **Follow security checklist**
4. **Setup environment variables**
5. **Deploy and test again**

---

## 🎯 Team Roles

### Frontend Developer
- Edit files in `frontend/public/`
- Update styles in `frontend/public/assets/css/style.css`
- Create new pages
- Work with HTML/CSS/JavaScript
- [Start with: frontend/README.md](frontend/README.md)

### Backend Developer
- Add API endpoints in `backend/src/api/`
- Create/update models in `backend/src/models/`
- Add services in `backend/src/services/`
- Manage database
- Configure external services
- [Start with: backend/README.md](backend/README.md)

### DevOps Engineer
- Configure deployment
- Setup databases
- Manage servers
- Monitor performance
- Handle security
- [Start with: DEPLOYMENT.md](docs/architecture/DEPLOYMENT.md)

### Project Manager
- Track progress
- Manage timeline
- Coordinate teams
- Review features
- [Start with: README.md](README.md)

---

## 📈 What's Next?

### Short Term (This Week)
- [ ] Review documentation
- [ ] Setup development environment
- [ ] Run locally
- [ ] Explore code

### Medium Term (This Month)
- [ ] Make first changes
- [ ] Deploy to staging
- [ ] Test features
- [ ] Get team up to speed

### Long Term (This Quarter)
- [ ] Add new features
- [ ] Optimize performance
- [ ] Improve documentation
- [ ] Scale infrastructure

---

## 💡 Pro Tips

1. **Use git branches** - Never work on main
2. **Write clear commits** - Describe what changed
3. **Test locally first** - Before pushing
4. **Read documentation** - Before coding
5. **Ask for help** - Use discussions/issues
6. **Keep `.env` safe** - Never commit it
7. **Update docs** - When code changes
8. **Run tests** - Before merging

---

## 🎓 Learning More

### Frontend
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Guidelines](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Backend
- [Express.js](https://expressjs.com/) - Web framework
- [MySQL](https://dev.mysql.com/doc/) - Database
- [Node.js](https://nodejs.org/docs/) - Runtime

### Tools
- [Git Documentation](https://git-scm.com/doc)
- [Stripe API](https://stripe.com/docs) - Payments
- [Nodemailer](https://nodemailer.com/) - Email

---

## ✅ Checklist to Get Started

- [ ] Read [README.md](README.md)
- [ ] Read [ARCHITECTURE.md](ARCHITECTURE.md)
- [ ] Read role-specific docs (frontend/backend/devops)
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Setup `.env`
- [ ] Setup database
- [ ] Run `npm run dev`
- [ ] Access http://localhost:8000
- [ ] Explore code structure
- [ ] Make first change
- [ ] Commit and push

---

## 🎉 You're Ready!

The project is organized, documented, and ready for development. 

**Pick your area:**
- **Frontend:** Edit HTML, CSS, JavaScript
- **Backend:** Add API endpoints, services
- **DevOps:** Deploy, configure, monitor
- **General:** Review and understand code

**Follow the guidelines:**
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to code

**Get help when needed:**
- [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - Find any doc

---

## 📞 Questions?

1. **Check documentation** - Most answers are there
2. **Search files** - Use grep or file search
3. **Read code comments** - Implementation details
4. **Ask in discussions** - Get help from team

---

**Welcome to the BRDT Charity Website development team!**  
**Happy coding! 🚀**

---

**Last Updated:** May 13, 2026  
**Status:** ✅ Ready for Development  
**Version:** 1.0.0 Production Ready
