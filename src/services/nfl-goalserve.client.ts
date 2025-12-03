// src/services/nfl-goalserve.client.ts
// Client HTTP dédié pour Goalserve - NFL uniquement
import axios, { AxiosInstance, AxiosError } from 'axios';
import config from '../config';

class NFLGoalserveClient {
  private client: AxiosInstance;
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly sportCategory = 'football';

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

  /**
   * Construit l'URL pour l'API Goalserve NFL
   * Format selon la doc: /getfeed/{apiKey}/football/{endpoint}?json=1
   */
  private buildUrl(endpoint: string): string {
    const parts = [this.apiKey, this.sportCategory, endpoint];
    return `/${parts.join('/')}`;
  }

  /**
   * Méthode générique pour faire des requêtes GET
   */
  private async get<T = any>(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): Promise<T> {
    try {
      const url = this.buildUrl(endpoint);
      const queryParams = {
        json: 1, // Format JSON par défaut
        ...params,
      };

      const response = await this.client.get<T>(url, {
        params: queryParams,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status;
        const message = axiosError.message;
        const responseData = axiosError.response?.data;

        throw new Error(
          `Goalserve NFL API Error [${status}]: ${message}${
            responseData ? ` - ${JSON.stringify(responseData)}` : ''
          }`
        );
      }
      throw error;
    }
  }

  // ============================================================================
  // Endpoints NFL
  // ============================================================================

  /**
   * Récupère les scores NFL en direct (semaine actuelle)
   * Format: /getfeed/{apiKey}/football/nfl-scores?json=1
   */
  async getScores(): Promise<any> {
    return this.get('nfl-scores');
  }

  /**
   * Récupère les scores NFL pour une date spécifique
   * Format: /getfeed/{apiKey}/football/nfl-scores?date=dd.MM.yyyy&json=1
   * @param date - Date au format dd.MM.yyyy (ex: "02.12.2025")
   */
  async getScoresByDate(date: string): Promise<any> {
    return this.get('nfl-scores', { date });
  }

  /**
   * Récupère le calendrier NFL
   * Format: /getfeed/{apiKey}/football/nfl-shedule?json=1
   * Note: Goalserve utilise "shedule" (avec e) et non "schedule"
   * @param options - Options pour le calendrier
   */
  async getSchedule(options?: {
    showOdds?: boolean;
    date1?: string;
    date2?: string;
    bm?: string;
    market?: string;
  }): Promise<any> {
    const params: Record<string, string | number | boolean> = {};

    if (options?.showOdds) {
      params.showodds = 1; // Note: lowercase dans la doc
    }
    if (options?.date1) {
      params.date1 = options.date1;
    }
    if (options?.date2) {
      params.date2 = options.date2;
    }
    if (options?.bm) {
      params.bm = options.bm;
    }
    if (options?.market) {
      params.market = options.market;
    }

    return this.get('nfl-shedule', params);
  }

  /**
   * Récupère les classements NFL
   * Format: /getfeed/{apiKey}/football/nfl-standings?json=1
   */
  async getStandings(): Promise<any> {
    return this.get('nfl-standings');
  }

  /**
   * Récupère le play-by-play NFL en direct
   * Format: /getfeed/{apiKey}/football/nfl-playbyplay-scores?json=1
   */
  async getPlayByPlay(): Promise<any> {
    return this.get('nfl-playbyplay-scores');
  }

  /**
   * Récupère la liste des joueurs d'une équipe NFL
   * Format: /getfeed/{apiKey}/football/{teamId}_rosters?json=1
   * @param teamId - ID de l'équipe (ex: 1691)
   */
  async getTeamRoster(teamId: string): Promise<any> {
    return this.get(`${teamId}_rosters`);
  }

  /**
   * Récupère les statistiques des joueurs d'une équipe NFL
   * Format: /getfeed/{apiKey}/football/{teamId}_player_stats?json=1
   * @param teamId - ID de l'équipe (ex: 1691)
   */
  async getTeamPlayerStats(teamId: string): Promise<any> {
    return this.get(`${teamId}_player_stats`);
  }

  /**
   * Récupère le rapport de blessures d'une équipe NFL
   * Format: /getfeed/{apiKey}/football/{teamId}_injuries?json=1
   * @param teamId - ID de l'équipe (ex: 1691)
   */
  async getTeamInjuries(teamId: string): Promise<any> {
    return this.get(`${teamId}_injuries`);
  }

  /**
   * Récupère l'image d'un joueur NFL (base64)
   * Format: /getfeed/{apiKey}/football/usa?playerimage={playerId}&json=1
   * @param playerId - ID du joueur (ex: 15826)
   */
  async getPlayerImage(playerId: string): Promise<any> {
    return this.get('usa', { playerimage: playerId });
  }
}

// Export une instance singleton
export default new NFLGoalserveClient();

