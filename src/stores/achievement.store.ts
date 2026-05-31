import { create } from "zustand";
import { getFullAchievementData } from "../services/fetch-games";
import type { Game } from "../types/game";

type AchievementDataStore = {
  achievementData: Record<number, Game>;
  loadAchievementData: () => void;
};

export const useAchievementDataStore = create<AchievementDataStore>((set) => ({
  achievementData: {},
  loadAchievementData: async () => {
    const achievementData = await getFullAchievementData();
    set({ achievementData });
  },
}));
