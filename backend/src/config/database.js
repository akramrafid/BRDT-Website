import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Resolve paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, '../..');

// ============================================================
// BULLETPROOF ENV LOADING
// cPanel sets env vars via its UI which OVERRIDE dotenv.
// So we manually parse .env.production to get the REAL values.
// ============================================================
function parseEnvFile(filePath) {
  const vars = {};
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.substring(0, eqIndex).trim();
      const value = trimmed.substring(eqIndex + 1).trim();
      vars[key] = value;
    }
  } catch (err) {
    console.error('Could not read env file:', filePath, err.message);
  }
  return vars;
}

// Try .env.production first, then .env
const prodEnvPath = path.join(backendRoot, '.env.production');
const devEnvPath = path.join(backendRoot, '.env');
let envVars = {};

if (fs.existsSync(prodEnvPath)) {
  console.log('✅ Loading from .env.production');
  envVars = parseEnvFile(prodEnvPath);
} else if (fs.existsSync(devEnvPath)) {
  console.log('📁 Loading from .env (dev mode)');
  envVars = parseEnvFile(devEnvPath);
} else {
  console.log('⚠️  No .env file found, using process.env only');
}

// Also load into process.env for other modules (with override!)
dotenv.config({ path: fs.existsSync(prodEnvPath) ? prodEnvPath : devEnvPath, override: true });

// Helper: get value from our parsed file FIRST, then process.env as fallback
const getEnv = (key, fallback = '') => {
  return (envVars[key] || process.env[key] || fallback).trim();
};

// Build database config — values come from our own parser, NOT cPanel's env
const dbConfig = {
  host: getEnv('DB_HOST', 'localhost'),
  user: getEnv('DB_USER', 'root'),
  password: getEnv('DB_PASSWORD', ''),
  database: getEnv('DB_NAME', 'brdt_charity'),
  port: parseInt(getEnv('DB_PORT', '3306'), 10),
};

// Debug log (visible in cPanel stderr.log)
console.log('========== DATABASE CONFIG ==========');
console.log('DB Host:', dbConfig.host);
console.log('DB User:', dbConfig.user);
console.log('DB Name:', JSON.stringify(dbConfig.database));
console.log('DB Password exists:', dbConfig.password.length > 0);
console.log('=====================================');

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

