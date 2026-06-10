-- BRDT Charity - Create Tables for Production
-- Run with: mysql -u brdtrust_admin -p brdtrust_charity < setup-tables.sql

-- Contact Submissions (used by contact form)
CREATE TABLE IF NOT EXISTS contact_submissions (
    submission_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    reason_for_contact VARCHAR(255),
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

-- Users
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

-- Donations
CREATE TABLE IF NOT EXISTS donations (
    donation_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'BDT',
    donation_type ENUM(
        'one-off',
        'monthly',
        'annual'
    ) NOT NULL,
    appeal_type VARCHAR(100) NOT NULL,
    payment_method VARCHAR(50),
    payment_status ENUM(
        'pending',
        'completed',
        'failed',
        'refunded'
    ) DEFAULT 'pending',
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
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_appeal_type (appeal_type),
    INDEX idx_payment_status (payment_status),
    INDEX idx_date_donated (date_donated)
);

-- Invoices
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
    status ENUM(
        'generated',
        'sent',
        'paid',
        'overdue'
    ) DEFAULT 'generated',
    pdf_url VARCHAR(500),
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (donation_id) REFERENCES donations (donation_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    INDEX idx_invoice_number (invoice_number),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
);

-- Newsletter Subscriptions
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
    INDEX idx_is_active (is_active)
);

-- Email Logs
CREATE TABLE IF NOT EXISTS email_logs (
    log_id VARCHAR(36) PRIMARY KEY,
    email_address VARCHAR(255) NOT NULL,
    email_type ENUM(
        'verification',
        'receipt',
        'newsletter',
        'contact_response',
        'payment_confirmation',
        'password_reset'
    ) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    status ENUM(
        'sent',
        'bounced',
        'opened',
        'failed'
    ) DEFAULT 'sent',
    related_id VARCHAR(36),
    error_message TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email_address (email_address),
    INDEX idx_email_type (email_type),
    INDEX idx_status (status)
);

-- Password Reset Tokens
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    token_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    reset_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_reset_token (reset_token)
);

-- Email Verification Tokens
CREATE TABLE IF NOT EXISTS email_verification_tokens (
    token_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    verification_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_verification_token (verification_token)
);

-- Volunteer Applications
CREATE TABLE IF NOT EXISTS volunteer_applications (
    application_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    area_of_interest VARCHAR(255),
    message TEXT,
    status ENUM(
        'pending',
        'approved',
        'rejected'
    ) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status)
);