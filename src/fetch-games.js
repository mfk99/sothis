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
      has_community_visible_stats: game?.has_community_visible_stats || false,
    };
  });
  return usersGames;
}

export async function getFullAchievementData() {
  const gameList = await getGameData();
  const gamesDict = mapGameDataToDict(gameList);
  await mapGameSchemaData(gamesDict);
  await mapAchievementData(gamesDict);
  console.log(gamesDict);
  return gamesDict;
}

function mapGameDataToDict(gameList) {
  const gamesDict = {};
  gameList.forEach((game) => {
    gamesDict[game.appid] = game;
  });
  return gamesDict;
}

async function mapAchievementData(gamesDict) {
  for (const gameData of Object.values(gamesDict)) {
    if (!gameData.hasAchievements) {
      continue;
    }
    await mapPersonalAchievementData(gameData);
    await mapGlobalAchievementData(gameData);
  }
}
async function mapPersonalAchievementData(gameData) {
  const response = await getPlayerAchievements(gameData.appid);
  console.log(response);
  const personalAchievementData = response.playerstats.achievements;
  personalAchievementData.forEach((achievement) => {
    gameData.achievementData[achievement.apiname].achieved =
      achievement.achieved;
    gameData.achievementData[achievement.apiname].unlocktime =
      achievement.unlocktime;
  });
}

async function mapGlobalAchievementData(gameData) {
  const response = await getGlobalAchievementPercentagesForGame(gameData.appid);
  console.log(response);
  const globalAchievementData = response.achievementpercentages.achievements;
  globalAchievementData.forEach((achievement) => {
    gameData.achievementData[achievement.name].percent = achievement.percent;
  });
}

export async function getUserData() {
  const response = await callApi(formulateUserApiUrl());
  const userInformation = response.response.players[0];
  return userInformation;
}

async function callApi(apiUrl, format = "json") {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  switch (format) {
    case "json":
      return response.json();
    case "xml":
      return response;
    default:
      console.error("Couldn't recognize datatype: ", format);
  }
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
  return response;
}

async function getPlayerAchievements(appId) {
  const apiKey = import.meta.env.VITE_STEAM_API_KEY;
  const steamId = import.meta.env.VITE_STEAM_ID || "76561198029946068";
  const url = `/api/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${apiKey}&steamid=${steamId}`;
  const response = await callApi(url);
  return response;
}

export async function getRecentlyPlayedGames() {
  const apiKey = import.meta.env.VITE_STEAM_API_KEY;
  const steamId = import.meta.env.VITE_STEAM_ID || "76561198029946068";
  const url = `/api/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json`;
  const response = await callApi(url);
  return response;
}

async function mapGameSchemaData(gamesDict) {
  for (const appid of Object.keys(gamesDict)) {
    const gameData = gamesDict[appid];

    try {
      const gameSchemaData = await getSchemaForGame(gameData.appid);
      console.log(gameSchemaData);

      gameData.hasAchievements =
        !!gameSchemaData.game.availableGameStats?.achievements;
      if (gameData.hasAchievements) {
        gameData.achievementData = {};
        gameSchemaData.game.availableGameStats.achievements.forEach(
          (achievement) =>
            (gameData.achievementData[achievement.name] = achievement)
        );
      }
      console.log(gameData);
    } catch (error) {
      console.error(
        `Error fetching global achievements for game ${gameData.appid}:`,
        error
      );
    }
  }
}

async function getSchemaForGame(appId) {
  const apiKey = import.meta.env.VITE_STEAM_API_KEY;
  const xmlurl = `/api/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appId}`;
  const xmlResponse = await callApi(xmlurl, "xml");
  console.log(xmlResponse.text());
  const url = `/api/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appId}`;
  const response = await callApi(url);
  return response;
}
