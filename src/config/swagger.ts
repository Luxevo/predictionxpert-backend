// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const commonResponses = {
  200: {
    description: 'Successful response',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/SuccessResponse' },
      },
    },
  },
  500: {
    description: 'Server error',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorResponse' },
      },
    },
  },
};

const scheduleParams = [
  { name: 'showOdds', in: 'query', schema: { type: 'string', enum: ['1', 'true'] }, description: 'Include betting odds' },
  { name: 'date1', in: 'query', schema: { type: 'string' }, description: 'Start date (dd.MM.yyyy)' },
  { name: 'date2', in: 'query', schema: { type: 'string' }, description: 'End date (dd.MM.yyyy)' },
  { name: 'bm', in: 'query', schema: { type: 'string' }, description: 'Bookmaker IDs (comma-separated)' },
  { name: 'market', in: 'query', schema: { type: 'string' }, description: 'Market IDs (comma-separated)' },
];

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PredictionXpert Sports Data API',
      version: '1.0.0',
      description: `
## Sports Data API

This API provides sports data from GoalServe for:
- **NFL** (American Football)
- **NBA** (Basketball)
- **NHL** (Hockey)
- **MLB** (Baseball)
- **UFC** (MMA)

### Date Format
All dates use the format: \`dd.MM.yyyy\` (e.g., \`25.12.2024\`)

### Response Format
All responses include:
- \`success\`: Boolean indicating request success
- \`data\`: The actual data from GoalServe
- \`llm_context\`: Human-readable context for LLM consumption
- \`metadata\`: Request metadata (sport, endpoint, timestamp, etc.)
      `,
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Development server' },
    ],
    tags: [
      { name: 'NFL', description: 'NFL American Football data' },
      { name: 'NBA', description: 'NBA Basketball data' },
      { name: 'NHL', description: 'NHL Hockey data' },
      { name: 'MLB', description: 'MLB Baseball data' },
      { name: 'UFC', description: 'UFC MMA data' },
    ],
    paths: {
      // ==================== NFL ====================
      '/api/nfl/scores': {
        get: {
          tags: ['NFL'],
          summary: 'Get NFL live scores',
          description: 'Returns live scores for current NFL games',
          responses: commonResponses,
        },
      },
      '/api/nfl/scores/{date}': {
        get: {
          tags: ['NFL'],
          summary: 'Get NFL scores by date',
          parameters: [{ name: 'date', in: 'path', required: true, schema: { type: 'string' }, description: 'Date in dd.MM.yyyy format' }],
          responses: commonResponses,
        },
      },
      '/api/nfl/schedule': {
        get: {
          tags: ['NFL'],
          summary: 'Get NFL schedule',
          parameters: scheduleParams,
          responses: commonResponses,
        },
      },
      '/api/nfl/standings': {
        get: {
          tags: ['NFL'],
          summary: 'Get NFL standings',
          responses: commonResponses,
        },
      },
      '/api/nfl/play-by-play': {
        get: {
          tags: ['NFL'],
          summary: 'Get NFL play-by-play',
          description: 'Live play-by-play data for current games',
          responses: commonResponses,
        },
      },
      '/api/nfl/teams/{teamId}/roster': {
        get: {
          tags: ['NFL'],
          summary: 'Get team roster',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nfl/teams/{teamId}/player-stats': {
        get: {
          tags: ['NFL'],
          summary: 'Get team player stats',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nfl/teams/{teamId}/stats': {
        get: {
          tags: ['NFL'],
          summary: 'Get team season stats',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nfl/teams/{teamId}/injuries': {
        get: {
          tags: ['NFL'],
          summary: 'Get team injuries',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nfl/players/{playerId}/image': {
        get: {
          tags: ['NFL'],
          summary: 'Get player image',
          parameters: [{ name: 'playerId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nfl/h2h/{teamId1}/{teamId2}': {
        get: {
          tags: ['NFL'],
          summary: 'Get head-to-head comparison',
          parameters: [
            { name: 'teamId1', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'teamId2', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: commonResponses,
        },
      },

      // ==================== NBA ====================
      '/api/nba/scores': {
        get: {
          tags: ['NBA'],
          summary: 'Get NBA live scores',
          responses: commonResponses,
        },
      },
      '/api/nba/scores/{date}': {
        get: {
          tags: ['NBA'],
          summary: 'Get NBA scores by date',
          parameters: [{ name: 'date', in: 'path', required: true, schema: { type: 'string' }, description: 'Date in dd.MM.yyyy format' }],
          responses: commonResponses,
        },
      },
      '/api/nba/schedule': {
        get: {
          tags: ['NBA'],
          summary: 'Get NBA schedule',
          parameters: scheduleParams,
          responses: commonResponses,
        },
      },
      '/api/nba/standings': {
        get: {
          tags: ['NBA'],
          summary: 'Get NBA division standings',
          responses: commonResponses,
        },
      },
      '/api/nba/standings/conference': {
        get: {
          tags: ['NBA'],
          summary: 'Get NBA conference standings',
          responses: commonResponses,
        },
      },
      '/api/nba/play-by-play': {
        get: {
          tags: ['NBA'],
          summary: 'Get NBA play-by-play',
          responses: commonResponses,
        },
      },
      '/api/nba/teams/{teamId}/roster': {
        get: {
          tags: ['NBA'],
          summary: 'Get team roster',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nba/teams/{teamId}/player-stats': {
        get: {
          tags: ['NBA'],
          summary: 'Get team player stats',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nba/teams/{teamId}/team-stats': {
        get: {
          tags: ['NBA'],
          summary: 'Get team season stats',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nba/teams/{teamId}/injuries': {
        get: {
          tags: ['NBA'],
          summary: 'Get team injuries',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nba/players/{playerId}/image': {
        get: {
          tags: ['NBA'],
          summary: 'Get player image',
          parameters: [{ name: 'playerId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nba/h2h/{teamId1}/{teamId2}': {
        get: {
          tags: ['NBA'],
          summary: 'Get head-to-head comparison',
          parameters: [
            { name: 'teamId1', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'teamId2', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: commonResponses,
        },
      },

      // ==================== NHL ====================
      '/api/nhl/scores': {
        get: {
          tags: ['NHL'],
          summary: 'Get NHL live scores',
          responses: commonResponses,
        },
      },
      '/api/nhl/scores/{date}': {
        get: {
          tags: ['NHL'],
          summary: 'Get NHL scores by date',
          parameters: [{ name: 'date', in: 'path', required: true, schema: { type: 'string' }, description: 'Date in dd.MM.yyyy format' }],
          responses: commonResponses,
        },
      },
      '/api/nhl/schedule': {
        get: {
          tags: ['NHL'],
          summary: 'Get NHL schedule',
          parameters: scheduleParams,
          responses: commonResponses,
        },
      },
      '/api/nhl/standings': {
        get: {
          tags: ['NHL'],
          summary: 'Get NHL standings',
          responses: commonResponses,
        },
      },
      '/api/nhl/play-by-play': {
        get: {
          tags: ['NHL'],
          summary: 'Get NHL play-by-play',
          responses: commonResponses,
        },
      },
      '/api/nhl/teams/{teamId}/roster': {
        get: {
          tags: ['NHL'],
          summary: 'Get team roster',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nhl/teams/{teamId}/player-stats': {
        get: {
          tags: ['NHL'],
          summary: 'Get team player stats',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nhl/teams/{teamId}/team-stats': {
        get: {
          tags: ['NHL'],
          summary: 'Get team season stats',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nhl/teams/{teamId}/injuries': {
        get: {
          tags: ['NHL'],
          summary: 'Get team injuries',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nhl/players/{playerId}/image': {
        get: {
          tags: ['NHL'],
          summary: 'Get player image',
          parameters: [{ name: 'playerId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/nhl/h2h/{teamId1}/{teamId2}': {
        get: {
          tags: ['NHL'],
          summary: 'Get head-to-head comparison',
          parameters: [
            { name: 'teamId1', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'teamId2', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: commonResponses,
        },
      },

      // ==================== MLB ====================
      '/api/mlb/scores': {
        get: {
          tags: ['MLB'],
          summary: 'Get MLB live scores',
          responses: commonResponses,
        },
      },
      '/api/mlb/scores/{date}': {
        get: {
          tags: ['MLB'],
          summary: 'Get MLB scores by date',
          parameters: [{ name: 'date', in: 'path', required: true, schema: { type: 'string' }, description: 'Date in dd.MM.yyyy format' }],
          responses: commonResponses,
        },
      },
      '/api/mlb/schedule': {
        get: {
          tags: ['MLB'],
          summary: 'Get MLB schedule',
          parameters: scheduleParams,
          responses: commonResponses,
        },
      },
      '/api/mlb/standings': {
        get: {
          tags: ['MLB'],
          summary: 'Get MLB standings',
          responses: commonResponses,
        },
      },
      '/api/mlb/play-by-play': {
        get: {
          tags: ['MLB'],
          summary: 'Get MLB play-by-play',
          responses: commonResponses,
        },
      },
      '/api/mlb/leaders': {
        get: {
          tags: ['MLB'],
          summary: 'Get MLB stat leaders',
          responses: commonResponses,
        },
      },
      '/api/mlb/transactions': {
        get: {
          tags: ['MLB'],
          summary: 'Get MLB transactions',
          responses: commonResponses,
        },
      },
      '/api/mlb/teams/{teamId}/roster': {
        get: {
          tags: ['MLB'],
          summary: 'Get team roster',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/mlb/teams/{teamId}/stats': {
        get: {
          tags: ['MLB'],
          summary: 'Get team season stats',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/mlb/teams/{teamId}/batting-stats': {
        get: {
          tags: ['MLB'],
          summary: 'Get team batting stats',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/mlb/teams/{teamId}/pitching-stats': {
        get: {
          tags: ['MLB'],
          summary: 'Get team pitching stats',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/mlb/teams/{teamId}/injuries': {
        get: {
          tags: ['MLB'],
          summary: 'Get team injuries',
          parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/mlb/players/{playerId}/image': {
        get: {
          tags: ['MLB'],
          summary: 'Get player image',
          parameters: [{ name: 'playerId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
      '/api/mlb/h2h/{teamId1}/{teamId2}': {
        get: {
          tags: ['MLB'],
          summary: 'Get head-to-head comparison',
          parameters: [
            { name: 'teamId1', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'teamId2', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: commonResponses,
        },
      },

      // ==================== MLB League Stats ====================
      '/api/mlb/stats/player-batting': {
        get: {
          tags: ['MLB'],
          summary: 'Get league-wide player batting stats',
          responses: commonResponses,
        },
      },
      '/api/mlb/stats/player-pitching': {
        get: {
          tags: ['MLB'],
          summary: 'Get league-wide player pitching stats',
          responses: commonResponses,
        },
      },
      '/api/mlb/stats/player-fielding': {
        get: {
          tags: ['MLB'],
          summary: 'Get league-wide player fielding stats',
          responses: commonResponses,
        },
      },
      '/api/mlb/stats/team-batting': {
        get: {
          tags: ['MLB'],
          summary: 'Get league-wide team batting stats',
          responses: commonResponses,
        },
      },
      '/api/mlb/stats/team-pitching': {
        get: {
          tags: ['MLB'],
          summary: 'Get league-wide team pitching stats',
          responses: commonResponses,
        },
      },
      '/api/mlb/stats/team-fielding': {
        get: {
          tags: ['MLB'],
          summary: 'Get league-wide team fielding stats',
          responses: commonResponses,
        },
      },

      // MLB NL (National League) Stats
      '/api/mlb/stats/nl/player-batting': {
        get: {
          tags: ['MLB'],
          summary: 'Get NL player batting stats',
          responses: commonResponses,
        },
      },
      '/api/mlb/stats/nl/player-pitching': {
        get: {
          tags: ['MLB'],
          summary: 'Get NL player pitching stats',
          responses: commonResponses,
        },
      },
      '/api/mlb/stats/nl/player-fielding': {
        get: {
          tags: ['MLB'],
          summary: 'Get NL player fielding stats',
          responses: commonResponses,
        },
      },
      '/api/mlb/stats/nl/team-batting': {
        get: {
          tags: ['MLB'],
          summary: 'Get NL team batting stats',
          responses: commonResponses,
        },
      },
      '/api/mlb/stats/nl/team-pitching': {
        get: {
          tags: ['MLB'],
          summary: 'Get NL team pitching stats',
          responses: commonResponses,
        },
      },
      '/api/mlb/stats/nl/team-fielding': {
        get: {
          tags: ['MLB'],
          summary: 'Get NL team fielding stats',
          responses: commonResponses,
        },
      },

      // ==================== UFC ====================
      '/api/ufc/scores': {
        get: {
          tags: ['UFC'],
          summary: 'Get UFC live scores',
          responses: commonResponses,
        },
      },
      '/api/ufc/scores/{date}': {
        get: {
          tags: ['UFC'],
          summary: 'Get UFC fight results by date',
          parameters: [{ name: 'date', in: 'path', required: true, schema: { type: 'string' }, description: 'Date in dd.MM.yyyy format' }],
          responses: commonResponses,
        },
      },
      '/api/ufc/schedule': {
        get: {
          tags: ['UFC'],
          summary: 'Get UFC schedule',
          parameters: scheduleParams,
          responses: commonResponses,
        },
      },
      '/api/ufc/fighters': {
        get: {
          tags: ['UFC'],
          summary: 'Get list of all UFC fighters',
          responses: commonResponses,
        },
      },
      '/api/ufc/fighters/{fighterId}/profile': {
        get: {
          tags: ['UFC'],
          summary: 'Get fighter profile',
          parameters: [{ name: 'fighterId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: commonResponses,
        },
      },
    },
    components: {
      schemas: {
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: { type: 'object', description: 'Response data from GoalServe' },
            llm_context: { type: 'string', description: 'Human-readable context' },
            metadata: {
              type: 'object',
              properties: {
                sport: { type: 'string', example: 'nfl' },
                dataType: { type: 'string', example: 'scores' },
                endpoint: { type: 'string', example: '/api/nfl/scores' },
                fetchedAt: { type: 'string', format: 'date-time' },
                source: { type: 'string', example: 'goalserve' },
                params: { type: 'object' },
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: {
              type: 'object',
              properties: {
                code: { type: 'string', example: 'GOALSERVE_API_ERROR' },
                message: { type: 'string' },
              },
            },
            metadata: { type: 'object' },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
