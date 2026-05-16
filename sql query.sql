USE brdt_charity;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS email_verification_tokens;
DROP TABLE IF EXISTS password_reset_tokens;
DROP TABLE IF EXISTS email_logs;
DROP TABLE IF EXISTS newsletter_subscriptions;
DROP TABLE IF EXISTS contact_submissions;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS donations;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS appeals;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
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
) ENGINE=InnoDB;

CREATE TABLE donations (
  donation_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36),
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
  INDEX idx_user_id (user_id),
  INDEX idx_appeal_type (appeal_type),
  INDEX idx_payment_status (payment_status),
  INDEX idx_date_donated (date_donated)
) ENGINE=InnoDB;

CREATE TABLE invoices (
  invoice_id VARCHAR(36) PRIMARY KEY,
  donation_id VARCHAR(36) NOT NULL UNIQUE,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'BDT',
  appeal_type VARCHAR(100) NOT NULL,
  invoice_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('generated', 'sent', 'paid', 'overdue') DEFAULT 'generated',
  pdf_url VARCHAR(500),
  email_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_invoice_number (invoice_number),
  INDEX idx_status (status)
) ENGINE=InnoDB;

CREATE TABLE newsletter_subscriptions (
  subscription_id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  unsubscribe_token VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB;

CREATE TABLE contact_submissions (
  submission_id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  is_resolved BOOLEAN DEFAULT FALSE,
  response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_is_resolved (is_resolved)
) ENGINE=InnoDB;
