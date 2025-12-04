// src/services/mlb.service.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import config from '../config';

class MLBService {
  private client: AxiosInstance;
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = config.goalserve.apiKey;
    this.baseUrl = config.goalserve.baseUrl;

    if (!this.apiKey) {
      throw new Error('GOALSERVE_API_KEY is required in environment variables');
    }

    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: config.requestTimeoutMs,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  private async get<T = any>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    try {
      const url = `/${this.apiKey}/baseball/${endpoint}`;
      const response = await this.client.get<T>(url, {
        params: { json: 1, ...params },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(
          `Goalserve MLB API Error [${axiosError.response?.status}]: ${axiosError.message}`
        );
      }
      throw error;
    }
  }

  async getScores(): Promise<any> {
    return this.get('mlb-scores');
  }

  async getScoresByDate(date: string): Promise<any> {
    return this.get('usa', { date });
  }

  async getSchedule(options?: {
    showOdds?: boolean;
    date1?: string;
    date2?: string;
    bm?: string;
    market?: string;
  }): Promise<any> {
    const params: Record<string, string | number | boolean> = {};
    if (options?.showOdds) params.showodds = 1;
    if (options?.date1) params.date1 = options.date1;
    if (options?.date2) params.date2 = options.date2;
    if (options?.bm) params.bm = options.bm;
    if (options?.market) params.market = options.market;
    return this.get('mlb_shedule', params);
  }

  async getStandings(): Promise<any> {
    return this.get('mlb_standings');
  }

  async getPlayByPlay(): Promise<any> {
    return this.get('mlb-playbyplay');
  }

  async getTeamRoster(teamId: string): Promise<any> {
    return this.get(`${teamId}_rosters`);
  }

  async getTeamBattingStats(teamId: string): Promise<any> {
    return this.get(`${teamId}_batting_stats`);
  }

  async getTeamPitchingStats(teamId: string): Promise<any> {
    return this.get(`${teamId}_pitching_stats`);
  }

  async getTeamStats(teamId: string): Promise<any> {
    return this.get(`${teamId}_stats`);
  }

  async getTeamInjuries(teamId: string): Promise<any> {
    return this.get(`${teamId}_injuries`);
  }

  async getPlayerImage(playerId: string): Promise<any> {
    return this.get('usa', { playerimage: playerId });
  }

  async getH2H(teamId1: string, teamId2: string): Promise<any> {
    return this.get('usa', { h2h: `${teamId1},${teamId2}` });
  }

  async getTransactions(): Promise<any> {
    return this.get('mlb_transactions');
  }

  async getLeaders(): Promise<any> {
    return this.get('mlb_leaders');
  }

  // League-wide player stats
  async getPlayerBattingStats(): Promise<any> {
    return this.get('mlb_player_batting');
  }

  async getPlayerFieldingStats(): Promise<any> {
    return this.get('mlb_player_fielding');
  }

  async getPlayerPitchingStats(): Promise<any> {
    return this.get('mlb_player_pitching');
  }

  // League-wide team stats
  async getLeagueTeamBatting(): Promise<any> {
    return this.get('mlb_team_batting');
  }

  async getLeagueTeamFielding(): Promise<any> {
    return this.get('mlb_team_fielding');
  }

  async getLeagueTeamPitching(): Promise<any> {
    return this.get('mlb_team_pitching');
  }

  // Team overall stats
  async getTeamOverallStats(teamId: string): Promise<any> {
    return this.get(`${teamId}_team_stats`);
  }

  // NL (National League) player stats
  async getNLPlayerBattingStats(): Promise<any> {
    return this.get('nl_player_batting');
  }

  async getNLPlayerFieldingStats(): Promise<any> {
    return this.get('nl_player_fielding');
  }

  async getNLPlayerPitchingStats(): Promise<any> {
    return this.get('nl_player_pitching');
  }

  // NL (National League) team stats
  async getNLTeamBatting(): Promise<any> {
    return this.get('nl_team_batting');
  }

  async getNLTeamFielding(): Promise<any> {
    return this.get('nl_team_fielding');
  }

  async getNLTeamPitching(): Promise<any> {
    return this.get('nl_team_pitching');
  }
}

export default new MLBService();
