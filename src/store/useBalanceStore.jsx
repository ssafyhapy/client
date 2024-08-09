import { create } from "zustand";

const useBalanceStore = create((set) => ({
  pickedChoice: null,
  setPickedChoice: (choice) => set({ pickedChoice: choice }),
  discussedNum : 0,
  setDiscussedNum: (updateFunc) => set((state) => ({ discussedNum: updateFunc(state.discussedNum) })),
}));

export default useBalanceStore;