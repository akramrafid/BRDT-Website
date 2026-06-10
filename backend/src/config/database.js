import mysql from 'mysql2/promise';
import os from 'os';

// ============================================================
// PRODUCTION DATABASE CONFIG - HARDCODED
// ============================================================
// Why hardcoded? cPanel's LiteSpeed environment corrupts env
// variables with invisible spaces. After extensive debugging,
// hardcoding is the only 100% reliable approach on this host.
// ============================================================

const isProduction = os.hostname() !== 'MSI' && !process.env.VITE_ENVIRONMENT;

const PRODUCTION_DB = {
  host: 'localhost',
  user: 'brdtrust_admin',
  password: 'BrdtAdmin2026',
  database: 'brdtrust_charity',
  port: 3306,
};

const DEVELOPMENT_DB = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rahatfahim4949',
  database: process.env.DB_NAME || 'brdt_charity',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
};

// Use production values on server, dev values locally
const dbConfig = isProduction ? PRODUCTION_DB : DEVELOPMENT_DB;

console.log(`[DB] Mode: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
console.log(`[DB] Host: ${dbConfig.host}`);
console.log(`[DB] User: ${dbConfig.user}`);
console.log(`[DB] Database: "${dbConfig.database}"`);
console.log(`[DB] Password: ${'*'.repeat(dbConfig.password.length)}`);

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

export { dbConfig };
export default pool;
