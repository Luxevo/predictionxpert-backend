// src/server.ts
import app from './app.js';
import { config, validateConfig } from './config/index.js';

// Validate configuration on startup
validateConfig();

const PORT = config.port;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                   SPORTS DATA API                             ║
╠═══════════════════════════════════════════════════════════════╣
║  Status:      Running                                         ║
║  Environment: ${config.nodeEnv.padEnd(45)}║
║  Port:        ${String(PORT).padEnd(45)}║
║  API Docs:    http://localhost:${PORT}/api${' '.repeat(28)}║
║  Health:      http://localhost:${PORT}/health${' '.repeat(25)}║
╚═══════════════════════════════════════════════════════════════╝
  `);
  
  console.log('Available sports endpoints:');
  console.log('  • /api/nfl      - NFL Football');
  console.log('  • /api/ncaaf    - NCAA Football');
  console.log('  • /api/nba      - NBA Basketball');
  console.log('  • /api/ncaab    - NCAA Basketball');
  console.log('  • /api/wnba     - WNBA');
  console.log('  • /api/ufc      - UFC/MMA');
  console.log('  • /api/mlb      - MLB Baseball');
  console.log('  • /api/nhl      - NHL Hockey');
  console.log('  • /api/soccer   - Soccer (MLS, EPL)');
  console.log('  • /api/golf     - Golf/PGA');
  console.log('  • /api/nascar   - NASCAR');
  console.log('  • /api/f1       - Formula 1');
  console.log('  • /api/esports  - Esports');
  console.log('  • /api/horse-racing - Horse Racing');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default server;
