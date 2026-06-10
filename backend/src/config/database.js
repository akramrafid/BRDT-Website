import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the correct .env path (works on both local and cPanel)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

// Clean helper: strip all whitespace, quotes, and invisible characters
const clean = (val) => (val || '').replace(/[\s'"]+/g, '');

// Read and clean database config
const dbConfig = {
  host: clean(process.env.DB_HOST) || 'localhost',
  user: clean(process.env.DB_USER) || 'root',
  password: (process.env.DB_PASSWORD || '').trim(),
  database: clean(process.env.DB_NAME) || 'brdt_charity',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
};

// === CRITICAL DEBUG LOG ===
// This will show in stderr.log on cPanel so we can see exactly what's happening
console.log('========== DATABASE CONFIG DEBUG ==========');
console.log('ENV Path:', envPath);
console.log('DB_HOST env raw:', JSON.stringify(process.env.DB_HOST));
console.log('DB_USER env raw:', JSON.stringify(process.env.DB_USER));
console.log('DB_NAME env raw:', JSON.stringify(process.env.DB_NAME));
console.log('DB_PASSWORD env exists:', !!process.env.DB_PASSWORD);
console.log('Cleaned config:', JSON.stringify({ ...dbConfig, password: '***' }));
console.log('===========================================');

// Create Connection Pool
const pool = mysql.createPool({
  ...dbConfig,
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
    console.error('Config used:', JSON.stringify({ ...dbConfig, password: '***' }));
    return false;
  }
};

// Export config for debug endpoint
export { dbConfig };

export default pool;

