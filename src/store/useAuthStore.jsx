import { create } from "zustand";

const useAuthStore = create((set) => ({
  memberName: null,
  accessToken: null,
  setMemberName: (memberName) => set({ memberName }),
  setAccessToken: (accessToken) => set({ accessToken }),
  clearUser: () => set({ memberName: null, accessToken: null }),
}));

export default useAuthStore;