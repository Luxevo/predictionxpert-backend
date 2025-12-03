# Guide de test - Client HTTP Goalserve NFL

Ce guide explique comment tester le client HTTP Goalserve pour NFL de plusieurs façons.

## 📋 Prérequis

1. **Variable d'environnement** : Assurez-vous d'avoir votre clé API Goalserve dans votre fichier `.env` :
   ```env
   GOALSERVE_API_KEY=votre_cle_api_ici
   GOALSERVE_BASE_URL=https://www.goalserve.com/getfeed
   ```

## 🧪 Méthodes de test

### 1. Test via script Node.js (Recommandé)

Un script de test dédié est disponible pour tester directement le client :

```bash
npm run test:nfl
```

Ce script va :
- ✅ Tester la récupération des scores NFL
- ✅ Tester la récupération des classements
- ✅ Tester la récupération du calendrier
- ✅ Afficher les erreurs détaillées

### 2. Test via l'API HTTP (Endpoints)

Démarrer le serveur de développement :

```bash
npm run dev
```

Puis tester l'endpoint `/api/nfl/scores` :

#### Avec cURL :
```bash
curl http://localhost:3000/api/nfl/scores
```

#### Avec PowerShell (Windows) :
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/nfl/scores" | Select-Object -ExpandProperty Content
```

#### Avec votre navigateur :
```
http://localhost:3000/api/nfl/scores
```

#### Avec Postman ou Thunder Client :
- **Method** : GET
- **URL** : `http://localhost:3000/api/nfl/scores`
- **Headers** : Aucun requis

### 3. Test interactif avec Node.js

Vous pouvez créer un fichier de test temporaire :

```typescript
// test-temp.ts
import nflGoalserveClient from './src/services/nfl-goalserve.client';

async function test() {
  try {
    console.log('Test des scores NFL...');
    const scores = await nflGoalserveClient.getScores();
    console.log('✅ Succès!', JSON.stringify(scores, null, 2));
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

test();
```

Puis exécuter :
```bash
tsx test-temp.ts
```

## 📊 Autres endpoints à tester

Une fois le serveur démarré, vous pouvez tester :

- **Scores** : `GET http://localhost:3000/api/nfl/scores`
- **Scores par date** : `GET http://localhost:3000/api/nfl/scores/02.12.2025`
- **Calendrier** : `GET http://localhost:3000/api/nfl/schedule`
- **Classements** : `GET http://localhost:3000/api/nfl/standings`
- **Équipe (roster)** : `GET http://localhost:3000/api/nfl/teams/1698/roster`
- **Head-to-head** : `GET http://localhost:3000/api/nfl/h2h/1690/1681`

## 🔍 Vérification de la configuration

Avant de tester, vérifiez que votre configuration est correcte :

```typescript
// Vérifier la config
import config from './src/config';

console.log('API Key configurée:', config.goalserve.apiKey ? '✅ Oui' : '❌ Non');
console.log('Base URL:', config.goalserve.baseUrl);
```

## 🐛 Dépannage

### Erreur : "GOALSERVE_API_KEY is required"
- Vérifiez que votre fichier `.env` existe
- Vérifiez que `GOALSERVE_API_KEY` est défini dans `.env`
- Vérifiez que le fichier `.env` est à la racine du projet

### Erreur : "Goalserve NFL API Error [401]"
- Votre clé API est invalide ou expirée
- Vérifiez votre clé API sur le site Goalserve

### Erreur : "Goalserve NFL API Error [404]"
- L'endpoint n'existe pas
- Vérifiez le format de l'URL dans le client

### Timeout
- Vérifiez votre connexion internet
- Vérifiez que l'API Goalserve est accessible
- Augmentez le timeout dans `.env` : `REQUEST_TIMEOUT_MS=20000`

## ✅ Réponse attendue

Une réponse réussie devrait ressembler à :

```json
{
  "success": true,
  "data": {
    // Données Goalserve ici
  },
  "llm_context": "NFL live scores for current week",
  "metadata": {
    "sport": "nfl",
    "dataType": "scores",
    "endpoint": "/api/nfl/scores",
    "fetchedAt": "2025-01-18T12:00:00.000Z",
    "source": "goalserve"
  }
}
```

## 🚀 Prochaines étapes

Une fois que les tests passent, vous pouvez :
- ✅ Utiliser le client dans vos routes
- ✅ Intégrer d'autres endpoints NFL
- ✅ Ajouter des tests unitaires avec Vitest
- ✅ Implémenter la mise en cache si nécessaire

