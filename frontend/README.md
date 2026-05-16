# BRDT Charity Website - Frontend

Static HTML/CSS/JavaScript frontend for the BRDT Charity Website.

## 📁 Structure

```
frontend/
├── public/                     # Static served files
│   ├── *.html                 # All HTML pages (15 pages)
│   ├── logo.png               # Organization logo
│   │
│   └── assets/
│       ├── css/
│       │   └── style.css      # Main stylesheet (3400+ lines)
│       │
│       └── images/            # Project and banner images
│
├── src/                       # JavaScript modules (future use)
│   ├── js/modules/            # Feature modules
│   ├── js/utils/              # Utility functions
│   └── css/                   # CSS preprocessors (future)
│
├── package.json               # Frontend dependencies
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 📄 Pages

### Main Pages
- **index.html** - Homepage with quick donation widget
- **about.html** - About BRDT organization
- **projects.html** - Current projects (with images)
- **madrasah.html** - Madrasah education program
- **ramadan.html** - Ramadan special initiatives
- **contact.html** - Contact form
- **login.html** - User login
- **register.html** - User registration

### Appeal Pages (Donation Campaigns)
- **appeal-zakat.html** - Zakat campaign
- **appeal-fitra.html** - Fitra (Eid charity) campaign
- **appeal-sadaqah.html** - Sadaqah Jariyah (ongoing charity) campaign
- **appeal-flood.html** - Flood relief campaign
- **appeal-sponsor-hafiz.html** - Sponsor a Hafiz (Quran student) campaign
- **appeal-back-to-school.html** - Back to school support campaign
- **appeal-orphan.html** - Orphan sponsorship campaign

## 🎨 Styling

**Main Stylesheet:** `assets/css/style.css`

### Key Features
- Custom CSS properties for theming
- Responsive design (mobile-first)
- Donation widget styling
- Form validation styles
- Animation effects
- BRDT brand colors:
  - Primary Purple: `#8c1d54`
  - Secondary colors for appeals

### Typography
- Font: Google Fonts "Outfit" (300, 400, 500, 600, 700)
- Icons: Font Awesome 6.4.0

## 🖼️ Assets

### Images Location
`assets/images/`

Images are organized by project/category:
- Project screenshots
- Team photos (if applicable)
- Campaign banners
- Icon graphics

## 🔗 Navigation Structure

**Main Navigation Menu:**
- Projects
- Madrasah
- Ramadan
- Appeals (dropdown)
  - Zakat
  - Fitra
  - Sadaqah Jariyah
  - Flood Relief
  - Sponsor a Hafiz
  - Back to School
  - Orphan Sponsorship
- About Us
- Contact Us

**Header Actions:**
- Login/Register link
- Donate Now button

**Footer:**
- Social media links
- Additional pages
- Copyright info

## 💡 Features

### Donation Widget
- Quick donation amounts (৳20, ৳50, ৳100, ৳250)
- One-off or monthly donation selection
- Custom amount input
- Fund selection dropdown
- Integration with backend API

### Forms
- Contact form with validation
- Login form
- Registration form
- All forms POST to backend API

### Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop views
- Touch-friendly buttons
- Flexible navigation

## 🔌 Backend Integration

All forms and donation requests integrate with the backend API at `http://localhost:5000/api`

### API Endpoints Used
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/donations/create` - Create donation intent
- `POST /api/donations/process` - Process payment
- `POST /api/contact` - Submit contact form

See [Backend API Documentation](../../docs/architecture/API-ENDPOINTS.md) for full details.

## 📱 Responsive Breakpoints

The CSS uses these breakpoints:
- Mobile: 320px - 767px
- Tablet: 768px - 1024px
- Desktop: 1025px+

## 🚀 Deployment

### Local Development
```bash
# Serve static files
python -m http.server 8000
# or
http-server -p 8000
```

Then open `http://localhost:8000`

### Production
- Serve files through a web server (nginx, Apache)
- Or use a Node.js server with express.static()
- Ensure backend API is accessible from frontend domain

### Environment-Specific Configuration
Update API URLs in HTML files or use JavaScript to set them:

```html
<!-- In HTML -->
<script>
  const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : 'https://api.brdt.org/api';
</script>
```

## 🔐 Security Notes

- All forms submit to backend API (not processed client-side)
- No sensitive data stored in HTML/CSS/JS
- API keys and tokens handled by backend
- HTTPS required for production
- CORS configured on backend

## 📝 Adding New Pages

1. Create new HTML file in `public/`
2. Use same header/footer structure as existing pages
3. Link CSS: `<link href="assets/css/style.css" rel="stylesheet">`
4. Reference images: `<img src="assets/images/..." alt="...">`
5. Update navigation to include new page
6. Test in browser at different screen sizes

## 🎯 Performance Notes

- CSS: Single file (3400+ lines, minified recommended for production)
- Images: Optimize with tools like TinyPNG before adding
- JavaScript: Vanilla JS (no framework overhead)
- Load time: < 2s target for homepage

## 🔄 Updates and Maintenance

### Updating Styles
Edit `assets/css/style.css` - changes apply to all pages

### Changing Logo
Replace `public/logo.png` with new logo (recommended: 300x100px)

### Adding Images
1. Optimize image (compress, resize)
2. Add to `assets/images/[category]/`
3. Reference in HTML: `src="assets/images/[category]/[filename]"`

### Updating Navigation
Edit header section in each HTML file or create shared header template

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

See [Contributing Guidelines](../../CONTRIBUTING.md)

## 📄 Related Documentation

- [Project Architecture](../../ARCHITECTURE.md)
- [Backend Documentation](../../backend/README.md)
- [API Reference](../../docs/architecture/API-ENDPOINTS.md)
- [Styling Guide](../../docs/frontend/STYLING.md)

---

**Last Updated:** May 13, 2026  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
