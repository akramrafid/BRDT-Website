import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './src/api/auth.js';
import donationRoutes from './src/api/donations.js';
import invoiceRoutes from './src/api/invoices.js';
import contactRoutes from './src/api/contact.js';
import userRoutes from './src/api/users.js';

// Import middleware
import { errorHandler } from './src/middleware/errorHandler.js';
import { requestLogger } from './src/middleware/requestLogger.js';

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());

// CORS Configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:8000',
    'http://localhost:3000',
    'http://localhost:5000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Rate Limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000 || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body Parser Middleware
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ limit: '10kb', extended: true }));

// Request Logging Middleware
app.use(requestLogger);

// ==================== API Routes ====================
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'BRDT API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════╗
  ║  🌿 BRDT Charity API Server Started       ║
  ║                                            ║
  ║  Server: http://localhost:${PORT}          ║
  ║  Environment: ${process.env.NODE_ENV || 'development'}                  ║
  ║  Database: ${process.env.DB_NAME}           ║
  ╚════════════════════════════════════════════╝
  `);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

export default app;
