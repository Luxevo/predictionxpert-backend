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
 */
router.get('/scores', async (_req: Request, res: Response) => {
  try {
    const data = await nflService.getScores();

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

  try {
    const data = await nflService.getScoresByDate(date);

    res.json({
      success: true,
      data: data,
      llm_context: `NFL box scores for ${date}`,
      metadata: {
        sport: 'nfl',
        dataType: 'scores',
        endpoint: `/api/nfl/scores/${date}`,
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
        sport: 'nfl',
        dataType: 'scores',
        endpoint: `/api/nfl/scores/${date}`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { date },
      },
    });
  }
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
  try {
    const data = await nflService.getPlayByPlay();

    res.json({
      success: true,
      data: data,
      llm_context: 'NFL live play-by-play for current games',
      metadata: {
        sport: 'nfl',
        dataType: 'play-by-play',
        endpoint: '/api/nfl/play-by-play',
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
        dataType: 'play-by-play',
        endpoint: '/api/nfl/play-by-play',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
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

    const data = await nflService.getSchedule(options);

    res.json({
      success: true,
      data: data,
      llm_context: 'NFL schedule',
      metadata: {
        sport: 'nfl',
        dataType: 'schedule',
        endpoint: '/api/nfl/schedule',
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
        sport: 'nfl',
        dataType: 'schedule',
        endpoint: '/api/nfl/schedule',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { showOdds, date1, date2, bm, market },
      },
    });
  }
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
  try {
    const data = await nflService.getStandings();

    res.json({
      success: true,
      data: data,
      llm_context: 'NFL division standings',
      metadata: {
        sport: 'nfl',
        dataType: 'standings',
        endpoint: '/api/nfl/standings',
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
        dataType: 'standings',
        endpoint: '/api/nfl/standings',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
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

  try {
    const data = await nflService.getTeamRoster(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `NFL team roster for team ${teamId}`,
      metadata: {
        sport: 'nfl',
        dataType: 'roster',
        endpoint: `/api/nfl/teams/${teamId}/roster`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
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
        dataType: 'roster',
        endpoint: `/api/nfl/teams/${teamId}/roster`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

/**
 * @route   GET /api/nfl/teams/:teamId/player-stats
 * @desc    Get NFL team player season stats
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/player-stats', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await nflService.getTeamPlayerStats(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `NFL player stats for team ${teamId}`,
      metadata: {
        sport: 'nfl',
        dataType: 'player-stats',
        endpoint: `/api/nfl/teams/${teamId}/player-stats`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
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
        dataType: 'player-stats',
        endpoint: `/api/nfl/teams/${teamId}/player-stats`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

/**
 * @route   GET /api/nfl/teams/:teamId/injuries
 * @desc    Get NFL team injury reports
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/injuries', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await nflService.getTeamInjuries(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `NFL injury report for team ${teamId}`,
      metadata: {
        sport: 'nfl',
        dataType: 'injuries',
        endpoint: `/api/nfl/teams/${teamId}/injuries`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
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
        dataType: 'injuries',
        endpoint: `/api/nfl/teams/${teamId}/injuries`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
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

  try {
    const data = await nflService.getPlayerImage(playerId);

    res.json({
      success: true,
      data: data,
      llm_context: `NFL player image for player ${playerId}`,
      metadata: {
        sport: 'nfl',
        dataType: 'player-image',
        endpoint: `/api/nfl/players/${playerId}/image`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { playerId },
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
        dataType: 'player-image',
        endpoint: `/api/nfl/players/${playerId}/image`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { playerId },
      },
    });
  }
});

// ============================================================================
// NFL Coverage & H2H
// ============================================================================

/**
 * @route   GET /api/nfl/coverage
 * @desc    Get available NFL leagues/tournaments with IDs
 * @access  Public
 */
router.get('/coverage', async (_req: Request, res: Response) => {
  try {
    const data = await nflService.getCoverage();

    res.json({
      success: true,
      data: data,
      llm_context: 'NFL coverage - available leagues and tournaments',
      metadata: {
        sport: 'nfl',
        dataType: 'coverage',
        endpoint: '/api/nfl/coverage',
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
        dataType: 'coverage',
        endpoint: '/api/nfl/coverage',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/nfl/teams/:teamId/stats
 * @desc    Get NFL team season stats (overall team statistics)
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/stats', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await nflService.getTeamStats(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `NFL team season stats for team ${teamId}`,
      metadata: {
        sport: 'nfl',
        dataType: 'team-stats',
        endpoint: `/api/nfl/teams/${teamId}/stats`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
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
        dataType: 'team-stats',
        endpoint: `/api/nfl/teams/${teamId}/stats`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

/**
 * @route   GET /api/nfl/h2h/:teamId1/:teamId2
 * @desc    Get head-to-head comparison between two NFL teams
 * @access  Public
 * @param   teamId1 - First team ID
 * @param   teamId2 - Second team ID
 */
router.get('/h2h/:teamId1/:teamId2', async (req: Request, res: Response) => {
  const { teamId1, teamId2 } = req.params;

  try {
    const data = await nflService.getH2H(teamId1, teamId2);

    res.json({
      success: true,
      data: data,
      llm_context: `NFL head-to-head comparison between teams ${teamId1} and ${teamId2}`,
      metadata: {
        sport: 'nfl',
        dataType: 'h2h',
        endpoint: `/api/nfl/h2h/${teamId1}/${teamId2}`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId1, teamId2 },
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
        dataType: 'h2h',
        endpoint: `/api/nfl/h2h/${teamId1}/${teamId2}`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId1, teamId2 },
      },
    });
  }
});

export default router;
