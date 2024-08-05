import { create } from "zustand";

const useGameStore = create((set) => ({
  roomId: 1,
  setRoomId: (updateFunc) =>
    set((state) => ({ roomId: updateFunc(state.roomId) })),
}));

export default useGameStore;
