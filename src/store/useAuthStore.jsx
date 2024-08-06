import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
      login: ({memberId, memberName, memberProfileImageUrl, memberProviderEmail}) => set({ memberId, memberName, memberProfileImageUrl, memberProviderEmail, isLogin: true, message: "로그인 되었습니다." }),
      logout: () => set({ memberId: null, memberName: null, memberProfileImageUrl: null, memberProviderEmail: null, isLogin: false, message: "로그아웃 되었습니다." }),
      setLoginAlert: () => set(state => ({ isLoginAlert: !state.isLoginAlert })),
      setProfileImageUrl: (memberProfileImageUrl) => set({memberProfileImageUrl})
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        memberId: state.memberId,
        memberName: state.memberName,
        memberProfileImageUrl: state.memberProfileImageUrl,
        memberProviderEmail: state.memberProviderEmail,
        isLogin: state.isLogin,
        isLoginAlert: state.isLoginAlert,
        message: state.message,
      }),
    }
  )
);

export default useAuthStore;
