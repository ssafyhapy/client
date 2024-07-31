import { create } from "zustand";

const useAuthStore = create((set) => ({
  memberName: null,
  setMemberName: (memberName) => set({ memberName }),
  clearUser: () => set({ memberName: null }),
}));

export default useAuthStore;