import { create } from "zustand";
import type { Game } from "../types/game";
import { getGameData } from "../services/fetch-games";

type GameStore = {
  games: Array<Game>;
  loadGames: () => Promise<void>;
};

export const useGameStore = create<GameStore>((set) => ({
  games: [],
  loadGames: async () => {
    const games = await getGameData();
    set({ games });
  },
}));
