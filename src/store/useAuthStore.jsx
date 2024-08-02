import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  // persist 미들웨어를 사용하여 sessionStorage에 상태 저장
  persist(
    (set) => ({
      memberName: null,
      isLogin: null,
      login: (memberName) => set({ memberName, isLogin: true }),
      logout: () => set({ memberName: null, isLogin: false }),
    }),
    {
      name: "auth-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useAuthStore;
