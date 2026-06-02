import { create } from "zustand";
import type { Game } from "../types/game";
import { getGameData } from "../services/fetch-games";

type GameStore = {
  games: Array<Game>;
  loadGames: (userSteamId: string) => Promise<void>;
};

export const useGameStore = create<GameStore>((set) => ({
  games: [],
  loadGames: async (userSteamId: string) => {
    const games = await getGameData(userSteamId);
    set({ games });
  },
}));
