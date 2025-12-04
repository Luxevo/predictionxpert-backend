// src/routes/nba.routes.ts
import { Router, Request, Response } from 'express';
import nbaService from '../services/nba.service';

const router = Router();

// ============================================================================
// NBA Live Scores
// ============================================================================

/**
 * @route   GET /api/nba/scores
 * @desc    Get NBA live scores
 * @access  Public
 */
router.get('/scores', async (_req: Request, res: Response) => {
  try {
    const data = await nbaService.getScores();

    res.json({
      success: true,
      data: data,
      llm_context: 'NBA live scores',
      metadata: {
        sport: 'nba',
        dataType: 'scores',
        endpoint: '/api/nba/scores',
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
        sport: 'nba',
        dataType: 'scores',
        endpoint: '/api/nba/scores',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/nba/scores/:date
 * @desc    Get NBA box scores for a specific date
 * @access  Public
 * @param   date - Date in dd.MM.yyyy format
 */
router.get('/scores/:date', async (req: Request, res: Response) => {
  const { date } = req.params;

  try {
    const data = await nbaService.getScoresByDate(date);

    res.json({
      success: true,
      data: data,
      llm_context: `NBA box scores for ${date}`,
      metadata: {
        sport: 'nba',
        dataType: 'scores',
        endpoint: `/api/nba/scores/${date}`,
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
        sport: 'nba',
        dataType: 'scores',
        endpoint: `/api/nba/scores/${date}`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { date },
      },
    });
  }
});

// ============================================================================
// NBA Play-by-Play
// ============================================================================

/**
 * @route   GET /api/nba/play-by-play
 * @desc    Get NBA live play-by-play / commentaries
 * @access  Public
 */
router.get('/play-by-play', async (_req: Request, res: Response) => {
  try {
    const data = await nbaService.getPlayByPlay();

    res.json({
      success: true,
      data: data,
      llm_context: 'NBA live play-by-play',
      metadata: {
        sport: 'nba',
        dataType: 'play-by-play',
        endpoint: '/api/nba/play-by-play',
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
        sport: 'nba',
        dataType: 'play-by-play',
        endpoint: '/api/nba/play-by-play',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

// ============================================================================
// NBA Schedule
// ============================================================================

/**
 * @route   GET /api/nba/schedule
 * @desc    Get NBA schedule
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

    const data = await nbaService.getSchedule(options);

    res.json({
      success: true,
      data: data,
      llm_context: 'NBA schedule',
      metadata: {
        sport: 'nba',
        dataType: 'schedule',
        endpoint: '/api/nba/schedule',
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
        sport: 'nba',
        dataType: 'schedule',
        endpoint: '/api/nba/schedule',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { showOdds, date1, date2, bm, market },
      },
    });
  }
});

// ============================================================================
// NBA Standings
// ============================================================================

/**
 * @route   GET /api/nba/standings
 * @desc    Get NBA division standings
 * @access  Public
 */
router.get('/standings', async (_req: Request, res: Response) => {
  try {
    const data = await nbaService.getStandings();

    res.json({
      success: true,
      data: data,
      llm_context: 'NBA division standings',
      metadata: {
        sport: 'nba',
        dataType: 'standings',
        endpoint: '/api/nba/standings',
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
        sport: 'nba',
        dataType: 'standings',
        endpoint: '/api/nba/standings',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/nba/standings/conference
 * @desc    Get NBA conference standings
 * @access  Public
 */
router.get('/standings/conference', async (_req: Request, res: Response) => {
  try {
    const data = await nbaService.getStandingsConference();

    res.json({
      success: true,
      data: data,
      llm_context: 'NBA conference standings',
      metadata: {
        sport: 'nba',
        dataType: 'standings',
        endpoint: '/api/nba/standings/conference',
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
        sport: 'nba',
        dataType: 'standings',
        endpoint: '/api/nba/standings/conference',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

// ============================================================================
// NBA Team Data
// ============================================================================

/**
 * @route   GET /api/nba/teams/:teamId/roster
 * @desc    Get NBA team roster and logo
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/roster', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await nbaService.getTeamRoster(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `NBA team roster for team ${teamId}`,
      metadata: {
        sport: 'nba',
        dataType: 'roster',
        endpoint: `/api/nba/teams/${teamId}/roster`,
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
        sport: 'nba',
        dataType: 'roster',
        endpoint: `/api/nba/teams/${teamId}/roster`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

/**
 * @route   GET /api/nba/teams/:teamId/player-stats
 * @desc    Get NBA team player season stats
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/player-stats', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await nbaService.getTeamPlayerStats(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `NBA player stats for team ${teamId}`,
      metadata: {
        sport: 'nba',
        dataType: 'player-stats',
        endpoint: `/api/nba/teams/${teamId}/player-stats`,
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
        sport: 'nba',
        dataType: 'player-stats',
        endpoint: `/api/nba/teams/${teamId}/player-stats`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

/**
 * @route   GET /api/nba/teams/:teamId/team-stats
 * @desc    Get NBA team season overall stats
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/team-stats', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await nbaService.getTeamStats(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `NBA team stats for team ${teamId}`,
      metadata: {
        sport: 'nba',
        dataType: 'team-stats',
        endpoint: `/api/nba/teams/${teamId}/team-stats`,
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
        sport: 'nba',
        dataType: 'team-stats',
        endpoint: `/api/nba/teams/${teamId}/team-stats`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

/**
 * @route   GET /api/nba/teams/:teamId/injuries
 * @desc    Get NBA team injury reports
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/injuries', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await nbaService.getTeamInjuries(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `NBA injury report for team ${teamId}`,
      metadata: {
        sport: 'nba',
        dataType: 'injuries',
        endpoint: `/api/nba/teams/${teamId}/injuries`,
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
        sport: 'nba',
        dataType: 'injuries',
        endpoint: `/api/nba/teams/${teamId}/injuries`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

// ============================================================================
// NBA Player Data
// ============================================================================

/**
 * @route   GET /api/nba/players/:playerId/image
 * @desc    Get NBA player headshot image (base64)
 * @access  Public
 * @param   playerId - Player ID
 */
router.get('/players/:playerId/image', async (req: Request, res: Response) => {
  const { playerId } = req.params;

  try {
    const data = await nbaService.getPlayerImage(playerId);

    res.json({
      success: true,
      data: data,
      llm_context: `NBA player image for player ${playerId}`,
      metadata: {
        sport: 'nba',
        dataType: 'player-image',
        endpoint: `/api/nba/players/${playerId}/image`,
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
        sport: 'nba',
        dataType: 'player-image',
        endpoint: `/api/nba/players/${playerId}/image`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { playerId },
      },
    });
  }
});

// ============================================================================
// NBA Head-to-Head
// ============================================================================

/**
 * @route   GET /api/nba/h2h/:teamId1/:teamId2
 * @desc    Get NBA head-to-head comparison between two teams
 * @access  Public
 * @param   teamId1 - First team ID
 * @param   teamId2 - Second team ID
 */
router.get('/h2h/:teamId1/:teamId2', async (req: Request, res: Response) => {
  const { teamId1, teamId2 } = req.params;

  try {
    const data = await nbaService.getH2H(teamId1, teamId2);

    res.json({
      success: true,
      data: data,
      llm_context: `NBA H2H comparison: team ${teamId1} vs team ${teamId2}`,
      metadata: {
        sport: 'nba',
        dataType: 'h2h',
        endpoint: `/api/nba/h2h/${teamId1}/${teamId2}`,
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
        sport: 'nba',
        dataType: 'h2h',
        endpoint: `/api/nba/h2h/${teamId1}/${teamId2}`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId1, teamId2 },
      },
    });
  }
});

export default router;
