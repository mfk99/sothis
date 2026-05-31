import { create } from "zustand";
import type { User } from "../types/user";
import { getUserData } from "../services/fetch-games";

type UserStore = {
  user: User;
  loadUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: {
    personaname: "",
  },
  loadUser: async () => {
    const user = await getUserData();
    set({ user });
  },
}));
