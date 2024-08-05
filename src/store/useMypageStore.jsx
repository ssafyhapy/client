import { create } from "zustand";
import { persist } from "zustand/middleware";
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
      fetchData: async (endpoint) => {
        try {
          const response = await axiosInstance.get(endpoint);
          set({ ...response.data.data });
          console.log("fetchData", response);
        } catch (error) {
          console.error(error);
        }
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
          formData.append("memberHistoryList", JSON.stringify(data.memberHistoryList));
          formData.append("memberMemoryboxList", JSON.stringify(data.memberMemoryboxList));
          formData.append("deletedHistoryList", JSON.stringify(data.deletedHistoryList));

          const response = await axiosInstance.patch(endpoint, formData);
          console.log("updateData", response);
        } catch (error) {
          console.error(error);
        }
      },
    }),
    { name: "myPage-storage", getStorage: () => sessionStorage }
  )
);

const useUpdateStore = create(
  persist(
    (set) => ({
      isEditMode: false,
      setEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
    }),
    { name: "Update-storage", getStorage: () => sessionStorage }
  )
);

const useVisibilityStore = create(
  persist(
    (set) => ({
      isVisibility: false,
      setVisibility: () =>
        set((state) => ({ isVisibility: !state.isVisibility })),
    }),
    { name: "Visibility-storage", getStorage: () => sessionStorage }
  )
);
export { useMypageStore, useUpdateStore, useVisibilityStore };
