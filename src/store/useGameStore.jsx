import { create } from "zustand";

const useGameStore = create((set) => ({
  testToken:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w",
  setTestToken:(testToken) => set({ testToken }),
  roomId: 1,
  setRoomId: (updateFunc) =>
    set((state) => ({ roomId: updateFunc(state.roomId) })),
  gameStep:"camera-check",
  setGameStep:(step)=>set({gameStep:step}),
  mainStreamManager: null,
  setMainStreamManager: (mainStreamManager) => set({ mainStreamManager }),
  subscribers: [],
  setSubscribers: (subscribers) => set({ subscribers }),
  publisher: null,
  setPublisher: (state) => set({ publisher:state.publisher }),
}));

export default useGameStore;
