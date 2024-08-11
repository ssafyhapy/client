import { create } from "zustand";

const useGameStore = create((set) => ({
  testToken:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w",
  setTestToken: (testToken) => set({ testToken }),
  roomId: 1,
  setRoomId: (updateFunc) =>
    set((state) => ({ roomId: updateFunc(state.roomId) })),
  gameStep: "camera-check",
  setGameStep: (step) => set({ gameStep: step }),
  session:null,
  setSession : (se)=>set({session:se}),
  mainStreamManager: null,
  setMainStreamManager: (manager) => set({ mainStreamManager: manager }),
  publisher: null,
  setPublisher: (pub) => set({ publisher: pub }),
  subscribers: [],
  setSubscribers: (subs) => set({ subscribers: subs }),
  connectionInfo: [],
  setConnectionInfo: (newConnectionInfo) =>
    set((prev) => ({
      connectionInfo: {
        ...prev.connectionInfo,
        [newConnectionInfo.connectionId]: newConnectionInfo,
      },
    })),

  // 마스크 관련 상태 추가
  gltfUrl: "",
  setGltfUrl: (url) => set({ gltfUrl: url }),
  isGltfUrl: false,
  setIsGltfUrl: (isGltfUrl) => set({ isGltfUrl }),
}));

export default useGameStore;
