import { create } from "zustand";
import type { User } from "../types/user";
import { getUserData } from "../services/fetch-games";

type UserStore = {
  user: User;
  loadUser: (userId: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: {
    personaname: "",
  },
  loadUser: async (userId: string) => {
    const user = await getUserData(userId);
    set({ user });
  },
}));
