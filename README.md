# 🌿 Belghar Rural Development Trust — Official Website

[![Website](https://img.shields.io/badge/Status-Live-brightgreen)](https://github.com/akramrafid/BRDT-Website)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com)

> **Enriching Rural Communities Lives** — Belghar Rural Development Trust (BRDT) is a community-focused charity dedicated to sustainable development, education, healthcare and immediate relief for the rural communities of Belghar, Bangladesh.

---

## 📋 About the Project

A modern, full-stack charity website featuring:
- **Frontend:** Static HTML/CSS/JS with responsive design (15 pages, 3,400+ lines of CSS)
- **Backend:** Node.js/Express REST API with MySQL database
- **Features:** User authentication, Stripe payment processing, automatic PDF invoices, dual-recipient email delivery

The site showcases BRDT's humanitarian projects, appeal campaigns, Madrasah programme and Ramadan initiatives — providing donors with a seamless experience to learn about and contribute to BRDT's mission.

**Contact:** +44 7540 253384  
**Social:** [Facebook](https://www.facebook.com/share/1Cfr31FKAz/) | [Instagram](https://www.instagram.com/brdtrust/) | [LinkedIn](https://www.linkedin.com/in/belghar-rural-development-trust-7437a0409/) | [X (Twitter)](https://x.com/brdtbd) | [TikTok](https://www.tiktok.com/@brdtbd)

---

## 🗂️ Project Structure

```
BRDT-Charity v1/
│
├── frontend/                   # Frontend application
│   ├── public/                 # Static served files
│   │   ├── *.html             # 15 HTML pages
│   │   ├── logo.png           # Organization logo
│   │   └── assets/
│   │       ├── css/           # Stylesheets
│   │       └── images/        # Project images
│   ├── src/                   # JavaScript modules (future)
│   ├── package.json
│   └── README.md
│
├── backend/                    # Backend API
│   ├── src/
│   │   ├── api/               # Route handlers
│   │   ├── services/          # Business logic
│   │   ├── models/            # Database operations
│   │   ├── middleware/        # Express middleware
│   │   ├── config/            # Configuration
│   │   └── utils/             # Utilities
│   ├── uploads/               # Generated files (PDFs, etc)
│   ├── server.js              # Express entry point
│   ├── package.json
│   └── README.md
│
├── docs/                       # Project documentation
│   ├── architecture/           # Architecture decisions
│   ├── backend/               # Backend docs
│   └── frontend/              # Frontend docs
│
├── config/                     # Configuration files
├── ARCHITECTURE.md             # Complete architecture guide
├── package.json                # Root workspace config
└── .env.example               # Environment template
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed structure breakdown.

---

## ✨ Key Features

- **Responsive Design** — fully mobile-optimised across all screen sizes
- **100% Donation Policy** — prominently displayed across all pages
- **7 Individual Appeal Pages** — Zakat, Fitra, Sadaqah Jariyah, Flood, Sponsor a Hafiz, Back to School, Orphan Sponsorship — each with:
  - Donation widget (one-off & monthly toggle, quick-amount buttons)
  - Islamic content & hadith references
  - FAQ accordion
  - Impact statistics
- **15 Project Initiatives** — 8 detailed alternating-layout sections + 7 animated blog-style cards with scroll fade-in and expandable content
- **Madrasah Page** — dedicated page with gallery, video player and programme details
- **Ramadan Campaign** — seasonal giving page with countdown and appeals
- **Auth Pages** — magic link login + full registration with password strength indicator
- **Animated Navigation** — sticky header with Appeals dropdown menu
- **BRDT Brand System** — consistent use of dark blue, purple and light blue palette with Outfit font

---

## 🎨 Design System

| Token          | Value                   |
| -------------- | ----------------------- |
| Primary Purple | `#8c1d54`               |
| Dark Blue      | `#1d3b82`               |
| Light Blue     | `#29aee4`               |
| Font           | `Outfit` (Google Fonts) |
| Icons          | Font Awesome 6.4.0 Free |

---

## 🚀 Getting Started

No build step required — this is a pure HTML/CSS/JS static site.

```bash
# Clone the repository
git clone https://github.com/akramrafid/BRDT-Website.git

# Open in browser
open index.html
# or simply double-click index.html
```

For local development with live reload, use VS Code with the **Live Server** extension.

---

## 📦 Dependencies (CDN)

- [Google Fonts — Outfit](https://fonts.google.com/specimen/Outfit)
- [Font Awesome 6.4.0](https://fontawesome.com/)

No npm packages or build tools required.

---

## 📄 Licence

© 2026 Belghar Rural Development Trust. All Rights Reserved.  
Contact: +44 7540 253384
