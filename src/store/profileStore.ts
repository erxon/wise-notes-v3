import { create } from "zustand";

export interface ProfileState {
  profile: {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    avatar_url: string | null;
  } | null;
  setProfile: (profile: ProfileState["profile"]) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: {
    id: null,
    firstName: null,
    lastName: null,
    avatar_url: null,
  },
  setProfile: (profile) => set({ profile }),
}));
