export async function getGameData() {
	const url = formulateGameApiUrl();
	// console.log(url)
	const response = await callApi(url)

	const usersGames = response.response.games.map((game) => {
		const gameImageUrl = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`

		return {
			appid: game.appid,
			name: game.name,
			playtimeMinutes: game.playtime_forever,
			gameImageUrl: gameImageUrl,
		}
	})

	return usersGames
}

export async function getUserData() {
	const response = await callApi(formulateUserApiUrl())
	const userInformation = response.response.players[0]
	return userInformation
}

async function callApi(apiUrl) {
	const response = await fetch(apiUrl)
	if (!response.ok) {
		throw new Error('Network response was not ok')
	}

	return response.json()
}

function formulateGameApiUrl() {
	const apiKey = import.meta.env.VITE_STEAM_API_KEY
	const steamId = import.meta.env.VITE_STEAM_ID || '76561198029946068'
	const url = `/api/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&format=json`
	return url
}

function formulateUserApiUrl() {
	const apiKey = import.meta.env.VITE_STEAM_API_KEY
	const steamId = import.meta.env.VITE_STEAM_ID || '76561198029946068'
	const url = `/api/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}&format=json`
	return url
}
