import { create } from 'zustand';

const usePresenterStore = create((set) => ({
  currentPresenterId: null,
  setCurrentPresenterId: (id) => set({ currentPresenterId: id }),

  balanceGamePeopleChoiceInfo: [],
  setBalanceGamePeopleChoiceInfo: (updateFn) => set((state) => ({
    balanceGamePeopleChoiceInfo: updateFn(state.balanceGamePeopleChoiceInfo),
  })),
  resetBalanceGamePeopleChoiceInfo: () => set({ balanceGamePeopleChoiceInfo: [] }), 
}));

export default usePresenterStore;