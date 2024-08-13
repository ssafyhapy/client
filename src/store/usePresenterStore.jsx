import { create } from "zustand";

const usePresenterStore = create((set) => ({
  currentPresenterId: null,
  setCurrentPresenterId: (id) => set({ currentPresenterId: id }),

  balanceGamePeopleChoiceInfo: [],
  setBalanceGamePeopleChoiceInfo: (updateFn) =>
    set((state) => ({
      balanceGamePeopleChoiceInfo: updateFn(state.balanceGamePeopleChoiceInfo),
    })),
  resetBalanceGamePeopleChoiceInfo: (reset) =>
    set({ balanceGamePeopleChoiceInfo: reset }),

  guessMeGamePeopleSelection: [],
  setGuessMeGamePeopleSelection: (updateFn) =>
    set((state) => ({
      guessMeGamePeopleSelection: updateFn(state.guessMeGamePeopleSelection),
    })),
  resetGuessMePeopleSelection :(reset)=>set({guessMeGamePeopleSelection:reset})
}));

export default usePresenterStore;
