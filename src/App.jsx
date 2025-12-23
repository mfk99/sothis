import { useEffect, useState } from 'react'
import './App.css'
import { GameCard } from './gamecard'
import { UserCard } from './usercard'
import { getGameData, getUserData } from './fetch-games'
import { SearchInput } from './searchInput'
import { SortSelect } from './sortSelect'

function GameCards({ sortMode, searchMode }) {
	const [games, setGames] = useState([])

	useEffect(() => {
		getGameData().then(setGames).catch(console.error)
	}, [])

	const sortedGames = [...games].sort((a, b) => {
		switch (sortMode) {
			case 'alphabetical':
				return a.name.localeCompare(b.name)
			case 'alphabetical-asc':
				return b.name.localeCompare(a.name)
			case 'playtime':
				return b.playtimeMinutes - a.playtimeMinutes
			case 'playtime-asc':
				return a.playtimeMinutes - b.playtimeMinutes
			default:
				return 0
		}
	})

	const filteredGames = [...sortedGames].filter((game) =>
		game.name.includes(searchMode)
	)

	return (
		<div
			class= "grid grid-cols-3 gap-3"
		>
			{filteredGames.map((game) => (
				<GameCard key={game.appid} game={game} />
			))}
		</div>
	)
}

function App() {
	const [count, setCount] = useState(0)
	const [userName, setUserName] = useState(null)
	const [sortMode, setSortMode] = useState('alphabetical')
	const [searchMode, setSearchMode] = useState('')
	useEffect(() => {
		getUserData().then(setUserName).catch(console.error)
	}, [])

	return (
		<>
			<div class ="grid gap-3">
				<div class="grid grid-cols-3 gap-3">
					<SortSelect onChange={(e) => setSortMode(e.target.value)} />
					<SearchInput onChange={(e) => setSearchMode(e.target.value)} />
					{userName && <UserCard user={userName} />}
				</div>
				<GameCards sortMode={sortMode} searchMode={searchMode}/>
			</div>
		</>
	)
}

export default App
