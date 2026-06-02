import type { Achievement } from "../types/achievement";
import type { Game } from "../types/game";
import { useQuery } from "@tanstack/react-query";

export async function getGameData(steamUserId: string) {
  if (!steamUserId) return [];
  const url = `http://localhost:3000/gamedata/${steamUserId}`;
  const response = await callApi(url);
  const usersGames = response.map((game: Game) => {
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
  const url = `http://localhost:3000/userachievements/${steamUserId}`;
  const response = await callApi(url);
  console.log(response);
  return response;
}

export async function getUserData(steamUserId: string) {
  if (!steamUserId) {
    return { personaname: "-" };
  }
  const url = `http://localhost:3000/user/${steamUserId}`;
  const response = await callApi(url);
  console.log(response);
  const userInformation = response;
  return userInformation;
}

async function callApi(apiUrl: string, format = "json") {
  console.log(apiUrl);
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
