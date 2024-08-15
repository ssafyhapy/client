import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../api/apiClient";

const useMypageStore = create(
  persist(
    (set) => ({
      memberName: null,
      memberProviderEmail: null,
      memberProfileImageUrl: null,
      memberIntroduction: null,
      memberHistoryList: null,
      memberMemoryboxList: null,
      memberVisibility: null,
      fetchData: async (endpoint) => {
        try {
          const response = await axiosInstance.get(endpoint);
          set({ ...response.data.data });
          console.log("fetchData", response);
        } catch (error) {
          console.error(error);
        }
      },
      setMemberVisibility: (data) => {
        set({ memberVisibility: data });
      },
      updateData: async (endpoint, data) => {
        try {
          const formData = new FormData();
          // 이미지가 있는 경우 FormData에 추가
          if (data.memberProfileImage) {
            formData.append("memberProfileImage", data.memberProfileImage);
          }
          formData.append("memberName", data.memberName);
          formData.append("memberProviderEmail", data.memberProviderEmail);
          formData.append("memberIntroduction", data.memberIntroduction);
          formData.append(
            "memberHistoryList",
            JSON.stringify(data.memberHistoryList)
          );
          formData.append(
            "memberMemoryboxList",
            JSON.stringify(data.memberMemoryboxList)
          );
          formData.append(
            "deletedHistoryList",
            JSON.stringify(data.deletedHistoryList)
          );

          const response = await axiosInstance.patch(endpoint, formData);
          console.log("updateData", response);
        } catch (error) {
          console.error(error);
        }
      },
      // 상태를 초기화하는 reset 함수 추가
      reset: () =>
        set({
          memberName: null,
          memberProviderEmail: null,
          memberProfileImageUrl: null,
          memberIntroduction: null,
          memberHistoryList: null,
          memberMemoryboxList: null,
          memberVisibility: null,
        }),
    }),
    { name: "myPage-storage", storage: createJSONStorage(() => sessionStorage) }
  )
);

const useUpdateStore = create(
  persist(
    (set) => ({
      isEditMode: false,
      setEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
    }),
    { name: "Update-storage", storage: createJSONStorage(() => sessionStorage) }
  )
);

export { useMypageStore, useUpdateStore };
