import { create } from "zustand";

type userSteamId = {
  userSteamId: string;
  setUserSteamId: (newUserId: string) => void;
};

export const useuserSteamId = create<userSteamId>((set) => ({
  userSteamId: "",
  setUserSteamId: (newUserId: string) => set({ userSteamId: newUserId }),
}));
