import callApi from "../helpers/utils.js";
import type { Achievement } from "../types/achievement.js";
import type { Game } from "../types/game.js";
import {
  getGameData,
  mapGameDataToDict,
  mapGameSchemaData,
} from "./game.controller.js";

export async function getFullAchievementData(steamUserId: string) {
  if (!steamUserId) return {};
  const gameList = await getGameData(steamUserId);
  const gamesDict = mapGameDataToDict(gameList);
  await mapGameSchemaData(gamesDict);
  await mapAchievementData(gamesDict, steamUserId);
  console.log(gamesDict);
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

export async function getGlobalAchievementPercentagesForGame(appId: string) {
  const url = `https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${appId}&format=json`;
  const response = await callApi(url);
  return response;
}

async function getPlayerAchievements(appId: string, steamUserId: string) {
  const apiKey = process.env.STEAM_API_KEY;
  const url = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${apiKey}&steamid=${steamUserId}`;
  const response = await callApi(url);
  return response;
}
