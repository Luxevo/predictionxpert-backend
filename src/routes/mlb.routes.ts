// src/routes/mlb.routes.ts
import { Router, Request, Response } from 'express';
import mlbService from '../services/mlb.service';

const router = Router();

// ============================================================================
// MLB Live Scores
// ============================================================================

/**
 * @route   GET /api/mlb/scores
 * @desc    Get MLB live scores
 * @access  Public
 */
router.get('/scores', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getScores();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB live scores',
      metadata: {
        sport: 'mlb',
        dataType: 'scores',
        endpoint: '/api/mlb/scores',
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
        sport: 'mlb',
        dataType: 'scores',
        endpoint: '/api/mlb/scores',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/mlb/scores/:date
 * @desc    Get MLB box scores for a specific date
 * @access  Public
 * @param   date - Date in dd.MM.yyyy format
 */
router.get('/scores/:date', async (req: Request, res: Response) => {
  const { date } = req.params;

  try {
    const data = await mlbService.getScoresByDate(date);

    res.json({
      success: true,
      data: data,
      llm_context: `MLB box scores for ${date}`,
      metadata: {
        sport: 'mlb',
        dataType: 'scores',
        endpoint: `/api/mlb/scores/${date}`,
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
        sport: 'mlb',
        dataType: 'scores',
        endpoint: `/api/mlb/scores/${date}`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { date },
      },
    });
  }
});

// ============================================================================
// MLB Play-by-Play
// ============================================================================

/**
 * @route   GET /api/mlb/play-by-play
 * @desc    Get MLB live play-by-play
 * @access  Public
 */
router.get('/play-by-play', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getPlayByPlay();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB live play-by-play',
      metadata: {
        sport: 'mlb',
        dataType: 'play-by-play',
        endpoint: '/api/mlb/play-by-play',
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
        sport: 'mlb',
        dataType: 'play-by-play',
        endpoint: '/api/mlb/play-by-play',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

// ============================================================================
// MLB Schedule
// ============================================================================

/**
 * @route   GET /api/mlb/schedule
 * @desc    Get MLB schedule
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

    const data = await mlbService.getSchedule(options);

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB schedule',
      metadata: {
        sport: 'mlb',
        dataType: 'schedule',
        endpoint: '/api/mlb/schedule',
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
        sport: 'mlb',
        dataType: 'schedule',
        endpoint: '/api/mlb/schedule',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { showOdds, date1, date2, bm, market },
      },
    });
  }
});

// ============================================================================
// MLB Standings
// ============================================================================

/**
 * @route   GET /api/mlb/standings
 * @desc    Get MLB standings
 * @access  Public
 */
router.get('/standings', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getStandings();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB standings',
      metadata: {
        sport: 'mlb',
        dataType: 'standings',
        endpoint: '/api/mlb/standings',
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
        sport: 'mlb',
        dataType: 'standings',
        endpoint: '/api/mlb/standings',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

// ============================================================================
// MLB Team Data
// ============================================================================

/**
 * @route   GET /api/mlb/teams/:teamId/roster
 * @desc    Get MLB team roster
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/roster', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await mlbService.getTeamRoster(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `MLB team roster for team ${teamId}`,
      metadata: {
        sport: 'mlb',
        dataType: 'roster',
        endpoint: `/api/mlb/teams/${teamId}/roster`,
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
        sport: 'mlb',
        dataType: 'roster',
        endpoint: `/api/mlb/teams/${teamId}/roster`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

/**
 * @route   GET /api/mlb/teams/:teamId/stats
 * @desc    Get MLB team season stats
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/stats', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await mlbService.getTeamStats(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `MLB team stats for team ${teamId}`,
      metadata: {
        sport: 'mlb',
        dataType: 'team-stats',
        endpoint: `/api/mlb/teams/${teamId}/stats`,
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
        sport: 'mlb',
        dataType: 'team-stats',
        endpoint: `/api/mlb/teams/${teamId}/stats`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

/**
 * @route   GET /api/mlb/teams/:teamId/batting-stats
 * @desc    Get MLB team batting stats
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/batting-stats', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await mlbService.getTeamBattingStats(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `MLB team batting stats for team ${teamId}`,
      metadata: {
        sport: 'mlb',
        dataType: 'batting-stats',
        endpoint: `/api/mlb/teams/${teamId}/batting-stats`,
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
        sport: 'mlb',
        dataType: 'batting-stats',
        endpoint: `/api/mlb/teams/${teamId}/batting-stats`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

/**
 * @route   GET /api/mlb/teams/:teamId/pitching-stats
 * @desc    Get MLB team pitching stats
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/pitching-stats', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await mlbService.getTeamPitchingStats(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `MLB team pitching stats for team ${teamId}`,
      metadata: {
        sport: 'mlb',
        dataType: 'pitching-stats',
        endpoint: `/api/mlb/teams/${teamId}/pitching-stats`,
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
        sport: 'mlb',
        dataType: 'pitching-stats',
        endpoint: `/api/mlb/teams/${teamId}/pitching-stats`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

/**
 * @route   GET /api/mlb/teams/:teamId/injuries
 * @desc    Get MLB team injury reports
 * @access  Public
 * @param   teamId - Team ID
 */
router.get('/teams/:teamId/injuries', async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const data = await mlbService.getTeamInjuries(teamId);

    res.json({
      success: true,
      data: data,
      llm_context: `MLB injury report for team ${teamId}`,
      metadata: {
        sport: 'mlb',
        dataType: 'injuries',
        endpoint: `/api/mlb/teams/${teamId}/injuries`,
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
        sport: 'mlb',
        dataType: 'injuries',
        endpoint: `/api/mlb/teams/${teamId}/injuries`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId },
      },
    });
  }
});

// ============================================================================
// MLB League Stats
// ============================================================================

/**
 * @route   GET /api/mlb/leaders
 * @desc    Get MLB stat leaders
 * @access  Public
 */
router.get('/leaders', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getLeaders();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB stat leaders',
      metadata: {
        sport: 'mlb',
        dataType: 'leaders',
        endpoint: '/api/mlb/leaders',
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
        sport: 'mlb',
        dataType: 'leaders',
        endpoint: '/api/mlb/leaders',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/mlb/transactions
 * @desc    Get MLB recent transactions
 * @access  Public
 */
router.get('/transactions', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getTransactions();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB recent transactions',
      metadata: {
        sport: 'mlb',
        dataType: 'transactions',
        endpoint: '/api/mlb/transactions',
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
        sport: 'mlb',
        dataType: 'transactions',
        endpoint: '/api/mlb/transactions',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

// ============================================================================
// MLB Player Data
// ============================================================================

/**
 * @route   GET /api/mlb/players/:playerId/image
 * @desc    Get MLB player headshot image (base64)
 * @access  Public
 * @param   playerId - Player ID
 */
router.get('/players/:playerId/image', async (req: Request, res: Response) => {
  const { playerId } = req.params;

  try {
    const data = await mlbService.getPlayerImage(playerId);

    res.json({
      success: true,
      data: data,
      llm_context: `MLB player image for player ${playerId}`,
      metadata: {
        sport: 'mlb',
        dataType: 'player-image',
        endpoint: `/api/mlb/players/${playerId}/image`,
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
        sport: 'mlb',
        dataType: 'player-image',
        endpoint: `/api/mlb/players/${playerId}/image`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { playerId },
      },
    });
  }
});

// ============================================================================
// MLB Head-to-Head
// ============================================================================

/**
 * @route   GET /api/mlb/h2h/:teamId1/:teamId2
 * @desc    Get MLB head-to-head comparison between two teams
 * @access  Public
 * @param   teamId1 - First team ID
 * @param   teamId2 - Second team ID
 */
router.get('/h2h/:teamId1/:teamId2', async (req: Request, res: Response) => {
  const { teamId1, teamId2 } = req.params;

  try {
    const data = await mlbService.getH2H(teamId1, teamId2);

    res.json({
      success: true,
      data: data,
      llm_context: `MLB H2H comparison: team ${teamId1} vs team ${teamId2}`,
      metadata: {
        sport: 'mlb',
        dataType: 'h2h',
        endpoint: `/api/mlb/h2h/${teamId1}/${teamId2}`,
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
        sport: 'mlb',
        dataType: 'h2h',
        endpoint: `/api/mlb/h2h/${teamId1}/${teamId2}`,
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
        params: { teamId1, teamId2 },
      },
    });
  }
});

// ============================================================================
// MLB League-Wide Stats
// ============================================================================

/**
 * @route   GET /api/mlb/stats/player-batting
 * @desc    Get MLB league-wide player batting stats
 * @access  Public
 */
router.get('/stats/player-batting', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getPlayerBattingStats();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB league-wide player batting stats',
      metadata: {
        sport: 'mlb',
        dataType: 'player-batting',
        endpoint: '/api/mlb/stats/player-batting',
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
        sport: 'mlb',
        dataType: 'player-batting',
        endpoint: '/api/mlb/stats/player-batting',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/mlb/stats/player-pitching
 * @desc    Get MLB league-wide player pitching stats
 * @access  Public
 */
router.get('/stats/player-pitching', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getPlayerPitchingStats();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB league-wide player pitching stats',
      metadata: {
        sport: 'mlb',
        dataType: 'player-pitching',
        endpoint: '/api/mlb/stats/player-pitching',
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
        sport: 'mlb',
        dataType: 'player-pitching',
        endpoint: '/api/mlb/stats/player-pitching',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/mlb/stats/player-fielding
 * @desc    Get MLB league-wide player fielding stats
 * @access  Public
 */
router.get('/stats/player-fielding', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getPlayerFieldingStats();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB league-wide player fielding stats',
      metadata: {
        sport: 'mlb',
        dataType: 'player-fielding',
        endpoint: '/api/mlb/stats/player-fielding',
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
        sport: 'mlb',
        dataType: 'player-fielding',
        endpoint: '/api/mlb/stats/player-fielding',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/mlb/stats/team-batting
 * @desc    Get MLB league-wide team batting stats
 * @access  Public
 */
router.get('/stats/team-batting', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getLeagueTeamBatting();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB league-wide team batting stats',
      metadata: {
        sport: 'mlb',
        dataType: 'team-batting',
        endpoint: '/api/mlb/stats/team-batting',
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
        sport: 'mlb',
        dataType: 'team-batting',
        endpoint: '/api/mlb/stats/team-batting',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/mlb/stats/team-pitching
 * @desc    Get MLB league-wide team pitching stats
 * @access  Public
 */
router.get('/stats/team-pitching', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getLeagueTeamPitching();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB league-wide team pitching stats',
      metadata: {
        sport: 'mlb',
        dataType: 'team-pitching',
        endpoint: '/api/mlb/stats/team-pitching',
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
        sport: 'mlb',
        dataType: 'team-pitching',
        endpoint: '/api/mlb/stats/team-pitching',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/mlb/stats/team-fielding
 * @desc    Get MLB league-wide team fielding stats
 * @access  Public
 */
router.get('/stats/team-fielding', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getLeagueTeamFielding();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB league-wide team fielding stats',
      metadata: {
        sport: 'mlb',
        dataType: 'team-fielding',
        endpoint: '/api/mlb/stats/team-fielding',
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
        sport: 'mlb',
        dataType: 'team-fielding',
        endpoint: '/api/mlb/stats/team-fielding',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

// ============================================================================
// MLB NL (National League) Stats
// ============================================================================

/**
 * @route   GET /api/mlb/stats/nl/player-batting
 * @desc    Get NL player batting stats
 * @access  Public
 */
router.get('/stats/nl/player-batting', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getNLPlayerBattingStats();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB National League player batting stats',
      metadata: {
        sport: 'mlb',
        dataType: 'nl-player-batting',
        endpoint: '/api/mlb/stats/nl/player-batting',
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
        sport: 'mlb',
        dataType: 'nl-player-batting',
        endpoint: '/api/mlb/stats/nl/player-batting',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/mlb/stats/nl/player-pitching
 * @desc    Get NL player pitching stats
 * @access  Public
 */
router.get('/stats/nl/player-pitching', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getNLPlayerPitchingStats();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB National League player pitching stats',
      metadata: {
        sport: 'mlb',
        dataType: 'nl-player-pitching',
        endpoint: '/api/mlb/stats/nl/player-pitching',
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
        sport: 'mlb',
        dataType: 'nl-player-pitching',
        endpoint: '/api/mlb/stats/nl/player-pitching',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/mlb/stats/nl/player-fielding
 * @desc    Get NL player fielding stats
 * @access  Public
 */
router.get('/stats/nl/player-fielding', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getNLPlayerFieldingStats();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB National League player fielding stats',
      metadata: {
        sport: 'mlb',
        dataType: 'nl-player-fielding',
        endpoint: '/api/mlb/stats/nl/player-fielding',
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
        sport: 'mlb',
        dataType: 'nl-player-fielding',
        endpoint: '/api/mlb/stats/nl/player-fielding',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/mlb/stats/nl/team-batting
 * @desc    Get NL team batting stats
 * @access  Public
 */
router.get('/stats/nl/team-batting', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getNLTeamBatting();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB National League team batting stats',
      metadata: {
        sport: 'mlb',
        dataType: 'nl-team-batting',
        endpoint: '/api/mlb/stats/nl/team-batting',
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
        sport: 'mlb',
        dataType: 'nl-team-batting',
        endpoint: '/api/mlb/stats/nl/team-batting',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/mlb/stats/nl/team-pitching
 * @desc    Get NL team pitching stats
 * @access  Public
 */
router.get('/stats/nl/team-pitching', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getNLTeamPitching();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB National League team pitching stats',
      metadata: {
        sport: 'mlb',
        dataType: 'nl-team-pitching',
        endpoint: '/api/mlb/stats/nl/team-pitching',
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
        sport: 'mlb',
        dataType: 'nl-team-pitching',
        endpoint: '/api/mlb/stats/nl/team-pitching',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

/**
 * @route   GET /api/mlb/stats/nl/team-fielding
 * @desc    Get NL team fielding stats
 * @access  Public
 */
router.get('/stats/nl/team-fielding', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getNLTeamFielding();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB National League team fielding stats',
      metadata: {
        sport: 'mlb',
        dataType: 'nl-team-fielding',
        endpoint: '/api/mlb/stats/nl/team-fielding',
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
        sport: 'mlb',
        dataType: 'nl-team-fielding',
        endpoint: '/api/mlb/stats/nl/team-fielding',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

// ============================================================================
// MLB Coverage
// ============================================================================

/**
 * @route   GET /api/mlb/coverage
 * @desc    Get available MLB leagues/tournaments with IDs
 * @access  Public
 */
router.get('/coverage', async (_req: Request, res: Response) => {
  try {
    const data = await mlbService.getCoverage();

    res.json({
      success: true,
      data: data,
      llm_context: 'MLB coverage - available leagues and tournaments',
      metadata: {
        sport: 'mlb',
        dataType: 'coverage',
        endpoint: '/api/mlb/coverage',
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
        sport: 'mlb',
        dataType: 'coverage',
        endpoint: '/api/mlb/coverage',
        fetchedAt: new Date().toISOString(),
        source: 'goalserve',
      },
    });
  }
});

export default router;
