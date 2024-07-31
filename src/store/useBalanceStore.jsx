import { create } from "zustand";

const useBalanceStore = create((set) => ({
  pickedChoice: null,
  setPickedChoice: (choice) => set({ pickedChoice: choice }),
}));

export default useBalanceStore;
