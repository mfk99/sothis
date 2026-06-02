import callApi from "../helpers/utils";

function formulateUserApiUrl(steamUserId: string) {
  const apiKey = process.env.STEAM_API_KEY;
  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamUserId}&format=json`;
  return url;
}

export async function getUserData(steamUserId: string) {
  if (!steamUserId) {
    return { personaname: "-" };
  }
  const response = await callApi(formulateUserApiUrl(steamUserId));
  const userInformation = response.response.players[0];
  return userInformation;
}
