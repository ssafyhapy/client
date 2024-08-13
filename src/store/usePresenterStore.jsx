import { create } from 'zustand';

const usePresenterStore = create((set) => ({
  currentPresenterId: null,
  setCurrentPresenterId: (id) => set({ currentPresenterId: id }),

  balanceGamePeopleChoiceInfo: [],
  setBalanceGamePeopleChoiceInfo: (updateFn) => set((state) => ({
    balanceGamePeopleChoiceInfo: updateFn(state.balanceGamePeopleChoiceInfo),
  })),
  resetBalanceGamePeopleChoiceInfo: () => set({ balanceGamePeopleChoiceInfo: [] }), 

  blueMembers: [],
  redMembers: [],

  addBlueMember: (memberId) => set((state) => ({
    blueMembers: [...state.blueMembers, memberId],
  })),

  addRedMember: (memberId) => set((state) => ({
    RedMembers: [...state.redMembers, memberId],
  })),

  resetMemberStatuses: () => set({ blueMembers: [], redMembers: [] }),
}));

export default usePresenterStore;