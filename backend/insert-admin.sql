INSERT INTO users (
  user_id, email, password_hash, first_name, last_name, role, is_active, email_verified, created_at, updated_at
) VALUES (
  UUID(), 
  'brdtbd@gmail.com', 
  '$2a$10$1ZfalI3SHxIxf6/vJAx7G.Lz8QQSpRUN8nEpqx5sayhicQuR3tyOe', 
  'BRDT', 
  'Admin', 
  'admin', 
  TRUE, 
  TRUE, 
  NOW(), 
  NOW()
) ON DUPLICATE KEY UPDATE 
  role = 'admin', 
  password_hash = '$2a$10$1ZfalI3SHxIxf6/vJAx7G.Lz8QQSpRUN8nEpqx5sayhicQuR3tyOe';
