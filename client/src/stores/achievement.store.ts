import { create } from "zustand";
import { getFullAchievementData } from "../services/fetch-games";
import type { Game } from "../types/game";

type AchievementDataStore = {
  achievementData: Record<number, Game>;
  loadAchievementData: (userSteamId: string) => void;
};

export const useAchievementDataStore = create<AchievementDataStore>((set) => ({
  achievementData: {},
  loadAchievementData: async (userSteamId: string) => {
    const achievementData = await getFullAchievementData(userSteamId);
    set({ achievementData });
  },
}));
