import { useEffect } from "react";
import { useGameStore } from "../../stores/game.store";
import { GameCard } from "./GameCard";
import { useuserSteamId } from "../../stores/userId.store";

export function GameCardGrid({
  sortMode,
  searchMode,
}: {
  sortMode: string;
  searchMode: string;
}) {
  const games = useGameStore((s) => s.games);
  const loadGames = useGameStore((s) => s.loadGames);
  const userSteamId = useuserSteamId((s) => s.userSteamId);

  useEffect(() => {
    loadGames(userSteamId);
  }, [loadGames, userSteamId]);

  const sortedGames = [...games].sort((a: any, b: any) => {
    switch (sortMode) {
      case "alphabetical":
        return a.name.localeCompare(b.name);
      case "alphabetical-asc":
        return b.name.localeCompare(a.name);
      case "playtime":
        return b.playtimeMinutes - a.playtimeMinutes;
      case "playtime-asc":
        return a.playtimeMinutes - b.playtimeMinutes;
      default:
        return 0;
    }
  });

  const filteredGames = [...sortedGames].filter((game: any) =>
    game.name.toLowerCase().includes(searchMode.toLowerCase()),
  );

  return (
    <div className="grid grid-cols-3 gap-3">
      {filteredGames.map((game: any) => (
        <GameCard key={game.appid} game={game} />
      ))}
    </div>
  );
}
