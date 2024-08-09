import { create } from "zustand";

const useGameStore = create((set) => ({
  gameStep: "camera-check",
  setGameStep: (step) => set({ gameStep: step }),
  mainStreamManager: null,
  setMainStreamManager: (manager) => set({ mainStreamManager: manager }),
  publisher: null,
  setPublisher: (pub) => set({ publisher: pub }),
  subscriber: null,
  setSubsciber: (sub) => set({ subscriber: sub }),
  subscribers: [],
  setSubscribers: (sub) =>
    set((prev) => ({
      subscribers: [...prev.subscribers, sub],
    })),
  connectionInfo: [],
  setConnectionInfo: (newConnectionInfo) =>
    set((prev) => ({
      connectionInfo: {
        ...prev.connectionInfo,
        [newConnectionInfo.connectionId]: newConnectionInfo,
      },
    })),
}));

export default useGameStore;
