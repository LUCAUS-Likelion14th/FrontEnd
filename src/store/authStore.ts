import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isInitialized: boolean;
  setAccessToken: (token: string | null) => void;
  setInitialized: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isInitialized: false,
  setAccessToken: (token) => set({ accessToken: token }),
  setInitialized: () => set({ isInitialized: true }),
  clearAuth: () => set({ accessToken: null }),
}));

export const getAccessToken = () => useAuthStore.getState().accessToken;
