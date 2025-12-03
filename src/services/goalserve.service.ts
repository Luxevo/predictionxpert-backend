// src/services/goalserve.service.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import config from '../config';

class GoalserveService {
  private client: AxiosInstance;
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = config.goalserve.apiKey;
    this.baseUrl = config.goalserve.baseUrl;
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: config.requestTimeoutMs,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Fetch data from Goalserve API
   * @param feedType - Type of feed (e.g., 'nfl', 'nba', 'nhl')
   * @param endpoint - Specific endpoint or parameters
   * @param params - Additional query parameters
   * @returns Promise with API response data
   */
  async fetchFeed(
    feedType: string,
    endpoint?: string,
    params?: Record<string, string | number | boolean>
  ): Promise<any> {
    if (!this.apiKey) {
      throw new Error('GOALSERVE_API_KEY is not configured');
    }

    try {
      // Goalserve API format: /getfeed/{apikey}/{feedType}/{endpoint}?params
      const urlParts = [this.apiKey, feedType];
      if (endpoint) {
        urlParts.push(endpoint);
      }

      const url = `/${urlParts.join('/')}`;
      
      const queryParams = {
        json: 1, // Request JSON format
        ...params,
      };

      const response = await this.client.get(url, {
        params: queryParams,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(
          `Goalserve API error: ${axiosError.response?.status} - ${axiosError.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Fetch XML data from Goalserve API (if needed)
   */
  async fetchFeedXML(
    feedType: string,
    endpoint?: string,
    params?: Record<string, string | number | boolean>
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('GOALSERVE_API_KEY is not configured');
    }

    try {
      const urlParts = [this.apiKey, feedType];
      if (endpoint) {
        urlParts.push(endpoint);
      }

      const url = `/${urlParts.join('/')}`;
      
      const response = await this.client.get(url, {
        params: params || {},
        responseType: 'text',
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(
          `Goalserve API error: ${axiosError.response?.status} - ${axiosError.message}`
        );
      }
      throw error;
    }
  }
}

export default new GoalserveService();

