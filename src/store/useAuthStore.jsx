import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  // persist 미들웨어를 사용하여 sessionStorage에 상태 저장
  persist(
    (set) => ({
      memberName: null,
      isLogin: null,
      isLoginAlert: false,
      message: "",
      login: (memberName) => set({ memberName, isLogin: true, message: "로그인 되었습니다." }),
      logout: () => set({ memberName: null, isLogin: false, message: "로그아웃 되었습니다." }),
      setLoginAlert: () => set(state => ({ isLoginAlert: !state.isLoginAlert })),
    }),
    {
      name: "auth-storage",
      storage: sessionStorage,
    }
  )
);

export default useAuthStore;
