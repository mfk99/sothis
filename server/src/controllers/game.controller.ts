import callApi from "../helpers/utils.js";
import type { Achievement } from "../types/achievement.js";
import type { Game } from "../types/game.js";

export function mapGameDataToDict(gameList: Array<Game>) {
  const gamesDict: Record<number, Game> = {};
  gameList.forEach((game) => {
    gamesDict[game.appid] = game;
  });
  return gamesDict;
}

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

function formulateGameApiUrl(steamUserId: string) {
  const apiKey = process.env.STEAM_API_KEY;
  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamUserId}&include_appinfo=true&format=json`;
  return url;
}

export async function getRecentlyPlayedGames(steamUserId: string) {
  const apiKey = process.env.STEAM_API_KEY;
  const url = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamUserId}&format=json`;
  const response = await callApi(url);
  return response;
}

export async function mapGameSchemaData(gamesDict: Record<number, Game>) {
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
  const apiKey = process.env.STEAM_API_KEY;
  const xmlurl = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appId}`;
  const xmlResponse = await callApi(xmlurl, "xml");
  console.log(xmlResponse.text());
  const url = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appId}`;
  const response = await callApi(url);
  return response;
}
