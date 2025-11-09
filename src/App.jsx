import { useEffect, useState } from 'react'
import './App.css'
import { GameCard } from './gamecard'
import { UserCard } from './usercard'
import { getGameData, getUserData } from './fetch-games'

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
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '1rem',
			}}
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
			<div>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(3, 1fr)',
						gap: '1rem',
					}}
				>
					<select
						defaultValue="alphabetical"
						onChange={(e) => setSortMode(e.target.value)}
					>
						<option value="alphabetical">Alphabetical</option>
						<option value="alphabetical-asc">Alphabetical, ascending</option>
						<option value="playtime">Playtime</option>
						<option value="playtime-asc">Playtime, ascending</option>
					</select>
					<input onChange={(e) => setSearchMode(e.target.value)}></input>
					{userName && <UserCard user={userName} />}
				</div>
				<GameCards sortMode={sortMode} searchMode={searchMode}/>
			</div>
		</>
	)
}

export default App
