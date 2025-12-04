// src/services/ufc.service.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import config from '../config';

class UFCService {
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
      const url = `/${this.apiKey}/mma/${endpoint}`;
      const response = await this.client.get<T>(url, {
        params: { json: 1, ...params },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(
          `Goalserve UFC API Error [${axiosError.response?.status}]: ${axiosError.message}`
        );
      }
      throw error;
    }
  }

  async getScores(): Promise<any> {
    return this.get('live');
  }

  async getScoresByDate(date: string): Promise<any> {
    return this.get('live', { date });
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
    return this.get('schedule', params);
  }

  async getFighters(): Promise<any> {
    return this.get('fighters');
  }

  async getFighterProfile(fighterId: string): Promise<any> {
    return this.get('fighter', { profile: fighterId });
  }
}

export default new UFCService();
