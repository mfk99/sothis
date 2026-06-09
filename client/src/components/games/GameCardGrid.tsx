import { useEffect, useMemo } from "react";
import { useGameStore } from "../../stores/game.store";
import { GameCard } from "./GameCard";
import { useUserSteamId } from "../../stores/userId.store";
import { useGames } from "../../queries/useGames";

export function GameCardGrid({
  sortMode,
  searchMode,
}: {
  sortMode: string;
  searchMode: string;
}) {
  const userSteamId = useUserSteamId((s) => s.userSteamId);
  const { data: games = [], isLoading, isError } = useGames(userSteamId);

  const filteredGames = useMemo(() => {
    const sorted = [...games].sort((a: any, b: any) => {
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

    return sorted.filter((game: any) =>
      game.name.toLowerCase().includes(searchMode.toLowerCase()),
    );
  }, [games, sortMode, searchMode]);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-white">
        Something went wrong. Please verify that your SteamID is correct and
        that your profile is set to public.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {filteredGames.map((game: any) => (
        <GameCard key={game.appid} game={game} />
      ))}
    </div>
  );
}
