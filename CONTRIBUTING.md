# Contributing to BRDT Charity Website

Thank you for your interest in contributing to the Belghar Rural Development Trust website! This document provides guidelines and instructions for contributing.

---

## 🤝 Ways to Contribute

- **Report bugs** - Create GitHub issues for bugs found
- **Suggest features** - Propose new features or improvements
- **Write documentation** - Improve or expand documentation
- **Fix bugs** - Submit pull requests for bug fixes
- **Add features** - Implement new functionality
- **Improve UI/UX** - Enhance design and user experience
- **Optimize performance** - Speed up the application

---

## 📋 Getting Started

### 1. Fork & Clone
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/BRDT-Charity-Website.git
cd "BRDT-Charity v1"
```

### 2. Create Feature Branch
```bash
# Create a branch for your feature
git checkout -b feature/your-feature-name
# Or for bugfixes
git checkout -b bugfix/issue-description
```

### 3. Setup Development Environment
```bash
# Install dependencies
npm install

# Setup .env
cp .env.example .env
# Edit with your local values

# Setup database
cd backend
mysql < src/config/schema.sql
cd ..

# Start development
npm run dev
```

---

## 💻 Development Guidelines

### Code Style

**JavaScript/Node.js:**
- Use ES6+ syntax
- Use meaningful variable names
- Keep functions small and focused
- Add comments for complex logic
- Use async/await over callbacks

Example:
```javascript
// ✅ Good
async function getUserDonations(userId) {
  try {
    const donations = await Donation.getUserDonations(userId);
    return donations;
  } catch (error) {
    throw new Error(`Failed to fetch donations: ${error.message}`);
  }
}

// ❌ Avoid
function getUserDonations(userId) {
  return db.query('SELECT * FROM donations WHERE user_id = ?', [userId], (err, results) => {
    if (err) return console.log(err);
    return results;
  });
}
```

**HTML/CSS:**
- Use semantic HTML5 elements
- Use BEM naming convention for CSS classes
- Keep CSS organized and commented
- Ensure mobile-first responsive design

```html
<!-- ✅ Good semantic HTML -->
<section class="donation-widget">
  <h2>Make a Donation</h2>
  <form aria-label="Donation form">
    <!-- form content -->
  </form>
</section>

<!-- ✅ BEM CSS naming -->
.donation-widget { }
.donation-widget__header { }
.donation-widget__body { }
.donation-widget--featured { }
```

### Commit Messages

Follow conventional commits:
```
type(scope): description

body (optional)
footer (optional)
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Tests
- `chore:` - Build, dependencies

**Examples:**
```
feat(donations): add monthly donation support
fix(auth): resolve JWT token expiration issue
docs(api): update endpoint documentation
refactor(models): improve query performance
```

### Testing Your Changes

**Before submitting PR:**
1. Test on multiple browsers (Chrome, Firefox, Safari, Edge)
2. Test on mobile devices
3. Verify all forms work correctly
4. Check API endpoints with curl/Postman
5. Run existing tests: `npm test`

---

## 🎨 Frontend Contributions

### Adding a New Page

1. **Create HTML file** in `frontend/public/`
2. **Use existing structure:**
   ```html
   <!doctype html>
   <html lang="en">
     <head>
       <meta charset="utf-8" />
       <meta content="width=device-width, initial-scale=1.0" name="viewport" />
       <title>Page Title - BRDT</title>
       <link href="assets/css/style.css" rel="stylesheet" />
       <!-- Include other necessary links -->
     </head>
     <body>
       <!-- Header included here -->
       <main>
         <!-- Page content -->
       </main>
       <!-- Footer included here -->
     </body>
   </html>
   ```

3. **Add CSS** to `frontend/public/assets/css/style.css` if needed
4. **Add images** to `frontend/public/assets/images/[category]/`
5. **Update navigation** - Add link to new page in header
6. **Test responsiveness** - Check on mobile, tablet, desktop

### Styling Guidelines

- Use CSS variables defined in `:root`
- Follow mobile-first approach
- Use semantic class names
- Optimize images before adding
- Test across browsers

```css
/* ✅ Good - Use variables */
.button {
  background-color: var(--primary-color);
  padding: var(--spacing-medium);
}

/* ❌ Avoid - Hard-coded values */
.button {
  background-color: #8c1d54;
  padding: 15px;
}
```

---

## 🔧 Backend Contributions

### Adding an API Endpoint

1. **Create route** in `backend/src/api/[resource].js`
   ```javascript
   import express from 'express';
   import { authenticate } from '../middleware/auth.js';
   import * as Model from '../models/Model.js';

   const router = express.Router();

   router.post('/', authenticate, async (req, res, next) => {
     try {
       const result = await Model.create(req.body);
       res.status(201).json({ status: 'success', data: result });
     } catch (error) {
       next(error);
     }
   });

   export default router;
   ```

2. **Add validation** in `backend/src/middleware/validation.js`
3. **Create model** in `backend/src/models/` if database interaction needed
4. **Test endpoint** with curl or Postman
5. **Document** in API reference

### Adding Database Migration

1. **Create migration script** in `backend/migrations/`
   ```sql
   -- migration-YYYYMMDD-description.sql
   ALTER TABLE users ADD COLUMN field_name VARCHAR(255);
   ```

2. **Update schema** in `backend/src/config/schema.sql`
3. **Test migration** locally
4. **Document** the change

---

## 📝 Documentation Contributions

### Documentation Structure

- **Architecture**: System design and decisions
- **API**: Endpoint reference and examples
- **Backend**: Setup, configuration, troubleshooting
- **Frontend**: Structure, styling, components
- **Contributing**: This file
- **README**: Project overview

### Writing Guidelines

- Use clear, concise language
- Include code examples where relevant
- Keep paragraphs short
- Use headings for organization
- Add table of contents for long docs
- Link to related documents

```markdown
# Feature Name

Brief introduction to the feature.

## How It Works

Explanation with examples.

## Usage

```code example
```

## Related Documentation

- [Related Doc](link)
```

---

## 🧪 Pull Request Process

### Before Submitting

1. **Update from main:**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

3. **Check code quality:**
   ```bash
   npm run lint
   ```

4. **Update documentation** if needed

### Creating Pull Request

1. **Push your branch:**
   ```bash
   git push origin feature/your-feature
   ```

2. **Create PR on GitHub** with:
   - Clear title describing the change
   - Description of what and why
   - Reference related issues (#123)
   - Screenshots/videos if UI changes
   - Test results

3. **PR Template:**
   ```markdown
   ## Description
   Brief description of changes.

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## How Has This Been Tested?
   Description of testing performed.

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Documentation updated
   - [ ] No breaking changes
   - [ ] Tested on multiple browsers
   - [ ] All tests passing
   ```

### Review Process

- Code will be reviewed for:
  - Code quality and style
  - Functionality correctness
  - Performance impact
  - Security considerations
  - Documentation completeness

- Address feedback promptly
- Request re-review when changes made

---

## 🚀 Release Process

Releases follow semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

---

## 📞 Communication

- **Issues**: Use GitHub Issues for bugs and features
- **Discussions**: Use GitHub Discussions for questions
- **Email**: contributions@brdt.org
- **Social**: @brdtrust on social media

---

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

## 🙏 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards others

### Enforcement

Violations of the code of conduct may result in removal from the project.

---

## ✅ Contribution Checklist

Before submitting your contribution:

- [ ] I have read the CONTRIBUTING guidelines
- [ ] I have followed the code style guidelines
- [ ] I have updated the documentation
- [ ] I have tested my changes locally
- [ ] My commits follow conventional commit format
- [ ] I have added necessary comments
- [ ] I have verified no breaking changes
- [ ] All tests pass
- [ ] My code follows DRY principles
- [ ] I have checked for security issues

---

## 🎓 Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/) - Web standards
- [Node.js Documentation](https://nodejs.org/docs/) - Node.js
- [Express.js Guide](https://expressjs.com/) - Express framework
- [MySQL Documentation](https://dev.mysql.com/doc/) - Database
- [Git Guide](https://git-scm.com/book) - Version control

---

## 📊 Contribution Stats

We track and celebrate contributions! Your help matters.

---

**Thank you for contributing to BRDT! 💚**

---

**Last Updated:** May 13, 2026  
**Version:** 1.0.0
