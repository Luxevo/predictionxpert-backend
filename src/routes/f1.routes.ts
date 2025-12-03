// src/routes/f1.routes.ts
import { Router, Request, Response } from 'express';

const router = Router();

// ============================================================================
// Formula 1 Results
// ============================================================================

/**
 * @route   GET /api/f1/results
 * @desc    Get F1 race results
 * @access  Public
 */
router.get('/results', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'F1 race results endpoint - implementation pending',
    metadata: {
      sport: 'f1',
      dataType: 'scores',
      endpoint: '/api/f1/results',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

// ============================================================================
// Formula 1 Live
// ============================================================================

/**
 * @route   GET /api/f1/live
 * @desc    Get F1 live race data
 * @access  Public
 */
router.get('/live', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'F1 live race endpoint - implementation pending',
    metadata: {
      sport: 'f1',
      dataType: 'scores',
      endpoint: '/api/f1/live',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

// ============================================================================
// Formula 1 Drivers
// ============================================================================

/**
 * @route   GET /api/f1/drivers
 * @desc    Get F1 drivers list and standings
 * @access  Public
 */
router.get('/drivers', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'F1 drivers endpoint - implementation pending',
    metadata: {
      sport: 'f1',
      dataType: 'roster',
      endpoint: '/api/f1/drivers',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

// ============================================================================
// Formula 1 Teams
// ============================================================================

/**
 * @route   GET /api/f1/teams
 * @desc    Get F1 teams/constructors standings
 * @access  Public
 */
router.get('/teams', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'F1 teams/constructors endpoint - implementation pending',
    metadata: {
      sport: 'f1',
      dataType: 'standings',
      endpoint: '/api/f1/teams',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

export default router;
