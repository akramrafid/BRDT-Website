import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create Connection Pool
const pool = mysql.createPool({
  host: (process.env.DB_HOST || 'localhost').replace(/['"\s]+/g, ''),
  user: (process.env.DB_USER || 'root').replace(/['"\s]+/g, ''),
  password: (process.env.DB_PASSWORD || '').trim(),
  database: (process.env.DB_NAME || 'brdt_charity').replace(/['"\s]+/g, ''),
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0
});

// Test Database Connection
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ MySQL Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ MySQL Database connection failed:', error.message);
    return false;
  }
};

export default pool;
