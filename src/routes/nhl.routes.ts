// src/routes/nhl.routes.ts
import { Router, Request, Response } from 'express';
import nhlService from '../services/nhl.service';

const router = Router();

// ============================================================================
// NHL Live Scores
// ============================================================================

/**
 * @route   GET /api/nhl/scores
 * @desc    Get NHL live scores
 * @access  Public
 */
router.get('/scores', async (_req: Request, res: Response) => {
  try {
    const data = await nhlService.getScores();

    res.json({
      success: true,
      data: data,
      llm_context: 'NHL live scores',
      metadata: {
        sport: 'nhl',
        dataType: 'scores',
        endpoint: '/api/nhl/scores',
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
        sport: 'nhl',
        dataType: 'scores',
        endpoint: '/api/nhl/scores',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/nhl/scores/:date
 * @desc    Get NHL box scores for a specific date
 * @access  Public
 * @param   date - Date in dd.MM.yyyy format
 */
router.get('/scores/:date', async (req: Request, res: Response) => {
  const { date } = req.params;

  try {
    const data = await nhlService.getScoresByDate(date);

    res.json({
      success: true,
      data: data,
      llm_context: `NHL box scores for ${date}`,
      metadata: {
        sport: 'nhl',
        dataType: 'scores',
        endpoint: `/api/nhl/scores/${date}`,
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
        sport: 'nhl',
        dataType: 'scores',
        endpoint: `/api/nhl/scores/${date}`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { date },
      },
    });
  }
});

// ============================================================================
// NHL Play-by-Play
// ============================================================================

/**
 * @route   GET /api/nhl/play-by-play
 * @desc    Get NHL live play-by-play
 * @access  Public
 */
router.get('/play-by-play', async (_req: Request, res: Response) => {
  try {
    const data = await nhlService.getPlayByPlay();

    res.json({
      success: true,
      data: data,
      llm_context: 'NHL live play-by-play',
      metadata: {
        sport: 'nhl',
        dataType: 'play-by-play',
        endpoint: '/api/nhl/play-by-play',
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
        sport: 'nhl',
        dataType: 'play-by-play',
        endpoint: '/api/nhl/play-by-play',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

// ============================================================================
// NHL Schedule
// ============================================================================

/**
 * @route   GET /api/nhl/schedule
 * @desc    Get NHL schedule
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

    const data = await nhlService.getSchedule(options);

    res.json({
      success: true,
      data: data,
      llm_context: 'NHL schedule',
      metadata: {
        sport: 'nhl',
        dataType: 'schedule',
        endpoint: '/api/nhl/schedule',
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
        sport: 'nhl',
        dataType: 'schedule',
        endpoint: '/api/nhl/schedule',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { showOdds, date1, date2, bm, market },
      },
    });
  }
});

// ============================================================================
// NHL Standings
// ============================================================================

/**
 * @route   GET /api/nhl/standings
 * @desc    Get NHL standings
 * @access  Public
 */
router.get('/standings', async (_req: Request, res: Response) => {
  try {
    const data = await nhlService.getStandings();

    res.json({
      success: true,
      data: data,
      llm_context: 'NHL standings',
      metadata: {
        sport: 'nhl',
        dataType: 'standings',
        endpoint: '/api/nhl/standings',
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
        sport: 'nhl',
        dataType: 'standings',
        endpoint: '/api/nhl/standings',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

// ============================================================================
// NHL Team Data
// ============================================================================

/**
 * @route   GET /api/nhl/teams/:teamId/roster
 * @desc    Get NHL team roster
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/roster', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await nhlService.getTeamRoster(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `NHL team roster for team ${teamId}`,
      metadata: {
        sport: 'nhl',
        dataType: 'roster',
        endpoint: `/api/nhl/teams/${teamId}/roster`,
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
        sport: 'nhl',
        dataType: 'roster',
        endpoint: `/api/nhl/teams/${teamId}/roster`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

/**
 * @route   GET /api/nhl/teams/:teamId/player-stats
 * @desc    Get NHL team player stats
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/player-stats', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await nhlService.getTeamPlayerStats(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `NHL player stats for team ${teamId}`,
      metadata: {
        sport: 'nhl',
        dataType: 'player-stats',
        endpoint: `/api/nhl/teams/${teamId}/player-stats`,
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
        sport: 'nhl',
        dataType: 'player-stats',
        endpoint: `/api/nhl/teams/${teamId}/player-stats`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

/**
 * @route   GET /api/nhl/teams/:teamId/team-stats
 * @desc    Get NHL team overall stats
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/team-stats', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await nhlService.getTeamStats(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `NHL team overall stats for team ${teamId}`,
      metadata: {
        sport: 'nhl',
        dataType: 'team-stats',
        endpoint: `/api/nhl/teams/${teamId}/team-stats`,
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
        sport: 'nhl',
        dataType: 'team-stats',
        endpoint: `/api/nhl/teams/${teamId}/team-stats`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

/**
 * @route   GET /api/nhl/teams/:teamId/injuries
 * @desc    Get NHL team injury reports
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/injuries', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await nhlService.getTeamInjuries(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `NHL injury report for team ${teamId}`,
      metadata: {
        sport: 'nhl',
        dataType: 'injuries',
        endpoint: `/api/nhl/teams/${teamId}/injuries`,
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
        sport: 'nhl',
        dataType: 'injuries',
        endpoint: `/api/nhl/teams/${teamId}/injuries`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

// ============================================================================
// NHL Player Data
// ============================================================================

/**
 * @route   GET /api/nhl/players/:playerId/image
 * @desc    Get NHL player headshot image (base64)
 * @access  Public
 * @param   playerId - Player ID
 */
router.get('/players/:playerId/image', async (req: Request, res: Response) => {
  const { playerId } = req.params;

  try {
    const data = await nhlService.getPlayerImage(playerId);

    res.json({
      success: true,
      data: data,
      llm_context: `NHL player image for player ${playerId}`,
      metadata: {
        sport: 'nhl',
        dataType: 'player-image',
        endpoint: `/api/nhl/players/${playerId}/image`,
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
        sport: 'nhl',
        dataType: 'player-image',
        endpoint: `/api/nhl/players/${playerId}/image`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { playerId },
      },
    });
  }
});

// ============================================================================
// NHL Head-to-Head
// ============================================================================

/**
 * @route   GET /api/nhl/h2h/:teamId1/:teamId2
 * @desc    Get NHL head-to-head comparison between two teams
 * @access  Public
 * @param   teamId1 - First team ID
 * @param   teamId2 - Second team ID
 */
router.get('/h2h/:teamId1/:teamId2', async (req: Request, res: Response) => {
  const { teamId1, teamId2 } = req.params;

  try {
    const data = await nhlService.getH2H(teamId1, teamId2);

    res.json({
      success: true,
      data: data,
      llm_context: `NHL H2H comparison: team ${teamId1} vs team ${teamId2}`,
      metadata: {
        sport: 'nhl',
        dataType: 'h2h',
        endpoint: `/api/nhl/h2h/${teamId1}/${teamId2}`,
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
        sport: 'nhl',
        dataType: 'h2h',
        endpoint: `/api/nhl/h2h/${teamId1}/${teamId2}`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId1, teamId2 },
      },
    });
  }
});

export default router;
