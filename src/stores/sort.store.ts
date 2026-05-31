import { create } from "zustand";
import type { SortMode } from "../types/sorting";

type SortModeStore = {
  sortMode: SortMode;
  setSortMode: (newSortMode: SortMode) => void;
};

export const useSortModeStore = create<SortModeStore>((set) => ({
  sortMode: "alphabetical",
  setSortMode: (newSortMode) => set({ sortMode: newSortMode }),
}));
