// src/services/nfl.service.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import config from '../config';

class NFLService {
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
      const url = `/${this.apiKey}/football/${endpoint}`;
      const response = await this.client.get<T>(url, {
        params: { json: 1, ...params },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(
          `Goalserve NFL API Error [${axiosError.response?.status}]: ${axiosError.message}`
        );
      }
      throw error;
    }
  }

  async getScores(): Promise<any> {
    return this.get('nfl-scores');
  }

  async getScoresByDate(date: string): Promise<any> {
    return this.get('nfl-scores', { date });
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
    return this.get('nfl-shedule', params);
  }

  async getStandings(): Promise<any> {
    return this.get('nfl-standings');
  }

  async getPlayByPlay(): Promise<any> {
    return this.get('nfl-playbyplay-scores');
  }

  async getTeamRoster(teamId: string): Promise<any> {
    return this.get(`${teamId}_rosters`);
  }

  async getTeamPlayerStats(teamId: string): Promise<any> {
    return this.get(`${teamId}_player_stats`);
  }

  async getTeamInjuries(teamId: string): Promise<any> {
    return this.get(`${teamId}_injuries`);
  }

  async getPlayerImage(playerId: string): Promise<any> {
    return this.get('usa', { playerimage: playerId });
  }

  async getTeamStats(teamId: string): Promise<any> {
    return this.get(`${teamId}_team_stats`);
  }

  async getH2H(teamId1: string, teamId2: string): Promise<any> {
    return this.get(`h2h_${teamId1}-${teamId2}`);
  }
}

export default new NFLService();
