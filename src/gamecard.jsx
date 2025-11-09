export function GameCard({ game }) {
	const hours = Math.floor(game.playtimeMinutes / 60)
	const minutes = game.playtimeMinutes % 60

	return (
		<div
			style={{
				border: '1px solid #ccc',
				borderRadius: '20px',
				padding: '1rem',
				marginBottom: '1rem',
				fontFamily: 'monospace',
			}}
		>
			<h2>
				<strong> {game.name} </strong>
			</h2>
			<img
				src={game.gameImageUrl}
				alt={`${game.name} header`}
				style={{ width: '100%', maxWidth: '460px', height: 'auto' }}
			/>
			<div>
				<strong>Playtime:</strong> {hours} h {minutes} m
			</div>
			<div>
				<a
					href={`https://store.steampowered.com/app/${game.appid}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					Game page
				</a>
			</div>
			<div>
				<a
					href={`steam://rungameid/${game.appid}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					Launch game
				</a>
			</div>
			<select defaultValue="null">
				<option value="null">-</option>
				<option value="in progress">In progress</option>
				<option value="finished">Finished</option>
				<option value="dnf">DNF</option>
			</select>
			<div>
				<strong>Game ID:</strong> {game.appid}
			</div>
		</div>
	)
}
