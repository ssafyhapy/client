import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../api/apiClient";

const useMypageStore = create(
  persist((set) => ({
    memberName: null,
    memberProviderEmail: null,
    memberProfileImageUrl: null,
    memberIntroduction: null,
    memberHistoryList: null,
    memberMemoryboxList: null,
    fetchdata: async (endpoint) => {
      try {
        const response = await axiosInstance.get(endpoint);
        set({ ...response.data });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }), { name: "myPage-storage", storage: sessionStorage })
);

export default useMypageStore;