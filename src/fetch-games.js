export async function getGameData() {
  const url = formulateGameApiUrl();
  const response = await callApi(url);

  const usersGames = response.response.games.map((game) => {
    const gameImageUrl = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`;

    return {
      appid: game.appid,
      name: game.name,
      playtimeMinutes: game.playtime_forever,
      gameImageUrl: gameImageUrl,
    };
  });

  return usersGames;
}

export async function getUserData() {
  const response = await callApi(formulateUserApiUrl());
  const userInformation = response.response.players[0];
  return userInformation;
}

async function callApi(apiUrl) {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

function formulateGameApiUrl() {
  const apiKey = import.meta.env.VITE_STEAM_API_KEY;
  const steamId = import.meta.env.VITE_STEAM_ID || "76561198029946068";
  const url = `/api/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&format=json`;
  return url;
}

function formulateUserApiUrl() {
  const apiKey = import.meta.env.VITE_STEAM_API_KEY;
  const steamId = import.meta.env.VITE_STEAM_ID || "76561198029946068";
  const url = `/api/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}&format=json`;
  return url;
}

export async function getGlobalAchievementPercentagesForGame(appId) {
  const url = `/api/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${appId}&format=json`;
  const response = await callApi(url);
  // console.log("getGlobalAchievementPercentagesForGame response:", response);
}

export async function getPlayerGamesAndAchievements() {
  const gameList = await getGameData();
  const games = [];
  for (const game of gameList) {
    try {
      const gameData = await getPlayerAchievements(game.appid);
      games.push({
        gameId: gameData.playerstats.steamID,
        gameName: gameData.playerstats.gameName,
        achievements: gameData.playerstats?.achievements || [],
      });
    } catch (error) {
      console.error(
        `Error fetching achievements for game ${game.appid}:`,
        error
      );
    }
  }
  return games;
}

export async function getPlayerAchievements(appId) {
  const apiKey = import.meta.env.VITE_STEAM_API_KEY;
  const steamId = import.meta.env.VITE_STEAM_ID || "76561198029946068";
  const url = `/api/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${apiKey}&steamid=${steamId}`;
  const response = await callApi(url);
  console.log(response);
  return response;
}

export async function getRecentlyPlayedGames() {
  const apiKey = import.meta.env.VITE_STEAM_API_KEY;
  const steamId = import.meta.env.VITE_STEAM_ID || "76561198029946068";
  const url = `/api/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json`;
  const response = await callApi(url);
  console.log("getRecentlyPlayedGames response:", response);
}

export async function getSchemaForGame(appId) {
  const apiKey = import.meta.env.VITE_STEAM_API_KEY;
  const url = `/api/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appId}`;
  const response = await callApi(url);
  console.log("getSchemaForGame response:", response);
}
