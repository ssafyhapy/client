import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) =>
    set({ accessToken }),
  clearUser: () => set({ user: null, accessToken: null }),
}));

export default useAuthStore;