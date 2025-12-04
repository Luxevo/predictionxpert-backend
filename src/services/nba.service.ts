// src/services/nba.service.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import config from '../config';

class NBAService {
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
      const url = `/${this.apiKey}/bsktbl/${endpoint}`;
      const response = await this.client.get<T>(url, {
        params: { json: 1, ...params },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(
          `Goalserve NBA API Error [${axiosError.response?.status}]: ${axiosError.message}`
        );
      }
      throw error;
    }
  }

  async getScores(): Promise<any> {
    return this.get('nba-scores');
  }

  async getScoresByDate(date: string): Promise<any> {
    return this.get('nba-scores', { date });
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
    return this.get('nba-shedule', params);
  }

  async getStandings(): Promise<any> {
    return this.get('nba-standings');
  }

  async getStandingsConference(): Promise<any> {
    return this.get('nba_conf_standings');
  }

  async getPlayByPlay(): Promise<any> {
    return this.get('nba-playbyplay');
  }

  async getTeamRoster(teamId: string): Promise<any> {
    return this.get(`${teamId}_rosters`);
  }

  async getTeamPlayerStats(teamId: string): Promise<any> {
    return this.get(`${teamId}_stats`);
  }

  async getTeamStats(teamId: string): Promise<any> {
    return this.get(`${teamId}_team_stats`);
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

  async getCoverage(): Promise<any> {
    return this.get('coverage');
  }
}

export default new NBAService();
