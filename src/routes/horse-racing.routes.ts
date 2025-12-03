// src/routes/horse-racing.routes.ts
import { Router, Request, Response } from 'express';

const router = Router();

// ============================================================================
// Horse Racing - Today
// ============================================================================

/**
 * @route   GET /api/horse-racing/today
 * @desc    Get today's horse racing entries and results
 * @access  Public
 */
router.get('/today', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'Horse racing today entries/results endpoint - implementation pending',
    metadata: {
      sport: 'horse-racing',
      dataType: 'scores',
      endpoint: '/api/horse-racing/today',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

// ============================================================================
// Horse Racing - Tomorrow
// ============================================================================

/**
 * @route   GET /api/horse-racing/tomorrow
 * @desc    Get tomorrow's horse racing entries
 * @access  Public
 */
router.get('/tomorrow', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'Horse racing tomorrow entries endpoint - implementation pending',
    metadata: {
      sport: 'horse-racing',
      dataType: 'schedule',
      endpoint: '/api/horse-racing/tomorrow',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

export default router;
