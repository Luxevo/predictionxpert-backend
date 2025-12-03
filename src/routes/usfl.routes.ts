// src/routes/usfl.routes.ts
import { Router, Request, Response } from 'express';

const router = Router();

// ============================================================================
// USFL Live Scores
// ============================================================================

/**
 * @route   GET /api/usfl/scores
 * @desc    Get USFL live scores
 * @access  Public
 */
router.get('/scores', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'USFL live scores endpoint - implementation pending',
    metadata: {
      sport: 'usfl',
      dataType: 'scores',
      endpoint: '/api/usfl/scores',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

// ============================================================================
// USFL Schedule
// ============================================================================

/**
 * @route   GET /api/usfl/schedule
 * @desc    Get USFL schedule
 * @access  Public
 * @query   showOdds - Include betting odds
 */
router.get('/schedule', async (req: Request, res: Response) => {
  const { showOdds } = req.query;
  
  res.json({
    success: true,
    data: null,
    llm_context: 'USFL schedule endpoint - implementation pending',
    metadata: {
      sport: 'usfl',
      dataType: 'schedule',
      endpoint: '/api/usfl/schedule',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { showOdds },
    },
  });
});

// ============================================================================
// USFL Team Data
// ============================================================================

/**
 * @route   GET /api/usfl/teams/:teamId/roster
 * @desc    Get USFL team roster
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/roster', async (req: Request, res: Response) => {
  const { teamId } = req.params;
  
  res.json({
    success: true,
    data: null,
    llm_context: `USFL team roster for team ${teamId} - implementation pending`,
    metadata: {
      sport: 'usfl',
      dataType: 'roster',
      endpoint: `/api/usfl/teams/${teamId}/roster`,
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { teamId },
    },
  });
});

export default router;
