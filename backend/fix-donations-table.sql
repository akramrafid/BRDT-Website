SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS donations;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE donations (
  donation_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36),
  segment VARCHAR(100) NOT NULL,
  specific_cause VARCHAR(100),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'BDT',
  donation_type ENUM('one-off', 'monthly', 'annual') DEFAULT 'one-off',
  payment_method VARCHAR(50) NOT NULL,
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  sender_account_number VARCHAR(100),
  transaction_id VARCHAR(255),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(50),
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
  INDEX idx_segment (segment),
  INDEX idx_payment_status (payment_status),
  INDEX idx_date_donated (date_donated)
) ENGINE=InnoDB;
