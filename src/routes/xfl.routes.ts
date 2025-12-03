// src/routes/xfl.routes.ts
import { Router, Request, Response } from 'express';

const router = Router();

// ============================================================================
// XFL Live Scores
// ============================================================================

/**
 * @route   GET /api/xfl/scores
 * @desc    Get XFL live scores
 * @access  Public
 */
router.get('/scores', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'XFL live scores endpoint - implementation pending',
    metadata: {
      sport: 'xfl',
      dataType: 'scores',
      endpoint: '/api/xfl/scores',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

// ============================================================================
// XFL Schedule
// ============================================================================

/**
 * @route   GET /api/xfl/schedule
 * @desc    Get XFL schedule
 * @access  Public
 * @query   showOdds - Include betting odds
 */
router.get('/schedule', async (req: Request, res: Response) => {
  const { showOdds } = req.query;
  
  res.json({
    success: true,
    data: null,
    llm_context: 'XFL schedule endpoint - implementation pending',
    metadata: {
      sport: 'xfl',
      dataType: 'schedule',
      endpoint: '/api/xfl/schedule',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { showOdds },
    },
  });
});

// ============================================================================
// XFL Team Data
// ============================================================================

/**
 * @route   GET /api/xfl/teams/:teamId/roster
 * @desc    Get XFL team roster
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/roster', async (req: Request, res: Response) => {
  const { teamId } = req.params;
  
  res.json({
    success: true,
    data: null,
    llm_context: `XFL team roster for team ${teamId} - implementation pending`,
    metadata: {
      sport: 'xfl',
      dataType: 'roster',
      endpoint: `/api/xfl/teams/${teamId}/roster`,
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { teamId },
    },
  });
});

export default router;
