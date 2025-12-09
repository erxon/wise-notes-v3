import { create } from "zustand";

export interface UserState {
  user: { email: string | null; id: string | null } | null;
  setUser: (user: UserState["user"]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: null,
    email: null,
  },
  setUser: (user) => set({ user }),
}));
