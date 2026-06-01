import type { Achievement } from "../types/achievement";
import type { Game } from "../types/game";

export async function getGameData(steamUserId: string) {
  if (!steamUserId) return [];
  const url = formulateGameApiUrl(steamUserId);
  const response = await callApi(url);
  const usersGames = response.response.games.map((game: Game) => {
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

export async function getFullAchievementData(steamUserId: string) {
  if (!steamUserId) return {};
  const gameList = await getGameData(steamUserId);
  const gamesDict = mapGameDataToDict(gameList);
  await mapGameSchemaData(gamesDict);
  await mapAchievementData(gamesDict, steamUserId);
  console.log(gamesDict);
  return gamesDict;
}

function mapGameDataToDict(gameList: Array<Game>) {
  const gamesDict: Record<number, Game> = {};
  gameList.forEach((game) => {
    gamesDict[game.appid] = game;
  });
  return gamesDict;
}

async function mapAchievementData(
  gamesDict: Record<number, Game>,
  steamUserId: string,
) {
  for (const gameData of Object.values(gamesDict)) {
    if (!gameData.hasAchievements) {
      continue;
    }
    await mapPersonalAchievementData(gameData, steamUserId);
    await mapGlobalAchievementData(gameData);
  }
}

async function mapPersonalAchievementData(gameData: Game, steamUserId: string) {
  const response = await getPlayerAchievements(
    String(gameData.appid),
    steamUserId,
  );
  console.log(response);
  const personalAchievementData = response.playerstats.achievements;
  personalAchievementData.forEach((achievement: Achievement) => {
    const achievementEntry = gameData.achievementData[achievement.apiname];
    if (!achievementEntry) return;
    achievementEntry.achieved = achievement.achieved;
    achievementEntry.unlocktime = achievement.unlocktime;
  });
}

async function mapGlobalAchievementData(gameData: Game) {
  const response = await getGlobalAchievementPercentagesForGame(
    String(gameData.appid),
  );
  console.log(response);
  const globalAchievementData = response.achievementpercentages.achievements;
  globalAchievementData.forEach((achievement: Achievement) => {
    const achievementEntry = gameData.achievementData[achievement.name];
    if (!achievementEntry) return;
    achievementEntry.percent = achievement.percent;
  });
}

export async function getUserData(steamUserId: string) {
  if (!steamUserId) {
    return { personaname: "-" };
  }
  console.log("NULL");
  const response = await callApi(formulateUserApiUrl(steamUserId));
  const userInformation = response.response.players[0];
  return userInformation;
}

async function callApi(apiUrl: string, format = "json") {
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

function formulateGameApiUrl(steamUserId: string) {
  const apiKey = import.meta.env.VITE_STEAM_API_KEY;
  const url = `/api/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamUserId}&include_appinfo=true&format=json`;
  return url;
}

function formulateUserApiUrl(steamUserId: string) {
  const apiKey = import.meta.env.VITE_STEAM_API_KEY;
  const url = `/api/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamUserId}&format=json`;
  return url;
}

export async function getGlobalAchievementPercentagesForGame(appId: string) {
  const url = `/api/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${appId}&format=json`;
  const response = await callApi(url);
  return response;
}

async function getPlayerAchievements(appId: string, steamUserId: string) {
  const apiKey = import.meta.env.VITE_STEAM_API_KEY;
  const url = `/api/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${apiKey}&steamid=${steamUserId}`;
  const response = await callApi(url);
  return response;
}

export async function getRecentlyPlayedGames(steamUserId: string) {
  const apiKey = import.meta.env.VITE_STEAM_API_KEY;
  const url = `/api/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamUserId}&format=json`;
  const response = await callApi(url);
  return response;
}

async function mapGameSchemaData(gamesDict: Record<number, Game>) {
  for (const [appid, gameData] of Object.entries(gamesDict)) {
    try {
      const gameSchemaData = await getSchemaForGame(String(gameData.appid));
      console.log(gameSchemaData);

      gameData.hasAchievements =
        !!gameSchemaData.game.availableGameStats?.achievements;
      if (gameData.hasAchievements) {
        gameData.achievementData = {};
        gameSchemaData.game.availableGameStats.achievements.forEach(
          (achievement: Achievement) =>
            (gameData.achievementData[achievement.name] = achievement),
        );
      }
      console.log(gameData);
    } catch (error) {
      console.error(
        `Error fetching global achievements for game ${gameData.appid}:`,
        error,
      );
    }
  }
}

async function getSchemaForGame(appId: string) {
  const apiKey = import.meta.env.VITE_STEAM_API_KEY;
  const xmlurl = `/api/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appId}`;
  const xmlResponse = await callApi(xmlurl, "xml");
  console.log(xmlResponse.text());
  const url = `/api/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appId}`;
  const response = await callApi(url);
  return response;
}
