import { create } from "zustand";

type UserData = {
  userId: number;
  userEmail: string;
  userName: string;
  userNickname: string;
  userGender: number; // 1: M, 2: F
  userBirth: string;
  userAddress: string;
  userGoal: string;
  userPreference: string;
  userCreatedDt: string;
  userUpdatedDt: string;
  userOauthId?: number | null;
  userProfile?: string | null;
  userEmailIsAuthenticated: number;
};

type UserState = {
  user: UserData | null;
  setUser: (user: UserData) => void;
  clearUser: () => void;
}


export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));