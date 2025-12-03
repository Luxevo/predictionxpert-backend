// scripts/test-nfl-client.ts
// Script de test pour le client HTTP Goalserve NFL
import nflGoalserveClient from '../src/services/nfl-goalserve.client';

async function testNFLClient() {
  console.log('🧪 Test du client HTTP Goalserve NFL\n');
  console.log('='.repeat(60));

  try {
    // Test 1: Scores en direct
    console.log('\n📊 Test 1: Récupération des scores NFL en direct...');
    try {
      const scores = await nflGoalserveClient.getScores();
      console.log('✅ Succès! Données reçues:');
      console.log(`   Type: ${typeof scores}`);
      console.log(`   Clés: ${scores ? Object.keys(scores).slice(0, 5).join(', ') : 'N/A'}...`);
      if (scores) {
        console.log(`   Aperçu: ${JSON.stringify(scores).substring(0, 200)}...`);
      }
    } catch (error) {
      console.error('❌ Erreur:', error instanceof Error ? error.message : error);
    }

    // Test 2: Standings
    console.log('\n📈 Test 2: Récupération des classements NFL...');
    try {
      const standings = await nflGoalserveClient.getStandings();
      console.log('✅ Succès! Données reçues:');
      console.log(`   Type: ${typeof standings}`);
      console.log(`   Clés: ${standings ? Object.keys(standings).slice(0, 5).join(', ') : 'N/A'}...`);
    } catch (error) {
      console.error('❌ Erreur:', error instanceof Error ? error.message : error);
    }

    // Test 3: Schedule
    console.log('\n📅 Test 3: Récupération du calendrier NFL...');
    try {
      const schedule = await nflGoalserveClient.getSchedule();
      console.log('✅ Succès! Données reçues:');
      console.log(`   Type: ${typeof schedule}`);
      console.log(`   Clés: ${schedule ? Object.keys(schedule).slice(0, 5).join(', ') : 'N/A'}...`);
    } catch (error) {
      console.error('❌ Erreur:', error instanceof Error ? error.message : error);
    }

    console.log('\n' + '='.repeat(60));
    console.log('✨ Tests terminés!\n');

  } catch (error) {
    console.error('\n❌ Erreur fatale:', error);
    process.exit(1);
  }
}

// Exécuter les tests
testNFLClient().catch(console.error);

