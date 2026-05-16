# Application & Requirement Listing
## BRDT Charity Website v1.0

**Document Version:** 1.0  
**Last Updated:** May 13, 2026  
**Author:** Senior Software & Database Engineer  
**Organization:** Belghar Rural Development Trust (BRDT)  
**Website Status:** Live

---

## 🎯 Executive Summary

BRDT Website is a modern, fully responsive static web application designed to serve as the official digital presence for Belghar Rural Development Trust — a Bangladesh-based charity organization. The application facilitates donor engagement, project showcase, multi-channel fundraising appeals, and user authentication for donation tracking and management. Built with pure HTML5, CSS3, and JavaScript (no build step required), this single-page application provides seamless user experience across all devices.

**Key Statistics:**
- 18 unique web pages
- 7 dedicated appeal campaigns
- 15+ humanitarian projects
- 3,400+ lines of CSS
- 100% donation policy guarantee
- Real-time responsive design

---

## 📋 Project Overview

### Organization Profile
- **Organization Name:** Belghar Rural Development Trust (BRDT)
- **Mission:** Enriching Rural Communities Lives — Sustainable development, education, healthcare, and immediate relief for rural communities in Belghar, Bangladesh
- **Tagline:** "Hope for the hopeless. Help for the helpless."
- **Contact Phone:** +44 7540 253384
- **Countries Served:** Bangladesh (Primary), International (Diaspora)
- **Type:** Registered Charity / NGO

### Application Purpose
The website serves as the primary digital touchpoint for:
1. **Donor Engagement:** Connect with potential donors globally
2. **Information Dissemination:** Educate public about projects and initiatives
3. **Fundraising:** Multi-channel donation collection with appeal-specific campaigns
4. **Donor Management:** Authentication and donation history tracking
5. **Community Building:** Social media integration and newsletter subscription
6. **Transparency:** 100% donation policy display across all pages

### Target Users
1. **Primary Donors:** International donors from diaspora communities
2. **Casual Visitors:** General public researching BRDT initiatives
3. **Repeat Donors:** Authenticated users managing recurring contributions
4. **Madrasah Stakeholders:** Students, parents, and alumni
5. **Project Sponsors:** Corporate entities and institutional donors
6. **Volunteers:** Community members seeking engagement opportunities

---

## 🏗️ Application Architecture

### Technology Stack
| Layer | Technology | Details |
|-------|-----------|---------|
| **Frontend** | HTML5 | Semantic markup, accessibility support |
| **Styling** | CSS3 | 3,400+ lines, responsive design, CSS variables, animations |
| **Scripting** | Vanilla JavaScript | No frameworks, lightweight, CDN-based |
| **Typography** | Google Fonts - Outfit | 6 font weights (300, 400, 500, 600, 700) |
| **Icons** | Font Awesome 6.4.0 | Free tier, 900+ icons |
| **Deployment** | Static Site | GitHub Pages compatible |
| **Version Control** | Git/GitHub | Repository: akramrafid/BRDT-Website |
| **Browser Support** | Modern Browsers | Chrome, Firefox, Safari, Edge (latest versions) |

### Design System

#### Color Palette
| Token | Hex Value | Usage | RGB |
|-------|-----------|-------|-----|
| Primary Purple | `#8c1d54` | Call-to-action buttons, primary elements | 140, 29, 84 |
| Dark Blue | `#1d3b82` | Headers, navigation, secondary elements | 29, 59, 130 |
| Light Blue | `#29aee4` | Accent elements, highlights, hover states | 41, 174, 228 |
| Text Dark | `#1e293b` | Body text, primary content | 30, 41, 59 |
| Text Light | `#ffffff` | Light backgrounds, white text | 255, 255, 255 |
| Background Light | `#f8fafc` | Page backgrounds, card backgrounds | 248, 250, 252 |
| Border Color | `#e2e8f0` | Dividers, borders | 226, 232, 240 |
| Dark Slate | `#1e293b` | Top bar background, dark sections | 30, 41, 59 |

#### Typography Scale
- **Primary Font:** Outfit (Google Fonts)
- **Font Weights Used:** 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Base Font Size:** 16px
- **Line Height:** 1.6x

#### Responsive Breakpoints
| Breakpoint | Min Width | Device Type | Layout |
|-----------|-----------|------------|--------|
| Mobile | < 768px | Phones, small tablets | Single column, stacked |
| Tablet | 768px - 1024px | Tablets, large phones | 2-column, flexible |
| Desktop | > 1024px | Desktops, large monitors | Full responsive grid |

---

## 📑 Page Structure & Inventory

### Core Pages (9)

#### 1. **Homepage (index.html)**
**Purpose:** Primary landing page and brand introduction  
**Key Sections:**
- Top bar with donation policy and contact info
- Main header with logo and sticky navigation
- Hero section with value proposition
- Quick donation widget (one-off/monthly toggle)
- Featured projects carousel/grid
- Testimonials section
- Call-to-action sections
- Footer with links and newsletter signup

**Features:**
- Animated donation widget with amount buttons (৳20, ৳50, ৳100, ৳500, custom)
- Responsive hero image
- Project overview cards with expandable content
- Newsletter subscription form
- Quick donation buttons throughout

**Functional Requirements:**
- Display organization overview
- Enable quick donations from homepage
- Showcase top 3-5 projects
- Responsive across all devices
- Social media links integration
- Newsletter subscription endpoint (mock)

---

#### 2. **About Us (about.html)**
**Purpose:** Build organizational credibility and transparency  
**Key Sections:**
- Mission statement
- Vision and core values
- Team members with bios and photos
- Organization history/timeline
- Impact statistics
- 100% donation policy explanation
- Certifications/accreditations (if applicable)

**Functional Requirements:**
- Display organization's mission, vision, values
- Build donor trust through transparency
- Showcase team leadership
- Display impact metrics
- Link to social media profiles
- Provide additional donation CTAs

---

#### 3. **Projects (projects.html)**
**Purpose:** Comprehensive showcase of all humanitarian initiatives  
**Key Sections:**
- 15 project initiatives in alternating layouts
- 8 detailed sections with images, descriptions, and impact stories
- 7 animated blog-style cards with scroll fade-in effect
- Project status indicators
- Donation targets and progress
- Beneficiary statistics

**Project Categories:**
1. Education initiatives
2. Healthcare programs
3. Emergency relief
4. Infrastructure development
5. Community development
6. Livelihood programs
7. Child welfare
8. Other humanitarian work

**Functional Requirements:**
- Display all active projects
- Show project-specific donation options
- Provide expandable project details
- Display impact metrics per project
- Animate content on scroll
- Enable project-specific donations

---

#### 4. **Madrasah (madrasah.html)**
**Purpose:** Dedicated page for religious education institution  
**Key Sections:**
- Institution profile and history
- Programs offered
- Student testimonials
- Gallery with photos/images
- Video player for institution tours/events
- Faculty/staff information
- Admission information
- Sponsorship opportunities

**Features:**
- Embedded video player for institution tours
- Image gallery with lightbox
- Student success stories
- Orphanage program details
- Scholarship opportunities display

**Functional Requirements:**
- Display institution details
- Show program curriculum
- Enable video content consumption
- Showcase student achievements
- Display sponsorship options
- Provide contact/inquiry forms

---

#### 5. **Ramadan Campaign (ramadan.html)**
**Purpose:** Seasonal fundraising campaign page  
**Key Sections:**
- Ramadan countdown timer
- Islamic content and hadith references
- Special appeal messaging
- Fasting day challenges
- Zakat calculation guide
- Daily charity prompts
- Ramadan-specific donation campaigns
- Community activities calendar

**Functional Requirements:**
- Display countdown timer
- Show seasonal campaigns
- Enable Ramadan-specific donations
- Provide Islamic educational content
- Display daily charitable acts
- Link to appeal pages

---

#### 6. **Contact Us (contact.html)**
**Purpose:** Multi-channel communication and support  
**Key Sections:**
- Contact form (name, email, message)
- FAQ accordion
- Social media links
- Direct contact information
- Map/location information (if office-based)
- Newsletter subscription form
- Response expectations

**Functional Requirements:**
- Collect inquiries via form (contact form handling - mock)
- Display comprehensive FAQ
- Show multiple contact methods
- Enable newsletter signup
- Validate form inputs
- Display response time expectations

---

#### 7. **Login (login.html)**
**Purpose:** Donor authentication and account access  
**Key Sections:**
- Magic link login option (email-based)
- Password login option
- Remember me functionality
- Forgot password option (via OTP)
- Registration link
- Security/privacy information

**Features:**
- Two-step authentication (email → password)
- Magic link verification
- Session management
- Password reset flow via OTP
- User account protection

**Functional Requirements:**
- Email verification via magic link
- Password-based authentication
- Session persistence
- Secure password storage (backend)
- Account recovery mechanism
- Remember device functionality

---

#### 8. **Register (register.html)**
**Purpose:** New donor account creation  
**Key Sections:**
- Email registration form
- Password creation with strength indicator
- Name and profile information
- Address/location fields
- Terms and privacy policy acceptance
- Email verification step
- Success confirmation

**Features:**
- Real-time password strength meter
- Email confirmation requirement
- Input validation
- Security guidelines display
- Terms acceptance checkbox

**Functional Requirements:**
- Collect user registration data
- Validate email uniqueness
- Enforce password strength requirements
- Send verification email (mock)
- Display terms/privacy policy
- Create user account in backend

---

#### 9. **Appeals - General (appeal-*.html structure)**
**Template-based Pages:** 7 dedicated appeal campaign pages

---

### Appeal Campaign Pages (7)

All appeal pages share a consistent template structure with campaign-specific content.

#### Appeal Page Template Structure
**Common Elements:**
1. Top bar with donation policy
2. Main navigation with appeals dropdown
3. Page-specific hero section
4. Donation widget (one-off/monthly, quick amounts)
5. Campaign description and Islamic references
6. FAQ accordion
7. Impact statistics and testimonials
8. Related appeal links
9. Newsletter signup
10. Footer with links

#### 1. **Zakat Appeal (appeal-zakat.html)**
- Islamic obligation explanation
- Zakat calculation tool
- Eligible beneficiary categories
- Tax receipt information
- Recurring donation options

#### 2. **Fitra Appeal (appeal-fitra.html)**
- Zakat al-Fitr explanation
- Amount per person guidance
- Ramadan connection messaging
- Quick donation amounts
- Distribution timeline

#### 3. **Sadaqah Jariyah (appeal-sadaqah.html)**
- Perpetual charity concept
- Long-term project examples
- Donation project options
- Legacy giving information
- Islamic references and hadith

#### 4. **Flood Relief (appeal-flood.html)**
- Emergency appeal urgency messaging
- Disaster relief needs
- Immediate impact statistics
- Donation urgency indicators
- Response timeline

#### 5. **Sponsor a Hafiz (appeal-sponsor-hafiz.html)**
- Student profiles
- Education journey details
- Monthly sponsorship structure
- Progress tracking options
- Communication channels with sponsor

#### 6. **Back to School (appeal-back-to-school.html)**
- School supplies list
- Uniform/equipment needs
- Scholarship program details
- Student stories
- Impact per donation tier

#### 7. **Orphan Sponsorship (appeal-orphan.html)**
- Orphan welfare program
- Monthly sponsorship details
- Child profile sharing
- Education and healthcare coverage
- Annual progress reports

---

## 🎨 Design Features & UI Components

### Navigation System
**Header Components:**
- **Logo Section:** Organization logo and name
- **Primary Navigation:** Projects, Madrasah, Ramadan, Appeals (dropdown), About Us, Contact Us
- **User Actions:** Login/Register link, "Donate Now" CTA button
- **Appeals Dropdown:** 7 quick-access appeal links with icons
- **Sticky Navigation:** Header remains visible on scroll
- **Responsive Toggle:** Mobile hamburger menu (implied by design system)

### Donation Widget Component
**Features:**
- Toggle between "One-Off" and "Monthly" donation types
- Quick amount buttons: ৳20, ৳50, ৳100, ৳500, Custom
- Donation type indicator
- Call-to-action buttons
- Responsive placement (hero section, sidebar)
- Currency symbol: Bengali Taka (৳)

### FAQ Accordion Component
**Features:**
- Expandable/collapsible questions
- Smooth animations
- Icon indicators (chevron up/down)
- Multiple FAQs per page
- Campaign-specific content

### Form Components
**Standard Forms:**
- Contact form (name, email, message)
- Newsletter subscription form
- Login form (email, password)
- Registration form (email, name, password, address)
- Authentication forms

**Form Features:**
- Input validation
- Error message display
- Success confirmation
- Required field indicators
- Placeholder text guidance
- Password strength indicators (registration)

### Social Media Integration
**Embedded Links:**
- Facebook: https://www.facebook.com/share/1Cfr31FKAz/
- Instagram: https://www.instagram.com/brdtrust/
- Twitter/X: https://x.com/brdtbd
- LinkedIn: https://www.linkedin.com/in/belghar-rural-development-trust-7437a0409/
- TikTok: https://www.tiktok.com/@brdtbd

**Implementation:** Font Awesome icons with external links in header and footer

---

## 🔧 Functional Requirements

### F1 - Donation Processing
**Requirement:** Enable donors to make one-off and recurring donations  
**Details:**
- Support multiple donation amounts
- Toggle between one-off and monthly options
- Integrate with payment gateway (Stripe, PayPal - backend)
- Donation invoice generation and automated dual-email system (sends invoice to donor and notification to admin)
- Donor record creation/update

**Acceptance Criteria:**
- ✅ Donation widget visible on multiple pages
- ✅ Amount selection functional
- ✅ Donation type toggle works
- ✅ Custom amount input supported
- ✅ Proper validation of amounts

---

### F2 - User Authentication
**Requirement:** Allow donors to create accounts and log in  
**Details:**
- Email-based registration with verification
- Password creation with strength requirements
- Magic link login option
- Session management
- Password reset functionality via OTP (One-Time Password) sent to user's email
- Account security measures

**Acceptance Criteria:**
- ✅ Registration form validation
- ✅ Email verification process
- ✅ Password strength meter functional
- ✅ Login form accepts credentials
- ✅ Magic link verification works
- ✅ Session persistence across pages
- ✅ Remember device option available

---

### F3 - Appeal Campaign Management
**Requirement:** Display 7 distinct appeal campaigns with campaign-specific content  
**Details:**
- Each appeal has dedicated page with unique content
- Consistent template across all appeals
- Appeal-specific donation options
- Campaign-specific FAQ sections
- Impact statistics display
- Related appeals linking

**Acceptance Criteria:**
- ✅ All 7 appeals pages accessible
- ✅ Campaign content loads correctly
- ✅ FAQ sections functional
- ✅ Donation tracking by appeal type
- ✅ Related links display correctly

---

### F4 - Project Showcase
**Requirement:** Display and describe 15+ humanitarian projects  
**Details:**
- Grid/list view of all projects
- Detailed project pages with stories
- Project-specific donation options
- Impact metrics display
- Beneficiary information
- Project status indicators

**Acceptance Criteria:**
- ✅ All 15 projects visible on Projects page
- ✅ Project details load correctly
- ✅ Images display properly
- ✅ Donation metrics visible
- ✅ Project search/filter (if implemented)

---

### F5 - Newsletter Subscription
**Requirement:** Capture donor emails for communications  
**Details:**
- Newsletter signup forms on multiple pages
- Email validation
- Subscription confirmation
- Centralized collection and storage of all subscriber emails in the database
- Preference management (future)
- GDPR compliance

**Acceptance Criteria:**
- ✅ Forms accept valid emails
- ✅ Duplicate subscriptions handled
- ✅ Confirmation message displayed
- ✅ Email stored securely (backend)

---

### F6 - Contact Form
**Requirement:** Enable general inquiries and support requests  
**Details:**
- Form collects: name, email, subject, message
- Input validation
- Auto-response email (backend)
- Admin notification (backend)
- Message storage for follow-up

**Acceptance Criteria:**
- ✅ Form validation works
- ✅ Required fields marked
- ✅ Error messages display
- ✅ Success confirmation shown
- ✅ Submission saved (backend)

---

### F7 - Social Media Integration
**Requirement:** Display and link to social media profiles  
**Details:**
- Icons in header and footer
- External links to verified profiles
- Social sharing capabilities (future)
- Feed integration (future)

**Acceptance Criteria:**
- ✅ All social icons display
- ✅ Links open correct profiles
- ✅ Icons styled consistently
- ✅ Mobile links functional

---

### F8 - Responsive Design
**Requirement:** Provide seamless experience across all devices  
**Details:**
- Mobile-first design approach
- Flexible layouts for all screen sizes
- Touch-friendly interactive elements
- Readable text at all sizes
- Optimized images for different resolutions

**Acceptance Criteria:**
- ✅ Desktop view (1024px+) displays correctly
- ✅ Tablet view (768px-1024px) responsive
- ✅ Mobile view (<768px) optimized
- ✅ Touch targets minimum 44x44px
- ✅ Text readable at all sizes
- ✅ No horizontal scrolling on mobile

---

### F9 - Content Management
**Requirement:** Display dynamic content across pages  
**Details:**
- Hero sections with images and text
- Project cards with descriptions
- Team member profiles
- Testimonials and impact stories
- FAQs and content blocks

**Acceptance Criteria:**
- ✅ Content displays correctly
- ✅ Images load properly
- ✅ Text formatting preserved
- ✅ Links work correctly
- ✅ Content updates reflected

---

### F10 - Page Navigation
**Requirement:** Enable intuitive navigation throughout the site  
**Details:**
- Persistent header navigation
- Dropdown menu for appeals
- Footer navigation links
- Breadcrumb navigation (if applicable)
- Internal linking between related pages
- Back-to-top buttons (if applicable)

**Acceptance Criteria:**
- ✅ All navigation links functional
- ✅ Dropdown menu opens/closes smoothly
- ✅ Active page highlighted
- ✅ No broken links
- ✅ Mobile menu accessible

---

## ⚙️ Non-Functional Requirements

### NFR1 - Performance
**Requirement:** Ensure fast page load and responsiveness  
**Specifications:**
- Page load time: < 3 seconds (desktop), < 4 seconds (mobile)
- Time to Interactive (TTI): < 2 seconds
- Largest Contentful Paint (LCP): < 2.5 seconds
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

**Implementation:**
- Optimize image sizes and formats (WebP, AVIF)
- Minify CSS and JavaScript
- Lazy load images below fold
- Use CSS Grid/Flexbox for efficient layouts
- Cache static assets
- CDN for fonts and icons

---

### NFR2 - Accessibility
**Requirement:** Ensure accessibility for all users  
**Specifications:**
- WCAG 2.1 Level AA compliance
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratio: 4.5:1 for text, 3:1 for UI components
- Alt text for all images
- Readable font sizes (minimum 14px body text)

**Implementation:**
- Use semantic HTML5 elements
- Implement proper heading hierarchy
- Add ARIA attributes where necessary
- Ensure color is not the only indicator
- Provide keyboard-only navigation
- Test with screen readers

---

### NFR3 - Security
**Requirement:** Protect user data and prevent attacks  
**Specifications:**
- HTTPS/TLS encryption (backend)
- XSS prevention
- CSRF token protection (forms)
- SQL injection prevention (backend)
- Secure password storage (bcrypt/Argon2 - backend)
- No sensitive data in frontend code

**Implementation:**
- Use Content Security Policy (CSP)
- Sanitize user inputs
- Implement CSRF tokens
- Use secure cookies (HttpOnly, Secure, SameSite)
- Regular security audits
- Keep dependencies updated

---

### NFR4 - Browser Compatibility
**Requirement:** Support modern browsers  
**Specifications:**
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- No IE 11 support (modern web standard)

**Implementation:**
- Use modern CSS (Grid, Flexbox, Custom Properties)
- Progressive enhancement for advanced features
- Polyfills for critical features only
- Regular cross-browser testing

---

### NFR5 - Scalability
**Requirement:** Handle growth in traffic and content  
**Specifications:**
- Support 10,000+ concurrent visitors
- Add/remove pages without architecture changes
- Support multiple language versions (future)
- CDN distribution ready

**Implementation:**
- Use static site hosting (GitHub Pages, Netlify, Vercel)
- Efficient CSS architecture (BEM or similar)
- Modular JavaScript components
- Reusable template patterns

---

### NFR6 - Maintainability
**Requirement:** Enable easy maintenance and updates  
**Specifications:**
- Clear code structure and naming conventions
- CSS organization (variables, sections)
- JavaScript commenting
- Documentation of patterns
- Version control discipline

**Implementation:**
- CSS variables for theming
- Consistent naming conventions (BEM)
- Component-based design
- Git commit messages
- README documentation

---

### NFR7 - SEO & Discoverability
**Requirement:** Optimize for search engines  
**Specifications:**
- Meta titles and descriptions on all pages
- Semantic HTML structure
- Schema markup for organization
- Sitemap (XML)
- Robots.txt configuration
- Mobile-friendly design

**Implementation:**
- Proper heading structure (H1, H2, H3)
- Descriptive alt text for images
- Open Graph meta tags
- Canonical URLs
- Internal linking strategy

---

### NFR8 - Data Privacy
**Requirement:** Comply with data protection regulations  
**Specifications:**
- GDPR compliance (EU users)
- Privacy policy page
- Cookie consent (if applicable)
- Data retention policies
- Right to be forgotten (user deletion)
- Transparent data usage

**Implementation:**
- Privacy policy display
- Cookie banner (if tracking)
- Email opt-out mechanism
- Data storage encryption
- Regular privacy audits

---

## 🗄️ Database Requirements (Conceptual)

**Note:** Current implementation is static frontend. Backend database required for:

### Users Table
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| user_id | UUID | PRIMARY KEY | Unique identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User login identifier |
| password_hash | VARCHAR(255) | NOT NULL | Bcrypt/Argon2 hash |
| full_name | VARCHAR(255) | NOT NULL | User's full name |
| phone | VARCHAR(20) | NULLABLE | Contact phone |
| address | TEXT | NULLABLE | Physical address |
| country | VARCHAR(100) | NULLABLE | Country of residence |
| date_joined | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation date |
| last_login | TIMESTAMP | NULLABLE | Last successful login |
| is_active | BOOLEAN | DEFAULT TRUE | Account status |
| email_verified | BOOLEAN | DEFAULT FALSE | Email verification status |
| newsletter_subscribed | BOOLEAN | DEFAULT TRUE | Newsletter opt-in |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update |

### Donations Table
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| donation_id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY | Reference to users |
| amount | DECIMAL(10,2) | NOT NULL | Donation amount |
| currency | VARCHAR(3) | DEFAULT 'BDT' | Currency code |
| donation_type | ENUM | NOT NULL | 'one-off', 'monthly', 'annual' |
| appeal_type | VARCHAR(50) | NOT NULL | Appeal category |
| payment_method | VARCHAR(50) | NULLABLE | Payment processor |
| payment_status | ENUM | NOT NULL | 'pending', 'completed', 'failed' |
| transaction_id | VARCHAR(255) | NULLABLE | Payment processor ID |
| receipt_sent | BOOLEAN | DEFAULT FALSE | Receipt email sent |
| date_donated | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Donation date |
| next_payment_date | DATE | NULLABLE | For recurring donations |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update |

### Contact Submissions Table
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| submission_id | UUID | PRIMARY KEY | Unique identifier |
| name | VARCHAR(255) | NOT NULL | Visitor name |
| email | VARCHAR(255) | NOT NULL | Visitor email |
| subject | VARCHAR(255) | NOT NULL | Message subject |
| message | TEXT | NOT NULL | Message content |
| is_read | BOOLEAN | DEFAULT FALSE | Admin read status |
| is_resolved | BOOLEAN | DEFAULT FALSE | Support ticket status |
| response | TEXT | NULLABLE | Admin response |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Submission date |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update |

### Newsletter Subscriptions Table
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| subscription_id | UUID | PRIMARY KEY | Unique identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Subscriber email |
| is_active | BOOLEAN | DEFAULT TRUE | Subscription status |
| source_page | VARCHAR(100) | NULLABLE | Page subscribed from |
| subscription_date | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Subscription date |
| unsubscribe_token | VARCHAR(255) | UNIQUE | One-click unsubscribe link |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update |

### Email Logs Table
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| log_id | UUID | PRIMARY KEY | Unique identifier |
| email_address | VARCHAR(255) | NOT NULL | Recipient email |
| email_type | ENUM | NOT NULL | 'verification', 'receipt', 'newsletter' |
| subject | VARCHAR(255) | NOT NULL | Email subject |
| status | ENUM | NOT NULL | 'sent', 'bounced', 'opened' |
| sent_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Send timestamp |

### Key Indexes
```sql
-- Users table
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_created_at ON users(created_at);
CREATE INDEX idx_is_active ON users(is_active);

-- Donations table
CREATE INDEX idx_user_id ON donations(user_id);
CREATE INDEX idx_appeal_type ON donations(appeal_type);
CREATE INDEX idx_payment_status ON donations(payment_status);
CREATE INDEX idx_date_donated ON donations(date_donated);
CREATE INDEX idx_next_payment_date ON donations(next_payment_date) WHERE donation_type IN ('monthly', 'annual');

-- Contact Submissions
CREATE INDEX idx_email ON contact_submissions(email);
CREATE INDEX idx_is_resolved ON contact_submissions(is_resolved);
CREATE INDEX idx_created_at ON contact_submissions(created_at);

-- Newsletter Subscriptions
CREATE INDEX idx_email ON newsletter_subscriptions(email);
CREATE INDEX idx_is_active ON newsletter_subscriptions(is_active);
```

---

## 🔐 Security Requirements

### Authentication & Authorization
- **Magic Link Login:** Email-based login without password for first access
- **Password Policy:** Minimum 8 characters, uppercase, lowercase, number, special character
- **Session Management:** Secure tokens, 30-minute inactivity timeout, HttpOnly cookies
- **Password Reset:** OTP (One-Time Password) sent to user's registered email for secure password recovery
- **Multi-factor Authentication:** Optional for future implementation

### Data Protection
- **HTTPS/TLS:** All data encrypted in transit
- **Password Hashing:** bcrypt or Argon2 with random salt
- **PCI-DSS Compliance:** If storing payment information (outsource to Stripe/PayPal)
- **Data Encryption:** Encryption at rest for sensitive data
- **GDPR Compliance:** Data retention policies, user deletion, consent tracking

### Input Validation
- **Client-side:** HTML5 validation, JavaScript checks
- **Server-side:** All inputs validated, sanitized, and escaped
- **XSS Prevention:** Content Security Policy, HTML escaping
- **SQL Injection Prevention:** Parameterized queries, ORM usage

### Common Security Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 📱 Device & Browser Support

### Mobile Devices
| Device Type | Screen Size | Support | Notes |
|------------|-----------|---------|-------|
| iPhone 12/13/14 | 390px | ✅ Full | Latest iOS browsers |
| iPhone SE | 375px | ✅ Full | iOS 11+ |
| Samsung Galaxy | 412px | ✅ Full | Android 8+ |
| Tablets (iPad) | 768px+ | ✅ Full | Full tablet experience |
| Foldable Devices | Variable | ✅ Partial | Responsive design handles |

### Desktop Browsers
| Browser | Min Version | Support | Market Share |
|---------|-----------|---------|--------------|
| Chrome | 90+ | ✅ Full | 65% |
| Safari | 14+ | ✅ Full | 20% |
| Firefox | 88+ | ✅ Full | 10% |
| Edge | 90+ | ✅ Full | 4% |
| IE 11 | Any | ❌ Not Supported | <1% |

---

## 🎯 User Stories & Features Matrix

### Admin Features (Future)
- [ ] Dashboard with donation analytics
- [ ] User management interface
- [ ] Content management system
- [ ] Email campaign manager
- [ ] Donation report generator
- [ ] Project progress tracker

### Donor Features (Current/Planned)
- [x] Browse all appeal campaigns
- [x] View project details
- [x] Make one-off donations
- [x] Register account (future implementation)
- [ ] Create recurring donations
- [ ] Download donation receipts
- [ ] View donation history
- [ ] Update profile information
- [ ] Manage communication preferences
- [ ] Generate tax receipts
- [ ] Track project impact
- [ ] Sponsor individual beneficiaries

### Visitor Features (Current)
- [x] View homepage
- [x] Browse all projects
- [x] Read about organization
- [x] Access appeal pages
- [x] View madrasah information
- [x] Contact organization
- [x] Subscribe to newsletter
- [x] Follow social media
- [x] Access Ramadan campaign
- [ ] Share content on social media

---

## 📊 Donation Flow & Integration Points

### Donation Workflow
```
1. User visits website
   ↓
2. Clicks "Donate Now" or appeal amount button
   ↓
3. (Optional) Creates/Logs into account
   ↓
4. Selects donation type (one-off/monthly)
   ↓
5. Selects appeal/project (optional)
   ↓
6. Enters/confirms amount
   ↓
7. Selects payment method (Stripe, PayPal, etc.)
   ↓
8. Processes payment (external gateway)
   ↓
9. Records donation in database
   ↓
10. Sends invoice email to donor AND notification to admin/website email
   ↓
11. Displays thank you message
```

### Payment Integration Points
- **Stripe Integration:** Credit/debit card processing
- **PayPal Integration:** PayPal account payments
- **Bank Transfer:** Manual donation processing (future)
- **Mobile Wallets:** Apple Pay, Google Pay support
- **Recurring Billing:** Monthly/annual subscription setup

---

## 🚀 Future Enhancement Roadmap

### Phase 2 (Next 3-6 months)
- [ ] Backend API development (Node.js/Python/PHP)
- [ ] Database implementation (PostgreSQL)
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] User authentication system
- [ ] Email notification system
- [ ] Admin dashboard
- [ ] Donation analytics
- [ ] Multi-language support (Arabic, Bengali)

### Phase 3 (6-12 months)
- [ ] Mobile app (iOS/Android)
- [ ] Advanced donor management
- [ ] Corporate sponsorship program
- [ ] Volunteer management system
- [ ] Online store for merchandise
- [ ] Blog/news section
- [ ] Live chat support
- [ ] Video streaming platform

### Phase 4 (12+ months)
- [ ] AI-powered donation recommendations
- [ ] Blockchain donation tracking
- [ ] Virtual tours of projects
- [ ] Cryptocurrency donations
- [ ] SMS notifications
- [ ] WhatsApp integration
- [ ] QR code for offline donations

---

## 📋 Testing & Quality Assurance

### Functional Testing
- [ ] Test all forms for validation
- [ ] Test donation widget on all pages
- [ ] Test navigation on all device sizes
- [ ] Test form submissions
- [ ] Test external links
- [ ] Test social media links
- [ ] Test email functionality

### Cross-Browser Testing
- [ ] Chrome (desktop/mobile)
- [ ] Safari (desktop/mobile)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)
- [ ] Samsung Internet (mobile)

### Accessibility Testing
- [ ] Color contrast verification
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Form label associations
- [ ] Image alt text
- [ ] Focus indicators

### Performance Testing
- [ ] Page load time < 3 seconds
- [ ] Core Web Vitals (LCP, FID, CLS)
- [ ] Image optimization
- [ ] CSS/JS minification
- [ ] Mobile performance

### Security Testing
- [ ] OWASP Top 10 vulnerability scan
- [ ] XSS vulnerability testing
- [ ] CSRF protection verification
- [ ] Secure cookie configuration
- [ ] SSL/TLS certificate validation

---

## 📚 Documentation & Support

### Code Documentation
- **README.md:** Project overview, setup instructions
- **Inline Comments:** Complex logic explanation
- **CSS Architecture:** BEM naming convention documentation
- **Component Library:** Reusable component patterns
- **API Documentation:** Backend endpoint specifications

### User Documentation
- **Privacy Policy:** Data handling and protection
- **Terms of Service:** Usage terms and conditions
- **FAQ Pages:** Common questions and answers
- **Help Section:** User guides and troubleshooting
- **Contact Support:** Multiple support channels

### Developer Resources
- **Git Workflow:** Branching and commit guidelines
- **Environment Setup:** Local development instructions
- **Build Process:** Build and deployment steps
- **Contributing Guide:** Contribution guidelines
- **Issue Templates:** Bug report and feature request templates

---

## 🏁 Success Metrics & KPIs

### Engagement Metrics
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Monthly Page Views | 50,000 | - | TBD |
| Unique Visitors | 10,000 | - | TBD |
| Average Session Duration | 3+ minutes | - | TBD |
| Bounce Rate | < 40% | - | TBD |
| Return Visitor Rate | > 30% | - | TBD |

### Conversion Metrics
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Donation Conversion Rate | > 5% | - | TBD |
| Average Donation Amount | £50+ | - | TBD |
| Monthly Recurring Donors | Growing | - | TBD |
| Newsletter Signup Rate | > 10% | - | TBD |
| Contact Form Submission Rate | > 2% | - | TBD |

### Technical Metrics
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Page Load Time | < 3 seconds | - | TBD |
| Site Uptime | > 99.9% | - | TBD |
| Mobile Traffic | > 60% | - | TBD |
| Accessibility Score | > 90/100 | - | TBD |
| Performance Score | > 90/100 | - | TBD |

---

## 📞 Support & Contact Information

### Organization Contact
- **Phone:** +44 7540 253384
- **Email:** contact@brdtrust.org (assumed)
- **Facebook:** https://www.facebook.com/share/1Cfr31FKAz/
- **Instagram:** https://www.instagram.com/brdtrust/
- **Twitter:** https://x.com/brdtbd
- **LinkedIn:** https://www.linkedin.com/in/belghar-rural-development-trust-7437a0409/
- **TikTok:** https://www.tiktok.com/@brdtbd

### Technical Support
- **Repository:** https://github.com/akramrafid/BRDT-Website
- **Issues:** GitHub Issues for bug reports
- **Security:** security@brdtrust.org (recommended for security issues)

---

## 📅 Project Timeline & Milestones

### Phase 1: Current (Static Website)
- **Status:** ✅ Complete
- **Features:** 18 pages, 7 appeals, responsive design
- **Launch Date:** Live (main branch)

### Phase 2: Backend & Payment
- **Timeline:** Q3-Q4 2026
- **Deliverables:** 
  - User authentication system
  - Payment gateway integration
  - Database schema
  - API development
  - Email system

### Phase 3: Enhancement
- **Timeline:** Q1-Q2 2027
- **Deliverables:**
  - Admin dashboard
  - Mobile app
  - Advanced analytics
  - Donor management tools

---

## 🎓 Assumptions & Constraints

### Assumptions
1. Users have modern web browsers (Chrome 90+, Safari 14+, Firefox 88+)
2. Internet connection with minimum 2Mbps bandwidth
3. Mobile devices running iOS 12+ or Android 8+
4. Users have valid email addresses for registration
5. Backend/API services will be developed in future phases
6. Payment processing handled by third-party gateways
7. Email delivery handled by SMTP service provider
8. Images will be optimized before upload
9. CDN will be used for static assets

### Constraints
1. **Static Frontend:** No server-side rendering currently
2. **No Database:** Information stored in frontend (temporary)
3. **No Payment Processing:** Donation flows mock/placeholder
4. **No Email System:** Contact forms non-functional
5. **No Authentication:** Login/Register pages UI only
6. **Limited Analytics:** No tracking implemented yet
7. **Single Language:** English only (for now)
8. **Manual Updates:** Content requires code changes

### Technical Debt
1. Email functionality requires backend API
2. Authentication system needs implementation
3. Payment gateway integration pending
4. Database schema needs design review
5. Admin panel needs development
6. Analytics system needed
7. Automated testing framework required

---

## 📝 Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.0 | May 13, 2026 | Initial documentation | ✅ Complete |
| 1.1 | TBD | Database implementation | ⏳ Pending |
| 1.2 | TBD | Backend API | ⏳ Pending |
| 2.0 | TBD | Mobile app launch | ⏳ Pending |

---

## 👨‍💼 Approval & Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| Senior Software Engineer | (Analysis Completed) | May 13, 2026 | ✅ |
| Product Manager | TBD | TBD | ⏳ |
| Project Lead | TBD | TBD | ⏳ |
| Stakeholder | TBD | TBD | ⏳ |

---

## 📎 Appendices

### A. Glossary
- **BRDT:** Belghar Rural Development Trust
- **NGO:** Non-Governmental Organization
- **CTA:** Call-To-Action
- **UX/UI:** User Experience / User Interface
- **CDN:** Content Delivery Network
- **GDPR:** General Data Protection Regulation
- **WCAG:** Web Content Accessibility Guidelines
- **XSS:** Cross-Site Scripting
- **CSRF:** Cross-Site Request Forgery
- **SEO:** Search Engine Optimization

### B. Related Documents
- README.md (Project Overview)
- Privacy Policy (Data Protection)
- Terms of Service (Legal)
- Design System (Brand Guidelines)
- Git Repository (Code)

### C. External References
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Fonts - Outfit](https://fonts.google.com/specimen/Outfit)
- [Font Awesome 6.4.0](https://fontawesome.com/)
- [Web.dev Performance Metrics](https://web.dev/metrics/)
- [OWASP Security Guidelines](https://owasp.org/)

---

**Document Generated By:** Senior Software Engineer & Database Engineer  
**Review Date:** Quarterly (Q2 2026)  
**Next Update:** Q3 2026 or upon major changes

---

*This document serves as the authoritative source for application requirements, features, and technical specifications. All changes must be documented and approved before implementation.*
