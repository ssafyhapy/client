import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  // persist 미들웨어를 사용하여 sessionStorage에 상태 저장
  persist(
    (set) => ({
      memberId: null,
      memberName: null,
      memberProfileImageUrl: null,
      memberProviderEmail: null,
      isLogin: null,
      isLoginAlert: false,
      message: "",
      login: (data) => set({ memberId, memberName, memberProfileImageUrl, memberProviderEmail, isLogin: true, message: "로그인 되었습니다." }),
      logout: () => set({ memberId: null, memberName: null, memberProfileImageUrl: null, memberProviderEmail: null, isLogin: false, message: "로그아웃 되었습니다." }),
      setLoginAlert: () => set(state => ({ isLoginAlert: !state.isLoginAlert })),
      setProfileImageUrl: (data) => set({memberProfileImageUrl})
    }),
    {
      name: "auth-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useAuthStore;
