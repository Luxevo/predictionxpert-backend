// src/config/index.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // GoalServe API
  goalserve: {
    apiKey: process.env.GOALSERVE_API_KEY || '',
    baseUrl: process.env.GOALSERVE_BASE_URL || 'https://www.goalserve.com/getfeed',
  },

  // Supabase
  supabase: {
    url: process.env.SUPABASE_URL || '',
    serviceKey: process.env.SUPABASE_SERVICE_KEY || '',
  },

  // CORS
  cors: {
    origins: process.env.CORS_ORIGINS?.split(',') || ['*'],
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },

  // Request Timeout
  requestTimeoutMs: parseInt(process.env.REQUEST_TIMEOUT_MS || '10000', 10),
} as const;

// Validate required configuration
export function validateConfig(): void {
  const required = [
    { key: 'GOALSERVE_API_KEY', value: config.goalserve.apiKey },
  ];

  const missing = required.filter(({ value }) => !value);

  if (missing.length > 0) {
    console.warn(
      `⚠️  Missing environment variables: ${missing.map(({ key }) => key).join(', ')}`
    );
  }
}

export default config;
