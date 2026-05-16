-- ==================== BRDT Charity Database Schema ====================
-- Database: brdt_charity
-- Created: May 2026
-- Description: Complete database schema for BRDT Charity Website

-- ==================== CREATE DATABASE ====================
CREATE DATABASE IF NOT EXISTS brdt_charity;
USE brdt_charity;

-- ==================== USERS TABLE ====================
CREATE TABLE IF NOT EXISTS users (
  user_id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  country VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  newsletter_subscribed BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_created_at (created_at),
  INDEX idx_is_active (is_active)
);

-- ==================== DONATIONS TABLE ====================
CREATE TABLE IF NOT EXISTS donations (
  donation_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'BDT',
  donation_type ENUM('one-off', 'monthly', 'annual') NOT NULL,
  appeal_type VARCHAR(100) NOT NULL,
  payment_method VARCHAR(50),
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  transaction_id VARCHAR(255),
  receipt_sent BOOLEAN DEFAULT FALSE,
  receipt_url VARCHAR(500),
  date_donated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  next_payment_date DATE,
  stripe_subscription_id VARCHAR(255),
  is_anonymous BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_appeal_type (appeal_type),
  INDEX idx_payment_status (payment_status),
  INDEX idx_date_donated (date_donated),
  INDEX idx_next_payment_date (next_payment_date)
);

-- ==================== INVOICES TABLE ====================
CREATE TABLE IF NOT EXISTS invoices (
  invoice_id VARCHAR(36) PRIMARY KEY,
  donation_id VARCHAR(36) NOT NULL UNIQUE,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'BDT',
  appeal_type VARCHAR(100) NOT NULL,
  invoice_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date DATE,
  paid_date TIMESTAMP NULL,
  status ENUM('generated', 'sent', 'paid', 'overdue') DEFAULT 'generated',
  pdf_url VARCHAR(500),
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (donation_id) REFERENCES donations(donation_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_invoice_number (invoice_number),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_invoice_date (invoice_date)
);

-- ==================== CONTACT SUBMISSIONS TABLE ====================
CREATE TABLE IF NOT EXISTS contact_submissions (
  submission_id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  is_resolved BOOLEAN DEFAULT FALSE,
  response TEXT,
  responded_by VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_is_resolved (is_resolved),
  INDEX idx_created_at (created_at)
);

-- ==================== NEWSLETTER SUBSCRIPTIONS TABLE ====================
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  subscription_id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  source_page VARCHAR(100),
  unsubscribe_token VARCHAR(255) UNIQUE,
  subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_is_active (is_active),
  INDEX idx_unsubscribe_token (unsubscribe_token)
);

-- ==================== EMAIL LOGS TABLE ====================
CREATE TABLE IF NOT EXISTS email_logs (
  log_id VARCHAR(36) PRIMARY KEY,
  email_address VARCHAR(255) NOT NULL,
  email_type ENUM('verification', 'receipt', 'newsletter', 'contact_response', 'payment_confirmation', 'password_reset') NOT NULL,
  subject VARCHAR(255) NOT NULL,
  status ENUM('sent', 'bounced', 'opened', 'failed') DEFAULT 'sent',
  related_id VARCHAR(36),
  error_message TEXT,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_email_address (email_address),
  INDEX idx_email_type (email_type),
  INDEX idx_status (status),
  INDEX idx_sent_at (sent_at)
);

-- ==================== PASSWORD RESET TOKENS TABLE ====================
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  token_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  reset_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_reset_token (reset_token),
  INDEX idx_expires_at (expires_at)
);

-- ==================== EMAIL VERIFICATION TOKENS TABLE ====================
CREATE TABLE IF NOT EXISTS email_verification_tokens (
  token_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  verification_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_verification_token (verification_token)
);

-- ==================== DONATION STATISTICS VIEW ====================
CREATE VIEW donation_statistics AS
SELECT 
  DATE(d.date_donated) AS donation_date,
  d.appeal_type,
  COUNT(*) AS total_donations,
  SUM(d.amount) AS total_amount,
  AVG(d.amount) AS average_amount,
  MAX(d.amount) AS max_amount,
  MIN(d.amount) AS min_amount
FROM donations d
WHERE d.payment_status = 'completed'
GROUP BY DATE(d.date_donated), d.appeal_type;

-- ==================== TOP DONORS VIEW ====================
CREATE VIEW top_donors AS
SELECT 
  u.user_id,
  u.full_name,
  u.email,
  COUNT(d.donation_id) AS total_donations,
  SUM(d.amount) AS total_amount,
  MAX(d.date_donated) AS last_donation_date
FROM users u
LEFT JOIN donations d ON u.user_id = d.user_id AND d.payment_status = 'completed'
GROUP BY u.user_id
ORDER BY total_amount DESC
LIMIT 100;

-- ==================== APPEAL PERFORMANCE VIEW ====================
CREATE VIEW appeal_performance AS
SELECT 
  d.appeal_type,
  COUNT(*) AS total_donations,
  SUM(d.amount) AS total_raised,
  AVG(d.amount) AS average_donation,
  COUNT(DISTINCT d.user_id) AS unique_donors
FROM donations d
WHERE d.payment_status = 'completed'
GROUP BY d.appeal_type
ORDER BY total_raised DESC;

-- ==================== INDEXES FOR PERFORMANCE ====================
-- Already created in individual tables, but here's a summary for reference:
-- Users: email, created_at, is_active
-- Donations: user_id, appeal_type, payment_status, date_donated, next_payment_date
-- Invoices: invoice_number, user_id, status, invoice_date
-- Contact: email, is_resolved, created_at
-- Newsletter: email, is_active, unsubscribe_token
-- Email Logs: email_address, email_type, status, sent_at
-- Password Reset: user_id, reset_token, expires_at
-- Email Verification: user_id, verification_token
