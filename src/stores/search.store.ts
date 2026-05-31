import { create } from "zustand";

type SearchModeStore = {
  searchMode: string;
  setSearchMode: (newSearchMode: string) => void;
};

export const useSearchModeStore = create<SearchModeStore>((set) => ({
  searchMode: "",
  setSearchMode: (newSearchMode) => set({ searchMode: newSearchMode }),
}));
