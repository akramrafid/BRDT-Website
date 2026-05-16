# BRDT API Documentation

Complete API reference for BRDT Charity Backend Server.

---

## 📌 Base URL

```
Development: http://localhost:5000/api
Production: https://api.brdtrust.org/api
```

---

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Get a token by logging in:
```bash
POST /auth/login
```

---

## 📚 Endpoints Reference

### Health Check

#### GET `/health`
Check if API is running.

**Response:**
```json
{
  "status": "success",
  "message": "BRDT API is running",
  "timestamp": "2026-05-13T10:00:00.000Z",
  "environment": "development"
}
```

---

## 🔑 Authentication Endpoints

### POST `/auth/register`
Register a new donor account.

**Request Body:**
```json
{
  "email": "donor@example.com",
  "password": "SecurePass123!",
  "fullName": "John Donor",
  "phone": "+1234567890",
  "address": "123 Main Street",
  "country": "United Kingdom"
}
```

**Required Fields:** email, password, fullName  
**Optional Fields:** phone, address, country

**Response (201):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "donor@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Rules:**
- Email: Valid email format, unique
- Password: Min 8 characters
- Full Name: Required, non-empty

---

### POST `/auth/login`
Authenticate and get JWT token.

**Request Body:**
```json
{
  "email": "donor@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "donor@example.com",
    "fullName": "John Donor",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### GET `/auth/me`
Get current authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "message": "User retrieved",
  "data": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "donor@example.com",
    "full_name": "John Donor",
    "phone": "+1234567890",
    "address": "123 Main Street",
    "country": "United Kingdom",
    "is_active": true,
    "email_verified": false,
    "newsletter_subscribed": true,
    "created_at": "2026-05-13T10:00:00.000Z"
  }
}
```

---

### PUT `/auth/update`
Update user profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "fullName": "John Updated",
  "phone": "+1987654321",
  "address": "456 Oak Street",
  "country": "Bangladesh",
  "newsletterSubscribed": true
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "User updated successfully"
}
```

---

### PUT `/auth/change-password`
Change account password.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "oldPassword": "OldPass123!",
  "newPassword": "NewPass456!"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Password changed successfully"
}
```

---

## 💳 Donation Endpoints

### POST `/donations/create`
Create a new donation and get Stripe payment intent.

**Request Body:**
```json
{
  "amount": 50.00,
  "donationType": "one-off",
  "appealType": "zakat",
  "paymentMethod": "stripe",
  "isAnonymous": false
}
```

**Fields:**
- **amount** (required): Donation amount in GBP (float)
- **donationType** (required): "one-off", "monthly", "annual"
- **appealType** (required): "zakat", "fitra", "sadaqah", "flood", "sponsor-hafiz", "back-to-school", "orphan"
- **paymentMethod** (optional): "stripe" (default)
- **isAnonymous** (optional): true/false (default: false)

**Response (201):**
```json
{
  "status": "success",
  "message": "Donation created",
  "data": {
    "donationId": "550e8400-e29b-41d4-a716-446655440001",
    "clientSecret": "pi_test_secret_xxx",
    "intentId": "pi_test_xxx",
    "amount": 50.00,
    "currency": "GBP"
  }
}
```

**Process:**
1. Frontend receives `clientSecret`
2. Frontend uses Stripe Elements to collect payment
3. Frontend confirms payment with Stripe
4. Call `/donations/process` endpoint

---

### POST `/donations/process`
Process payment and generate invoice + send emails.

**Request Body:**
```json
{
  "donationId": "550e8400-e29b-41d4-a716-446655440001",
  "intentId": "pi_test_xxx"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Donation completed and invoices sent",
  "data": {
    "donationId": "550e8400-e29b-41d4-a716-446655440001",
    "invoiceNumber": "INV-20260513-00001",
    "amount": 50.00,
    "status": "completed"
  }
}
```

**What Happens:**
1. Payment status verified with Stripe
2. Donation marked as "completed"
3. PDF invoice generated
4. Invoice saved to database
5. Email sent to donor with PDF
6. Email sent to admin with PDF

---

### GET `/donations/:donationId`
Get donation details.

**URL Parameters:**
- `donationId` (string): UUID of donation

**Response (200):**
```json
{
  "status": "success",
  "message": "Donation retrieved",
  "data": {
    "donation_id": "550e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "amount": 50.00,
    "currency": "GBP",
    "donation_type": "one-off",
    "appeal_type": "zakat",
    "payment_status": "completed",
    "transaction_id": "pi_test_xxx",
    "is_anonymous": false,
    "date_donated": "2026-05-13T10:00:00.000Z",
    "created_at": "2026-05-13T10:00:00.000Z"
  }
}
```

---

### GET `/donations/user/:userId`
Get all donations by a user.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `userId` (string): UUID of user

**Query Parameters:**
- `limit` (number, default: 50): Max results
- `offset` (number, default: 0): Pagination offset

**Response (200):**
```json
{
  "status": "success",
  "message": "Donations retrieved",
  "data": [
    {
      "donation_id": "550e8400-e29b-41d4-a716-446655440001",
      "amount": 50.00,
      "appeal_type": "zakat",
      "donation_type": "one-off",
      "payment_status": "completed",
      "date_donated": "2026-05-13T10:00:00.000Z"
    },
    {
      "donation_id": "550e8400-e29b-41d4-a716-446655440002",
      "amount": 100.00,
      "appeal_type": "fitra",
      "donation_type": "monthly",
      "payment_status": "completed",
      "date_donated": "2026-05-12T10:00:00.000Z"
    }
  ]
}
```

---

### GET `/donations/appeal/:appealType/stats`
Get statistics for an appeal campaign.

**URL Parameters:**
- `appealType` (string): Appeal type (zakat, fitra, etc.)

**Response (200):**
```json
{
  "status": "success",
  "message": "Appeal statistics",
  "data": {
    "count": 127,
    "total": 5000.00
  }
}
```

---

## 📄 Invoice Endpoints

### GET `/invoices/:invoiceId`
Get invoice details.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `invoiceId` (string): UUID of invoice

**Response (200):**
```json
{
  "status": "success",
  "message": "Invoice retrieved",
  "data": {
    "invoice_id": "550e8400-e29b-41d4-a716-446655440010",
    "donation_id": "550e8400-e29b-41d4-a716-446655440001",
    "invoice_number": "INV-20260513-00001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "amount": 50.00,
    "currency": "GBP",
    "appeal_type": "zakat",
    "status": "sent",
    "pdf_url": "https://api.brdtrust.org/uploads/invoices/BRDT-Invoice-INV-20260513-00001.pdf",
    "email_sent": true,
    "email_sent_at": "2026-05-13T10:05:00.000Z",
    "invoice_date": "2026-05-13T10:00:00.000Z"
  }
}
```

---

### GET `/invoices/number/:invoiceNumber`
Get invoice by invoice number.

**URL Parameters:**
- `invoiceNumber` (string): Invoice number (e.g., INV-20260513-00001)

**Response (200):**
```json
{
  "status": "success",
  "message": "Invoice retrieved",
  "data": { /* same as above */ }
}
```

---

### GET `/invoices/user/:userId`
Get all invoices for a user.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `userId` (string): UUID of user

**Query Parameters:**
- `limit` (number, default: 50)
- `offset` (number, default: 0)

**Response (200):**
```json
{
  "status": "success",
  "message": "Invoices retrieved",
  "data": [
    { /* invoice object */ },
    { /* invoice object */ }
  ]
}
```

---

## 📧 Contact Endpoints

### POST `/contact/submit`
Submit a contact form.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Inquiry about sponsorship",
  "message": "I would like to know more about the Hafiz sponsorship program..."
}
```

**Required Fields:** name, email, subject, message  
**Message minimum:** 10 characters

**Response (201):**
```json
{
  "status": "success",
  "message": "Contact form submitted successfully",
  "data": {
    "submissionId": "550e8400-e29b-41d4-a716-446655440020"
  }
}
```

**What Happens:**
1. Submission saved to database
2. Confirmation email sent to user
3. Notification email sent to admin

---

### POST `/contact/respond/:submissionId`
Send response to a contact submission (admin only).

**URL Parameters:**
- `submissionId` (string): UUID of submission

**Request Body:**
```json
{
  "responseMessage": "<p>Thank you for your inquiry. Here is information about our Hafiz sponsorship program...</p>"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Response sent successfully"
}
```

---

## 👤 User Endpoints

### GET `/users/profile`
Get authenticated user profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Profile retrieved",
  "data": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "donor@example.com",
    "full_name": "John Donor",
    "phone": "+1234567890",
    "address": "123 Main Street",
    "country": "United Kingdom",
    "newsletter_subscribed": true,
    "created_at": "2026-05-13T10:00:00.000Z"
  }
}
```

---

### PUT `/users/profile/update`
Update user profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "fullName": "John Updated",
  "phone": "+1987654321",
  "address": "456 New Address",
  "country": "Bangladesh",
  "newsletterSubscribed": false
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Profile updated successfully"
}
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

## 🔄 Complete Donation Flow

```
1. POST /donations/create
   ↓
   Returns: clientSecret, intentId

2. Frontend confirms Stripe payment with clientSecret
   ↓
   Stripe returns: paymentIntent confirmation

3. POST /donations/process
   ↓
   Server generates invoice PDF
   Server sends emails to donor and admin
   Returns: invoiceNumber, status

4. Donor receives email with:
   - Donation confirmation
   - PDF invoice attached
   - Tax receipt information

5. Admin receives email with:
   - Donation notification
   - Donor details
   - PDF invoice attached
```

---

## 📊 Response Format

All API responses follow this format:

```json
{
  "status": "success|error",
  "message": "Human-readable message",
  "data": null|{}|[]
}
```

**Status:** Always "success" or "error"  
**Message:** Describes what happened  
**Data:** Null for errors, contains result for success

---

## 🔐 Rate Limiting

API is rate-limited to prevent abuse:

- **Window:** 15 minutes
- **Max Requests:** 100 per window
- **Response Header:** `RateLimit-*`

---

## 📝 Pagination

List endpoints support pagination:

```
GET /donations/user/:userId?limit=50&offset=0
```

- **limit:** Items per page (default: 50, max: 100)
- **offset:** Number of items to skip (default: 0)

---

## 🧪 Test Credentials

**Test User:**
```
Email: test@example.com
Password: TestPass123!
```

**Test Card:**
```
Card: 4242 4242 4242 4242
Exp: 12/25
CVC: 123
```

---

## 📞 Support

- **Docs:** See README.md
- **Issues:** GitHub Issues
- **Email:** support@brdtrust.org

---

**Last Updated:** May 2026  
**Version:** 1.0.0
