// src/routes/health.routes.ts
import { Router, Request, Response } from 'express';
import { config } from '../config/index.js';

const router = Router();

/**
 * @route   GET /health
 * @desc    Basic health check
 * @access  Public
 */
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

/**
 * @route   GET /health/ready
 * @desc    Readiness check (includes dependency checks)
 * @access  Public
 */
router.get('/ready', (_req: Request, res: Response) => {
  // TODO: Add actual dependency checks (Supabase, GoalServe API)
  const checks = {
    api: true,
    goalserve: !!config.goalserve.apiKey,
    supabase: !!config.supabase.url && !!config.supabase.serviceKey,
  };

  const isReady = Object.values(checks).every(Boolean);

  res.status(isReady ? 200 : 503).json({
    success: isReady,
    status: isReady ? 'ready' : 'not_ready',
    checks,
    timestamp: new Date().toISOString(),
  });
});

/**
 * @route   GET /health/live
 * @desc    Liveness check
 * @access  Public
 */
router.get('/live', (_req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'alive',
    timestamp: new Date().toISOString(),
  });
});

export default router;
