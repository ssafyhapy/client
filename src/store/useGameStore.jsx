import { create } from "zustand";

const useGameStore = create((set) => ({
  roomId: 1,
  setRoomId: (updateFunc) =>
    set((state) => ({ roomId: updateFunc(state.roomId) })),
  gameStep:"camera-check",
  setGameStep:(step)=>set({gameStep:step})
}));

export default useGameStore;
