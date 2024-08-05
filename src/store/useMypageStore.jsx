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
          const response = await axiosInstance.patch(endpoint, data);
          console.log("updateData", response);
        } catch (error) {
          console.error(error);
        }
      },
    }),
    { name: "myPage-storage", storage: sessionStorage }
  )
);

const useUpdateStore = create(
  persist(
    (set) => ({
      isEditMode: false,
      setEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
    }),
    { name: "Update-storage", storage: sessionStorage }
  )
);

const useVisibilityStore = create(
  persist(
    (set) => ({
      isVisibility: false,
      setVisibility: () => set((state) => ({ isVisibility: !state.isVisibility })),
    }),
    { name: "Visibility-storage", storage: sessionStorage }
  )
);
export { useMypageStore, useUpdateStore, useVisibilityStore };
