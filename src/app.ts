// src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';

import { config } from './config/index.js';
import routes from './routes/index.js';
import { swaggerSpec } from './config/swagger.js';

// Create Express application
const app: Application = express();

// ============================================================================
// Security Middleware
// ============================================================================

// Helmet for security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.cors.origins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ============================================================================
// Rate Limiting
// ============================================================================

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later.',
      details: {
        windowMs: config.rateLimit.windowMs,
        maxRequests: config.rateLimit.maxRequests,
      },
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to API routes
app.use('/api', limiter);

// ============================================================================
// Body Parsing Middleware
// ============================================================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================================================
// Request Logging Middleware
// ============================================================================

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    };
    
    // Log to console (can be replaced with a proper logger later)
    if (config.isDevelopment) {
      console.log(`[${log.timestamp}] ${log.method} ${log.path} ${log.status} ${log.duration}`);
    }
  });
  
  next();
});

// ============================================================================
// Swagger Documentation
// ============================================================================

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'PredictionXpert API Docs',
}));

// Serve swagger spec as JSON
app.get('/docs.json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// ============================================================================
// Routes
// ============================================================================

app.use('/', routes);

// ============================================================================
// 404 Handler
// ============================================================================

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'The requested endpoint does not exist.',
      details: {
        availableEndpoints: '/api for documentation',
      },
    },
  });
});

// ============================================================================
// Global Error Handler
// ============================================================================

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  
  // Don't leak error details in production
  const errorResponse = {
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: config.isProduction 
        ? 'An unexpected error occurred.' 
        : err.message,
      details: config.isDevelopment 
        ? { stack: err.stack } 
        : undefined,
    },
  };
  
  res.status(500).json(errorResponse);
});

export default app;
