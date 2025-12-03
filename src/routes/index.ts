// src/routes/index.ts
import { Router, Request, Response } from 'express';

// Import all sport routes
import healthRoutes from './health.routes.js';
import nflRoutes from './nfl.routes.js';
import ncaafRoutes from './ncaaf.routes.js';
import nbaRoutes from './nba.routes.js';
import ncaabRoutes from './ncaab.routes.js';
import wnbaRoutes from './wnba.routes.js';
import ufcRoutes from './ufc.routes.js';
import mlbRoutes from './mlb.routes.js';
import nhlRoutes from './nhl.routes.js';
import soccerRoutes from './soccer.routes.js';
import golfRoutes from './golf.routes.js';
import nascarRoutes from './nascar.routes.js';
import f1Routes from './f1.routes.js';
import esportsRoutes from './esports.routes.js';
import horseRacingRoutes from './horse-racing.routes.js';
import xflRoutes from './xfl.routes.js';
import usflRoutes from './usfl.routes.js';

const router = Router();

// ============================================================================
// Health Check Routes
// ============================================================================
router.use('/health', healthRoutes);

// ============================================================================
// API Documentation / Index
// ============================================================================

/**
 * @route   GET /api
 * @desc    API documentation and available endpoints
 * @access  Public
 */
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    name: 'Sports Data API',
    version: '1.0.0',
    description: 'Sports data aggregation API for LLM consumption',
    documentation: {
      sports: {
        nfl: {
          base: '/api/nfl',
          endpoints: [
            'GET /scores - Live scores',
            'GET /scores/:date - Box scores by date',
            'GET /play-by-play - Live play-by-play',
            'GET /schedule - Schedule with optional odds',
            'GET /standings - Division standings',
            'GET /teams/:teamId/roster - Team roster',
            'GET /teams/:teamId/player-stats - Player season stats',
            'GET /teams/:teamId/team-stats - Team season stats',
            'GET /teams/:teamId/injuries - Injury reports',
            'GET /players/:playerId/image - Player headshot',
            'GET /h2h/:teamId1/:teamId2 - Head-to-head',
          ],
        },
        ncaaf: {
          base: '/api/ncaaf',
          endpoints: [
            'GET /scores - FBS live scores',
            'GET /fcs/scores - FCS live scores',
            'GET /div3/scores - Division III live scores',
            'GET /schedule - FBS schedule',
            'GET /standings - FBS standings',
            'GET /teams/:teamId/roster - Team roster',
          ],
        },
        nba: {
          base: '/api/nba',
          endpoints: [
            'GET /scores - Live scores',
            'GET /scores/:date - Box scores by date',
            'GET /play-by-play - Live play-by-play',
            'GET /schedule - Schedule with optional odds',
            'GET /standings - Division standings',
            'GET /standings/conference - Conference standings',
            'GET /teams/:teamId/roster - Team roster',
            'GET /teams/:teamId/player-stats - Player season stats',
            'GET /teams/:teamId/team-stats - Team season stats',
            'GET /teams/:teamId/injuries - Injury reports',
            'GET /players/:playerId/image - Player headshot',
            'GET /h2h/:teamId1/:teamId2 - Head-to-head',
            'GET /rankings/ap - AP rankings',
          ],
        },
        ncaab: {
          base: '/api/ncaab',
          endpoints: [
            'GET /scores - Live scores',
            'GET /schedule - Schedule',
            'GET /standings - Standings',
            'GET /rankings/ap - AP rankings',
          ],
        },
        wnba: {
          base: '/api/wnba',
          endpoints: [
            'GET /scores - Live scores',
            'GET /schedule - Schedule',
            'GET /standings - Standings',
          ],
        },
        ufc: {
          base: '/api/ufc',
          endpoints: [
            'GET /schedule - Fight schedule with optional odds',
            'GET /live - Live fight stats',
            'GET /live/:date - Historical fight results',
            'GET /fighters - Fighters list',
            'GET /fighters/:fighterId - Fighter profile',
            'GET /odds/markets - Betting markets',
            'GET /odds/bookmakers - Bookmakers list',
          ],
        },
        mlb: {
          base: '/api/mlb',
          endpoints: [
            'GET /scores - Live scores',
            'GET /schedule - Schedule',
            'GET /standings - Standings',
            'GET /teams/:teamId/roster - Team roster',
            'GET /stats/player-batting - League batting stats',
            'GET /stats/player-pitching - League pitching stats',
          ],
        },
        nhl: {
          base: '/api/nhl',
          endpoints: [
            'GET /scores - Live scores',
            'GET /schedule - Schedule',
            'GET /standings - Standings',
            'GET /teams/:teamId/roster - Team roster',
          ],
        },
        soccer: {
          base: '/api/soccer',
          endpoints: [
            'GET /mls/fixtures - MLS fixtures',
            'GET /mls/scores - MLS live scores',
            'GET /mls/standings - MLS standings',
            'GET /epl/fixtures - EPL fixtures',
            'GET /epl/scores - EPL live scores',
            'GET /epl/standings - EPL standings',
          ],
        },
        golf: {
          base: '/api/golf',
          endpoints: [
            'GET /live - Live leaderboard',
            'GET /pga/schedule - PGA schedule',
            'GET /pga/players - PGA players',
            'GET /pga/rankings - PGA rankings',
          ],
        },
        nascar: {
          base: '/api/nascar',
          endpoints: [
            'GET /sprintcup/results - Sprint Cup results',
            'GET /sprintcup/live - Sprint Cup live',
            'GET /sprintcup/standings - Sprint Cup standings',
            'GET /nationwide/results - Nationwide results',
          ],
        },
        f1: {
          base: '/api/f1',
          endpoints: [
            'GET /results - Race results',
            'GET /live - Live race data',
            'GET /drivers - Drivers standings',
            'GET /teams - Constructors standings',
          ],
        },
        esports: {
          base: '/api/esports',
          endpoints: [
            'GET /home - All games feed',
            'GET /d1 - Division 1',
            'GET /d2 - Division 2',
          ],
        },
        horseRacing: {
          base: '/api/horse-racing',
          endpoints: [
            'GET /today - Today entries/results',
            'GET /tomorrow - Tomorrow entries',
          ],
        },
        xfl: {
          base: '/api/xfl',
          endpoints: [
            'GET /scores - Live scores',
            'GET /schedule - Schedule',
          ],
        },
        usfl: {
          base: '/api/usfl',
          endpoints: [
            'GET /scores - Live scores',
            'GET /schedule - Schedule',
          ],
        },
      },
      queryParameters: {
        date: 'Date in dd.MM.yyyy format (e.g., 02.12.2025)',
        showOdds: 'Include betting odds (1 or true)',
        date1: 'Start date for date range',
        date2: 'End date for date range',
        bm: 'Bookmaker IDs (comma-separated)',
        market: 'Market IDs (comma-separated)',
      },
    },
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// Sport-Specific Routes
// ============================================================================

// Football
router.use('/api/nfl', nflRoutes);
router.use('/api/ncaaf', ncaafRoutes);
router.use('/api/xfl', xflRoutes);
router.use('/api/usfl', usflRoutes);

// Basketball
router.use('/api/nba', nbaRoutes);
router.use('/api/ncaab', ncaabRoutes);
router.use('/api/wnba', wnbaRoutes);

// Combat Sports
router.use('/api/ufc', ufcRoutes);

// Baseball
router.use('/api/mlb', mlbRoutes);

// Hockey
router.use('/api/nhl', nhlRoutes);

// Soccer
router.use('/api/soccer', soccerRoutes);

// Golf
router.use('/api/golf', golfRoutes);

// Motorsports
router.use('/api/nascar', nascarRoutes);
router.use('/api/f1', f1Routes);

// Other
router.use('/api/esports', esportsRoutes);
router.use('/api/horse-racing', horseRacingRoutes);

// ============================================================================
// Coverage / Available Sports
// ============================================================================

/**
 * @route   GET /api/coverage
 * @desc    Get list of all available sports and their IDs
 * @access  Public
 */
router.get('/api/coverage', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      sports: [
        { id: 'nfl', name: 'NFL', category: 'football' },
        { id: 'ncaaf', name: 'NCAA Football', category: 'football' },
        { id: 'xfl', name: 'XFL', category: 'football' },
        { id: 'usfl', name: 'USFL', category: 'football' },
        { id: 'nba', name: 'NBA', category: 'basketball' },
        { id: 'ncaab', name: 'NCAA Basketball', category: 'basketball' },
        { id: 'wnba', name: 'WNBA', category: 'basketball' },
        { id: 'ufc', name: 'UFC/MMA', category: 'combat' },
        { id: 'mlb', name: 'MLB', category: 'baseball' },
        { id: 'nhl', name: 'NHL', category: 'hockey' },
        { id: 'soccer-mls', name: 'MLS', category: 'soccer' },
        { id: 'soccer-epl', name: 'EPL', category: 'soccer' },
        { id: 'golf', name: 'Golf/PGA', category: 'golf' },
        { id: 'nascar', name: 'NASCAR', category: 'motorsports' },
        { id: 'f1', name: 'Formula 1', category: 'motorsports' },
        { id: 'esports', name: 'Esports', category: 'esports' },
        { id: 'horse-racing', name: 'Horse Racing', category: 'racing' },
      ],
    },
    llm_context: 'Available sports coverage: NFL, NCAA Football, XFL, USFL, NBA, NCAA Basketball, WNBA, UFC/MMA, MLB, NHL, MLS, EPL, Golf, NASCAR, F1, Esports, Horse Racing',
    metadata: {
      sport: 'all',
      dataType: 'coverage',
      endpoint: '/api/coverage',
      fetchedAt: new Date().toISOString(),
      source: 'goalserve',
    },
  });
});

export default router;
