// src/routes/nfl.routes.ts
import { Router, Request, Response } from 'express';
import nflService from '../services/nfl.service';

const router = Router();

// ============================================================================
// NFL Live Scores
// ============================================================================

/**
 * @route   GET /api/nfl/scores
 * @desc    Get NFL live scores for current week
 * @access  Public
 * @query   json=1 (optional) - Return JSON format
 */
router.get('/scores', async (req: Request, res: Response) => {
  try {
    const jsonFormat = req.query.json !== '0'; // Default to JSON unless explicitly disabled
    const data = await nflService.getScores(jsonFormat);

    res.json({
      success: true,
      data: data,
      llm_context: 'NFL live scores for current week',
      metadata: {
        sport: 'nfl',
        dataType: 'scores',
        endpoint: '/api/nfl/scores',
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
        sport: 'nfl',
        dataType: 'scores',
        endpoint: '/api/nfl/scores',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/nfl/scores/:date
 * @desc    Get NFL box scores for a specific date
 * @access  Public
 * @param   date - Date in dd.MM.yyyy format
 */
router.get('/scores/:date', async (req: Request, res: Response) => {
  const { date } = req.params;
  
  res.json({
    success: true,
    data: null,
    llm_context: `NFL box scores for ${date} - implementation pending`,
    metadata: {
      sport: 'nfl',
      dataType: 'scores',
      endpoint: `/api/nfl/scores/${date}`,
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { date },
    },
  });
});

// ============================================================================
// NFL Play-by-Play
// ============================================================================

/**
 * @route   GET /api/nfl/play-by-play
 * @desc    Get NFL live play-by-play for current games
 * @access  Public
 */
router.get('/play-by-play', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'NFL live play-by-play endpoint - implementation pending',
    metadata: {
      sport: 'nfl',
      dataType: 'play-by-play',
      endpoint: '/api/nfl/play-by-play',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

/**
 * @route   GET /api/nfl/play-by-play/:date
 * @desc    Get NFL play-by-play for a specific date
 * @access  Public
 * @param   date - Date in dd.MM.yyyy format (append _pbp)
 */
router.get('/play-by-play/:date', async (req: Request, res: Response) => {
  const { date } = req.params;
  
  res.json({
    success: true,
    data: null,
    llm_context: `NFL play-by-play for ${date} - implementation pending`,
    metadata: {
      sport: 'nfl',
      dataType: 'play-by-play',
      endpoint: `/api/nfl/play-by-play/${date}`,
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { date },
    },
  });
});

// ============================================================================
// NFL Schedule
// ============================================================================

/**
 * @route   GET /api/nfl/schedule
 * @desc    Get NFL schedule
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
    llm_context: 'NFL schedule endpoint - implementation pending',
    metadata: {
      sport: 'nfl',
      dataType: 'schedule',
      endpoint: '/api/nfl/schedule',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { showOdds, date1, date2, bm, market },
    },
  });
});

// ============================================================================
// NFL Standings
// ============================================================================

/**
 * @route   GET /api/nfl/standings
 * @desc    Get NFL division standings
 * @access  Public
 */
router.get('/standings', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: null,
    llm_context: 'NFL division standings endpoint - implementation pending',
    metadata: {
      sport: 'nfl',
      dataType: 'standings',
      endpoint: '/api/nfl/standings',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

// ============================================================================
// NFL Team Data
// ============================================================================

/**
 * @route   GET /api/nfl/teams/:teamId/roster
 * @desc    Get NFL team roster and logo
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/roster', async (req: Request, res: Response) => {
  const { teamId } = req.params;
  
  res.json({
    success: true,
    data: null,
    llm_context: `NFL team roster for team ${teamId} - implementation pending`,
    metadata: {
      sport: 'nfl',
      dataType: 'roster',
      endpoint: `/api/nfl/teams/${teamId}/roster`,
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { teamId },
    },
  });
});

/**
 * @route   GET /api/nfl/teams/:teamId/player-stats
 * @desc    Get NFL team player season stats
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/player-stats', async (req: Request, res: Response) => {
  const { teamId } = req.params;
  
  res.json({
    success: true,
    data: null,
    llm_context: `NFL player stats for team ${teamId} - implementation pending`,
    metadata: {
      sport: 'nfl',
      dataType: 'player-stats',
      endpoint: `/api/nfl/teams/${teamId}/player-stats`,
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { teamId },
    },
  });
});

/**
 * @route   GET /api/nfl/teams/:teamId/team-stats
 * @desc    Get NFL team season overall stats
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/team-stats', async (req: Request, res: Response) => {
  const { teamId } = req.params;
  
  res.json({
    success: true,
    data: null,
    llm_context: `NFL team stats for team ${teamId} - implementation pending`,
    metadata: {
      sport: 'nfl',
      dataType: 'team-stats',
      endpoint: `/api/nfl/teams/${teamId}/team-stats`,
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { teamId },
    },
  });
});

/**
 * @route   GET /api/nfl/teams/:teamId/injuries
 * @desc    Get NFL team injury reports
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/injuries', async (req: Request, res: Response) => {
  const { teamId } = req.params;
  
  res.json({
    success: true,
    data: null,
    llm_context: `NFL injury report for team ${teamId} - implementation pending`,
    metadata: {
      sport: 'nfl',
      dataType: 'injuries',
      endpoint: `/api/nfl/teams/${teamId}/injuries`,
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { teamId },
    },
  });
});

// ============================================================================
// NFL Player Data
// ============================================================================

/**
 * @route   GET /api/nfl/players/:playerId/image
 * @desc    Get NFL player headshot image (base64)
 * @access  Public
 * @param   playerId - Player ID
 */
router.get('/players/:playerId/image', async (req: Request, res: Response) => {
  const { playerId } = req.params;
  
  res.json({
    success: true,
    data: null,
    llm_context: `NFL player image for player ${playerId} - implementation pending`,
    metadata: {
      sport: 'nfl',
      dataType: 'player-image',
      endpoint: `/api/nfl/players/${playerId}/image`,
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { playerId },
    },
  });
});

// ============================================================================
// NFL Head-to-Head
// ============================================================================

/**
 * @route   GET /api/nfl/h2h/:teamId1/:teamId2
 * @desc    Get NFL head-to-head comparison between two teams
 * @access  Public
 * @param   teamId1 - First team ID
 * @param   teamId2 - Second team ID
 */
router.get('/h2h/:teamId1/:teamId2', async (req: Request, res: Response) => {
  const { teamId1, teamId2 } = req.params;
  
  res.json({
    success: true,
    data: null,
    llm_context: `NFL H2H comparison: team ${teamId1} vs team ${teamId2} - implementation pending`,
    metadata: {
      sport: 'nfl',
      dataType: 'h2h',
      endpoint: `/api/nfl/h2h/${teamId1}/${teamId2}`,
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
      params: { teamId1, teamId2 },
    },
  });
});

export default router;
