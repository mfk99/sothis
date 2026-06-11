const API_BASE_URL = import.meta?.env?.VITE_API_URL || "http://localhost:3000";

export async function getGameData(steamUserId: string) {
  if (!steamUserId) return [];
  const url = `${API_BASE_URL}/gamedata/${steamUserId}`;
  const response = await callApi(url);
  return response;
}

export async function getFullAchievementData(steamUserId: string) {
  if (!steamUserId) return {};
  const url = `${API_BASE_URL}/userachievements/${steamUserId}`;
  const response = await callApi(url);
  return response;
}

export async function getUserData(steamUserId: string) {
  if (!steamUserId) {
    return { personaname: "-" };
  }
  const url = `${API_BASE_URL}/user/${steamUserId}`;
  const response = await callApi(url);
  const userInformation = response;
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
