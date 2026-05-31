import { create } from "zustand";

type PageStore = {
  page: "library" | "profile";
  setPage: (newPage: "library" | "profile") => void;
};

export const usePageStore = create<PageStore>()((set) => ({
  page: "library",

  setPage: (newPage) => set({ page: newPage }),
}));
