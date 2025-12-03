# Sports Data API

A Node.js/Express backend service that aggregates sports data from GoalServe API and provides normalized, LLM-ready responses.

## 🏈 Supported Sports

| Sport | Endpoint | Data Available |
|-------|----------|----------------|
| NFL | `/api/nfl` | Scores, Schedule, Standings, Rosters, Stats, Injuries, H2H |
| NCAA Football | `/api/ncaaf` | Scores, Schedule, Standings, Rosters (FBS, FCS, Div3) |
| NBA | `/api/nba` | Scores, Schedule, Standings, Rosters, Stats, Injuries, H2H |
| NCAA Basketball | `/api/ncaab` | Scores, Schedule, Standings, Rankings |
| WNBA | `/api/wnba` | Scores, Schedule, Standings |
| UFC/MMA | `/api/ufc` | Schedule, Live Stats, Fighter Profiles, Odds |
| MLB | `/api/mlb` | Scores, Schedule, Standings, Batting/Pitching Stats |
| NHL | `/api/nhl` | Scores, Schedule, Standings, Rosters, Stats |
| Soccer (MLS) | `/api/soccer/mls` | Fixtures, Scores, Standings, Odds |
| Soccer (EPL) | `/api/soccer/epl` | Fixtures, Scores, Standings, Odds |
| Golf | `/api/golf` | Live Leaderboard, PGA Schedule, Rankings |
| NASCAR | `/api/nascar` | Results, Live, Standings |
| Formula 1 | `/api/f1` | Results, Live, Drivers, Teams |
| Esports | `/api/esports` | Home Feed, D1, D2 |
| Horse Racing | `/api/horse-racing` | Today/Tomorrow Entries |
| XFL | `/api/xfl` | Scores, Schedule |
| USFL | `/api/usfl` | Scores, Schedule |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- GoalServe API key
- (Optional) Supabase project for logging

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sports-api

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### Configuration

Edit `.env` file:

```env
# Server
PORT=3000
NODE_ENV=development

# GoalServe API (Required)
GOALSERVE_API_KEY=your_api_key_here
GOALSERVE_BASE_URL=https://www.goalserve.com/getfeed

# Supabase (Optional - for logging)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_key

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

### Running the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build
npm start
```

## 📡 API Endpoints

### Health Check

```
GET /health          - Basic health check
GET /health/ready    - Readiness check with dependency status
GET /health/live     - Liveness check
```

### Documentation

```
GET /api             - Full API documentation
GET /api/coverage    - List of available sports
```

### NFL Example

```
GET /api/nfl/scores                    - Live scores
GET /api/nfl/scores/02.12.2025         - Scores for specific date
GET /api/nfl/schedule                  - Schedule
GET /api/nfl/schedule?showOdds=1       - Schedule with betting odds
GET /api/nfl/standings                 - Division standings
GET /api/nfl/teams/1698/roster         - Team roster by ID
GET /api/nfl/teams/1698/injuries       - Team injuries
GET /api/nfl/players/8439/image        - Player headshot
GET /api/nfl/h2h/1690/1681             - Head-to-head comparison
```

### NBA Example

```
GET /api/nba/scores                    - Live scores
GET /api/nba/schedule?showOdds=1       - Schedule with odds
GET /api/nba/standings                 - Division standings
GET /api/nba/standings/conference      - Conference standings
GET /api/nba/teams/1066/player-stats   - Team player stats
GET /api/nba/rankings/ap               - AP rankings
```

### UFC Example

```
GET /api/ufc/schedule                  - Fight schedule
GET /api/ufc/schedule?showOdds=1       - Schedule with betting odds
GET /api/ufc/live                      - Live fight stats
GET /api/ufc/live/18.01.2025           - Historical fight results
GET /api/ufc/fighters                  - All fighters
GET /api/ufc/fighters/84279            - Fighter profile
```

## 📊 Response Format

All responses follow a consistent structure optimized for LLM consumption:

```json
{
  "success": true,
  "data": { /* normalized data */ },
  "llm_context": "Brief summary for LLM prompt injection",
  "metadata": {
    "sport": "nfl",
    "dataType": "scores",
    "endpoint": "/api/nfl/scores",
    "fetchedAt": "2025-12-02T18:30:00Z",
    "source": "goalserve",
    "params": {}
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable error message",
    "details": { /* optional additional info */ }
  }
}
```

## 🔧 Query Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `date` | Date filter (dd.MM.yyyy) | `02.12.2025` |
| `date1` | Start date for range | `01.12.2025` |
| `date2` | End date for range | `07.12.2025` |
| `showOdds` | Include betting odds | `1` or `true` |
| `bm` | Bookmaker IDs | `82,93` |
| `market` | Market IDs | `1,4` |

## 📁 Project Structure

```
sports-api/
├── src/
│   ├── config/           # Configuration
│   │   └── index.ts
│   ├── routes/           # Route definitions
│   │   ├── index.ts      # Main router
│   │   ├── health.routes.ts
│   │   ├── nfl.routes.ts
│   │   ├── nba.routes.ts
│   │   ├── ufc.routes.ts
│   │   └── ...
│   ├── controllers/      # Request handlers (TODO)
│   ├── services/         # Business logic (TODO)
│   ├── repositories/     # Database access (TODO)
│   ├── middlewares/      # Express middleware (TODO)
│   ├── utils/            # Helpers (TODO)
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── app.ts            # Express app
│   └── server.ts         # Entry point
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npm run test     # Run tests
```

### Adding a New Sport

1. Create route file: `src/routes/{sport}.routes.ts`
2. Define endpoints following existing patterns
3. Import and register in `src/routes/index.ts`
4. Update documentation in README

## 🔒 Security

- Helmet.js for security headers
- CORS with configurable origins
- Rate limiting (100 requests/minute by default)
- No credentials in code (all via environment variables)

## 📝 Next Steps (TODO)

- [ ] Implement service layer with GoalServe API calls
- [ ] Add Supabase logging repository
- [ ] Add Zod validation middleware
- [ ] Implement response caching
- [ ] Add unit and integration tests
- [ ] Add OpenAPI/Swagger documentation

## 📄 License

ISC
