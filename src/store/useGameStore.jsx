import { create } from "zustand";

const useGameStore = create((set) => ({
  gameStep: "camera-check",
  setGameStep: (step) => set({ gameStep: step }),
  mainStreamManager: null,
  setMainStreamManager: (manager) => set({ mainStreamManager: manager }),
  publisher: null,
  setPublisher: (pub) => set({ publisher: pub }),
  subscriber: null,
  setSubscriber: (sub) => set({ subscriber: sub }),  // 함수명 수정
  subscribers: [],  // 구독자 목록
  setSubscribers: (sub) =>
    set((prev) => ({
      subscribers: [...prev.subscribers, sub],
    })),
  connectionInfo: {},  // 객체 형태로 수정
  setConnectionInfo: (newConnectionInfo) =>
    set((prev) => ({
      connectionInfo: {
        ...prev.connectionInfo,
        [newConnectionInfo.connectionId]: newConnectionInfo,
      },
    })),

  finalResult:"N",
  setFinalResult : (result)=>set({finalResult:result}),
  startPredictionFlag : false,
  setStartPredictionFlag : (flag)=>set({startPredictionFlag:flag})

}));

export default useGameStore;
