import { useQuery } from "@tanstack/react-query";
import { getFullAchievementData } from "../services/fetch-games";

export function useAchievementData(userSteamId: string) {
  return useQuery({
    queryKey: ["achievementData", userSteamId],
    queryFn: () => getFullAchievementData(userSteamId),
    enabled: !!userSteamId,
  });
}
