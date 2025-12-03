// src/services/nfl.service.ts
// Utilise le client HTTP dédié NFL-Goalserve
import nflGoalserveClient from './nfl-goalserve.client';

class NFLService {
  /**
   * Get NFL live scores for current week
   * @param jsonFormat - Whether to request JSON format (default: true)
   * @returns NFL scores data
   */
  async getScores(jsonFormat: boolean = true): Promise<any> {
    // Le client retourne toujours du JSON par défaut
    return nflGoalserveClient.getScores();
  }

  /**
   * Get NFL box scores for a specific date
   * @param date - Date in dd.MM.yyyy format
   * @returns NFL scores for the specified date
   */
  async getScoresByDate(date: string): Promise<any> {
    return nflGoalserveClient.getScoresByDate(date);
  }

  /**
   * Get NFL schedule
   * @param options - Schedule options (showOdds, date1, date2, bm, market)
   * @returns NFL schedule data
   */
  async getSchedule(options?: {
    showOdds?: boolean;
    date1?: string;
    date2?: string;
    bm?: string;
    market?: string;
  }): Promise<any> {
    return nflGoalserveClient.getSchedule(options);
  }

  /**
   * Get NFL standings
   * @returns NFL division standings
   */
  async getStandings(): Promise<any> {
    return nflGoalserveClient.getStandings();
  }

  /**
   * Get NFL team roster
   * @param teamId - Team ID
   * @returns Team roster data
   */
  async getTeamRoster(teamId: string): Promise<any> {
    return nflGoalserveClient.getTeamRoster(teamId);
  }

  /**
   * Get NFL team player stats
   * @param teamId - Team ID
   * @returns Team player stats
   */
  async getTeamPlayerStats(teamId: string): Promise<any> {
    return nflGoalserveClient.getTeamPlayerStats(teamId);
  }

  /**
   * Get NFL team injuries
   * @param teamId - Team ID
   * @returns Team injury report
   */
  async getTeamInjuries(teamId: string): Promise<any> {
    return nflGoalserveClient.getTeamInjuries(teamId);
  }

  /**
   * Get NFL player image
   * @param playerId - Player ID
   * @returns Player image data (base64)
   */
  async getPlayerImage(playerId: string): Promise<any> {
    return nflGoalserveClient.getPlayerImage(playerId);
  }

  /**
   * Get NFL play-by-play
   * @returns Play-by-play data
   */
  async getPlayByPlay(): Promise<any> {
    return nflGoalserveClient.getPlayByPlay();
  }
}

export default new NFLService();

