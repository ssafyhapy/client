import { create } from "zustand";

const useAuthStore = create((set) => ({
  memberName: null,
  isLogin: null,
  login: (memberName) => set({ memberName, isLogin: true }),
  logout: () => set({ memberName: null, isLogin: false }),
}));

export default useAuthStore;
