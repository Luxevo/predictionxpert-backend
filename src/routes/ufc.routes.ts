// src/routes/ufc.routes.ts
import { Router, Request, Response } from 'express';

const router = Router();

// ============================================================================
// UFC Schedule
// ============================================================================

/**
 * @route   GET /api/ufc/schedule
 * @desc    Get UFC fight schedule
 * @access  Public
 * @query   showOdds - Include betting odds
 * @query   date1 - Start date (dd.MM.yyyy)
 * @query   date2 - End date (dd.MM.yyyy)
 * @query   bm - Bookmaker IDs (comma-separated)
 * @query   market - Market IDs (comma-separated)
 */
router.get('/schedule', async (req: Request, res: Response) => {
  const { showOdds, date1, date2, bm, market } = req.query;
  
  res.json({
    success: true,
    data: null,
    llm_context: 'UFC schedule endpoint - implementation pending',
    metadata: {
      sport: 'ufc',
      dataType: 'schedule',
      endpoint: '/api/ufc/schedule',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { showOdds, date1, date2, bm, market },
    },
  });
});

// ============================================================================
// UFC Live Scores / Fight Stats
// ============================================================================

/**
 * @route   GET /api/ufc/live
 * @desc    Get UFC live fight stats
 * @access  Public
 */
router.get('/live', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'UFC live fight stats endpoint - implementation pending',
    metadata: {
      sport: 'ufc',
      dataType: 'scores',
      endpoint: '/api/ufc/live',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

/**
 * @route   GET /api/ufc/live/:date
 * @desc    Get UFC fight results for a specific date
 * @access  Public
 * @param   date - Date in dd.MM.yyyy format
 * @note    Historical data available since 1993 (first UFC event)
 */
router.get('/live/:date', async (req: Request, res: Response) => {
  const { date } = req.params;
  
  res.json({
    success: true,
    data: null,
    llm_context: `UFC fight results for ${date} - implementation pending`,
    metadata: {
      sport: 'ufc',
      dataType: 'scores',
      endpoint: `/api/ufc/live/${date}`,
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { date },
    },
  });
});

// ============================================================================
// UFC Fighter Data
// ============================================================================

/**
 * @route   GET /api/ufc/fighters
 * @desc    Get list of UFC fighters
 * @access  Public
 */
router.get('/fighters', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'UFC fighters list endpoint - implementation pending',
    metadata: {
      sport: 'ufc',
      dataType: 'roster',
      endpoint: '/api/ufc/fighters',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

/**
 * @route   GET /api/ufc/fighters/:fighterId
 * @desc    Get UFC fighter profile with bio, stats, and headshot
 * @access  Public
 * @param   fighterId - Fighter ID
 */
router.get('/fighters/:fighterId', async (req: Request, res: Response) => {
  const { fighterId } = req.params;
  
  res.json({
    success: true,
    data: null,
    llm_context: `UFC fighter profile for fighter ${fighterId} - implementation pending`,
    metadata: {
      sport: 'ufc',
      dataType: 'player-stats',
      endpoint: `/api/ufc/fighters/${fighterId}`,
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { fighterId },
    },
  });
});

// ============================================================================
// UFC Betting Data
// ============================================================================

/**
 * @route   GET /api/ufc/odds/markets
 * @desc    Get available UFC betting markets
 * @access  Public
 */
router.get('/odds/markets', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'UFC betting markets dictionary - implementation pending',
    metadata: {
      sport: 'ufc',
      dataType: 'odds',
      endpoint: '/api/ufc/odds/markets',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

/**
 * @route   GET /api/ufc/odds/bookmakers
 * @desc    Get available UFC bookmakers
 * @access  Public
 */
router.get('/odds/bookmakers', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'UFC bookmakers dictionary - implementation pending',
    metadata: {
      sport: 'ufc',
      dataType: 'odds',
      endpoint: '/api/ufc/odds/bookmakers',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

export default router;
