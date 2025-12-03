// src/types/index.ts

// ============================================================================
// Common Types
// ============================================================================

export type Sport = 
  | 'nfl' 
  | 'ncaaf' 
  | 'nba' 
  | 'ncaab' 
  | 'wnba' 
  | 'mlb' 
  | 'nhl' 
  | 'ufc' 
  | 'soccer' 
  | 'golf' 
  | 'nascar' 
  | 'f1' 
  | 'esports' 
  | 'horse-racing';

export type DataType = 
  | 'scores' 
  | 'standings' 
  | 'schedule' 
  | 'roster' 
  | 'injuries' 
  | 'player-stats' 
  | 'team-stats' 
  | 'play-by-play' 
  | 'odds' 
  | 'h2h'
  | 'player-image'
  | 'coverage';

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  llm_context?: string;
  metadata: ResponseMetadata;
}

export interface ResponseMetadata {
  sport: Sport;
  dataType: DataType;
  endpoint: string;
  fetchedAt: string;
  source: 'goalserve';
  params?: Record<string, unknown>;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

// ============================================================================
// Request Types
// ============================================================================

export interface DateRangeParams {
  date?: string;        // dd.MM.yyyy format
  date1?: string;       // start date for range
  date2?: string;       // end date for range
}

export interface OddsParams {
  showOdds?: boolean;
  bookmakers?: number[];  // bookmaker IDs
  markets?: number[];     // market IDs
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface TeamParams {
  teamId: string;
}

export interface PlayerParams {
  playerId: string;
}

export interface H2HParams {
  teamId1: string;
  teamId2: string;
}

// ============================================================================
// Sport-Specific Types
// ============================================================================

// NFL/NCAA Football
export interface NFLScoreParams extends DateRangeParams {
  includePlayByPlay?: boolean;
}

export interface NFLScheduleParams extends DateRangeParams, OddsParams {}

export interface NFLStandingsParams {
  conference?: boolean;  // conference standings vs division
}

// NBA/WNBA/NCAA Basketball
export interface NBAScoreParams extends DateRangeParams {
  includePlayByPlay?: boolean;
}

export interface NBAScheduleParams extends DateRangeParams, OddsParams {}

export interface NBAStandingsParams {
  conference?: boolean;
}

// UFC/MMA
export interface UFCScheduleParams extends DateRangeParams, OddsParams {}

export interface UFCLiveParams extends DateRangeParams {}

export interface UFCFighterParams {
  fighterId: string;
}

// MLB
export interface MLBScoreParams extends DateRangeParams {
  includePlayByPlay?: boolean;
}

export interface MLBScheduleParams extends DateRangeParams, OddsParams {}

// NHL
export interface NHLScoreParams extends DateRangeParams {}

export interface NHLScheduleParams extends DateRangeParams, OddsParams {}

// Soccer
export interface SoccerParams {
  league: 'mls' | 'epl';
}

export interface SoccerFixturesParams extends SoccerParams, DateRangeParams {}

export interface SoccerOddsParams extends SoccerParams {}

// Golf
export interface GolfParams extends DateRangeParams {}

// NASCAR
export interface NASCARParams {
  series: 'sprintcup' | 'nationwide';
}

// F1
export interface F1Params {}

// Esports
export interface EsportsParams extends DateRangeParams {
  division?: 'd1' | 'd2';
}

// Horse Racing
export interface HorseRacingParams {
  day: 'today' | 'tomorrow';
}

// ============================================================================
// Query Request Body (for POST /api/query)
// ============================================================================

export interface QueryRequestBody {
  sport: Sport;
  dataType: DataType;
  params?: Record<string, unknown>;
}

// ============================================================================
// Express Extended Types
// ============================================================================

import { Request } from 'express';

export interface TypedRequest<T = unknown> extends Request {
  body: T;
}

export interface TypedRequestQuery<T = unknown> extends Request {
  query: T & Request['query'];
}

export interface TypedRequestParams<T = unknown> extends Request {
  params: T & Request['params'];
}
