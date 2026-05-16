# BRDT Charity Website: Step-by-Step Feature Flow & User Journey

This document strictly aligns the User Journey with the features (F1-F10) defined in the `Application & requirement listing.md` and the processes (1.0-4.0) defined in the `brdt_dfd.md`.

---

## Feature Flow 1: User Authentication (F2) & DFD 1.0
**Goal:** Secure Donor login, registration, and OTP recovery.
**Associated Data Store:** D1 (Users DB)

### Step 1.1: New User Registration
1. User navigates to the Registration page.
2. User submits the registration form (Name, Email, Password, Address).
3. Frontend performs real-time validation (password strength check).
4. System creates an inactive record in **D1 (Users DB)**.
5. System emails a verification link (Magic Link) to the user.
6. User clicks the link; System updates **D1** to set the account as active.

### Step 1.2: Returning User Login
1. User navigates to the Login page.
2. User selects either "Password Login" or "Magic Link".
3. **Password Method:** User enters credentials. System validates against **D1**.
4. **Magic Link Method:** User enters their email. System sends a one-time login link to the email.
5. System returns a secure JWT token to the frontend for session persistence.

### Step 1.3: Forgot Password (OTP Flow)
1. User clicks "Forgot Password" on the login screen.
2. User inputs their registered email address.
3. System verifies the email in **D1** and generates a secure 6-digit OTP.
4. System emails the OTP to the user.
5. User enters the OTP; System validates it against the temporary store.
6. User enters a new password; System hashes and updates the password in **D1**.

---

## Feature Flow 2: Donation Processing (F1) & DFD 2.0
**Goal:** Process one-off/monthly donations securely and send automated invoices.
**Associated Data Stores:** D2 (Donations DB), D1 (Users DB)

### Step 2.1: Donation Initiation
1. User clicks "Donate Now" or interacts with the Donation Widget.
2. User selects the frequency: "One-Off" or "Monthly".
3. User selects the amount (৳20, ৳50, ৳100, ৳500, or Custom).
4. User selects the specific Appeal Category (if not pre-filled by the page context).

### Step 2.2: Payment Execution
1. System sends donation parameters to the backend to generate a Payment Intent.
2. Backend communicates securely with the **Payment Gateway (Stripe/PayPal)**.
3. User inputs payment details via secure elements (Stripe Elements).
4. Payment Gateway processes the transaction and returns a success status.

### Step 2.3: Data Storage & Dual-Email Invoicing
1. System associates the donation with the user's profile in **D1** (if logged in).
2. System records the complete transaction details in **D2 (Donations DB)**.
3. System generates a PDF Invoice for the transaction.
4. **Dual-Email System Triggers:**
   - **Email 1:** System sends the PDF Invoice and a Thank You message to the Donor.
   - **Email 2:** System sends a transaction notification and a copy of the Invoice to the Website Admin.
5. User is redirected to a success/thank you confirmation screen.

---

## Feature Flow 3: Content & Appeal Management (F3, F4, F9) & DFD 3.0
**Goal:** Serve dynamic projects, appeals, and specific campaigns.
**Associated Data Store:** D3 (Content DB)

### Step 3.1: Appeal Campaign Management (F3)
1. User hovers over "Appeals" in the top navigation menu.
2. User selects one of the 7 dedicated appeal pages (e.g., Zakat, Fitra, Orphan Sponsorship).
3. System retrieves specific campaign content, FAQs, and impact statistics from **D3 (Content DB)**.
4. System renders the appeal page alongside an appeal-specific donation widget.

### Step 3.2: Project Showcase (F4)
1. User navigates to the `projects.html` page.
2. System fetches data for 15+ humanitarian projects from **D3**.
3. User explores the grid/list view and clicks on a project to view detailed stories, images, and beneficiary metrics.

---

## Feature Flow 4: Communications & Newsletters (F5, F6) & DFD 4.0
**Goal:** Capture support queries and centralize newsletter email collection.
**Associated Data Store:** D4 (Communications DB)

### Step 4.1: Contact Form (F6)
1. User navigates to the `contact.html` page.
2. User submits the contact form (Name, Email, Subject, Message).
3. System validates inputs and records the submission as a ticket in **D4 (Communications DB)**.
4. System sends an automated "We received your message" auto-reply to the User.
5. System sends a notification alert to the Admin dashboard/email.

### Step 4.2: Newsletter Subscription (F5)
1. User enters their email in the Newsletter Widget (located in headers or footers).
2. User clicks "Subscribe".
3. System validates the email format.
4. System checks **D4** to prevent duplicate entries.
5. System **centrally stores** the email address in **D4 (Communications DB)**.
6. System displays a success confirmation message in the UI.

---

## Feature Flow 5: Site Experience (F7, F8, F10)
**Goal:** Ensure smooth navigation, responsiveness, and social connectivity.

### Step 5.1: Page Navigation (F10)
1. User relies on the sticky header navigation or mobile hamburger menu.
2. System seamlessly navigates the user between Home, Projects, Madrasah, Ramadan, Appeals, About Us, and Contact Us.

### Step 5.2: Social Media Integration (F7)
1. User locates the social media icons in the header/footer (Facebook, Instagram, X/Twitter, LinkedIn, TikTok).
2. User clicks an icon.
3. System opens the official BRDT profile in a new browser tab.

### Step 5.3: Responsive Design (F8)
1. User accesses the platform from a Mobile, Tablet, or Desktop.
2. System's CSS architecture automatically adjusts grid layouts, flexboxes, and touch targets to guarantee an optimal browsing experience across all viewports.
