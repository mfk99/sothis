import { useQuery } from "@tanstack/react-query";
import { getGameData } from "../services/fetch-games";

export function useGames(userSteamId: string) {
  return useQuery({
    queryKey: ["games", userSteamId],
    queryFn: () => getGameData(userSteamId),
    enabled: !!userSteamId,
  });
}
