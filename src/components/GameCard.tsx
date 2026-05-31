import type { Game } from "../types/game";

export function GameCard({ game }: { game: Game }) {
  const hours = Math.floor(game.playtimeMinutes / 60);
  const minutes = game.playtimeMinutes % 60;

  return (
    <div className="font-mono border-2 border-solid border-gray-300 p-4 rounded-2xl bg-linear-to-b from-gray-300 to-gray-500">
      <h2>
        <strong> {game.name} </strong>
      </h2>
      <img
        className="rounded-md"
        src={game.gameImageUrl}
        alt={`${game.name} header`}
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
  );
}
