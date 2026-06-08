import bcrypt from 'bcryptjs';
import pool from './src/config/database.js';
import { generateId } from './src/utils/helpers.js';
import dotenv from 'dotenv';

dotenv.config();

async function seedAdmin() {
  const ADMIN_EMAIL = 'brdtbd@gmail.com';
  const ADMIN_PASSWORD = '#Tru5t@brdt21#';

  try {
    const conn = await pool.getConnection();

    // Check if admin already exists
    const [existing] = await conn.query('SELECT user_id FROM users WHERE email = ?', [ADMIN_EMAIL]);
    
    if (existing.length > 0) {
      console.log('✅ Admin user already exists. Updating role to admin...');
      await conn.query('UPDATE users SET role = "admin" WHERE email = ?', [ADMIN_EMAIL]);
      conn.release();
      console.log('✅ Admin role confirmed.');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);

    const userId = generateId();
    const now = new Date();

    await conn.query(
      `INSERT INTO users (user_id, email, password_hash, first_name, last_name, role, is_active, email_verified, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'admin', TRUE, TRUE, ?, ?)`,
      [userId, ADMIN_EMAIL, passwordHash, 'BRDT', 'Admin', now, now]
    );

    conn.release();
    console.log('');
    console.log('  ✅ Admin user created successfully!');
    console.log(`  📧 Email: ${ADMIN_EMAIL}`);
    console.log(`  🔑 Password: ${ADMIN_PASSWORD}`);
    console.log(`  🆔 User ID: ${userId}`);
    console.log('');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    process.exit(1);
  }
}

seedAdmin();
