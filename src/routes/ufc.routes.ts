// src/routes/ufc.routes.ts
import { Router, Request, Response } from 'express';
import ufcService from '../services/ufc.service';

const router = Router();

// ============================================================================
// UFC Live Scores
// ============================================================================

/**
 * @route   GET /api/ufc/scores
 * @desc    Get UFC live scores
 * @access  Public
 */
router.get('/scores', async (_req: Request, res: Response) => {
  try {
    const data = await ufcService.getScores();

    res.json({
      success: true,
      data: data,
      llm_context: 'UFC live scores',
      metadata: {
        sport: 'ufc',
        dataType: 'scores',
        endpoint: '/api/ufc/scores',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      success: false,
      error: {
        code: 'GOALSERVE_API_ERROR',
        message: errorMessage,
      },
      metadata: {
        sport: 'ufc',
        dataType: 'scores',
        endpoint: '/api/ufc/scores',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

// ============================================================================
// UFC Schedule
// ============================================================================

/**
 * @route   GET /api/ufc/schedule
 * @desc    Get UFC schedule
 * @access  Public
 * @query   showOdds - Include betting odds
 * @query   date1 - Start date (dd.MM.yyyy)
 * @query   date2 - End date (dd.MM.yyyy)
 * @query   bm - Bookmaker IDs (comma-separated)
 * @query   market - Market IDs (comma-separated)
 */
router.get('/schedule', async (req: Request, res: Response) => {
  const { showOdds, date1, date2, bm, market } = req.query;

  try {
    const options: {
      showOdds?: boolean;
      date1?: string;
      date2?: string;
      bm?: string;
      market?: string;
    } = {};

    if (showOdds === '1' || showOdds === 'true') {
      options.showOdds = true;
    }
    if (date1) {
      options.date1 = date1 as string;
    }
    if (date2) {
      options.date2 = date2 as string;
    }
    if (bm) {
      options.bm = bm as string;
    }
    if (market) {
      options.market = market as string;
    }

    const data = await ufcService.getSchedule(options);

    res.json({
      success: true,
      data: data,
      llm_context: 'UFC schedule',
      metadata: {
        sport: 'ufc',
        dataType: 'schedule',
        endpoint: '/api/ufc/schedule',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { showOdds, date1, date2, bm, market },
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      success: false,
      error: {
        code: 'GOALSERVE_API_ERROR',
        message: errorMessage,
      },
      metadata: {
        sport: 'ufc',
        dataType: 'schedule',
        endpoint: '/api/ufc/schedule',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { showOdds, date1, date2, bm, market },
      },
    });
  }
});

/**
 * @route   GET /api/ufc/scores/:date
 * @desc    Get UFC fight results for a specific date
 * @access  Public
 * @param   date - Date in dd.MM.yyyy format
 */
router.get('/scores/:date', async (req: Request, res: Response) => {
  const { date } = req.params;

  try {
    const data = await ufcService.getScoresByDate(date);

    res.json({
      success: true,
      data: data,
      llm_context: `UFC fight results for ${date}`,
      metadata: {
        sport: 'ufc',
        dataType: 'scores',
        endpoint: `/api/ufc/scores/${date}`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { date },
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      success: false,
      error: {
        code: 'GOALSERVE_API_ERROR',
        message: errorMessage,
      },
      metadata: {
        sport: 'ufc',
        dataType: 'scores',
        endpoint: `/api/ufc/scores/${date}`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { date },
      },
    });
  }
});

// ============================================================================
// UFC Fighter Data
// ============================================================================

/**
 * @route   GET /api/ufc/fighters
 * @desc    Get list of all UFC fighters
 * @access  Public
 */
router.get('/fighters', async (_req: Request, res: Response) => {
  try {
    const data = await ufcService.getFighters();

    res.json({
      success: true,
      data: data,
      llm_context: 'UFC fighters list',
      metadata: {
        sport: 'ufc',
        dataType: 'fighters',
        endpoint: '/api/ufc/fighters',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      success: false,
      error: {
        code: 'GOALSERVE_API_ERROR',
        message: errorMessage,
      },
      metadata: {
        sport: 'ufc',
        dataType: 'fighters',
        endpoint: '/api/ufc/fighters',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/ufc/fighters/:fighterId/profile
 * @desc    Get UFC fighter profile
 * @access  Public
 * @param   fighterId - Fighter ID
 */
router.get('/fighters/:fighterId/profile', async (req: Request, res: Response) => {
  const { fighterId } = req.params;

  try {
    const data = await ufcService.getFighterProfile(fighterId);

    res.json({
      success: true,
      data: data,
      llm_context: `UFC fighter profile for fighter ${fighterId}`,
      metadata: {
        sport: 'ufc',
        dataType: 'fighter-profile',
        endpoint: `/api/ufc/fighters/${fighterId}/profile`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { fighterId },
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      success: false,
      error: {
        code: 'GOALSERVE_API_ERROR',
        message: errorMessage,
      },
      metadata: {
        sport: 'ufc',
        dataType: 'fighter-profile',
        endpoint: `/api/ufc/fighters/${fighterId}/profile`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { fighterId },
      },
    });
  }
});

export default router;
