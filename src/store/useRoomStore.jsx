import { data } from "autoprefixer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRoomStore = create(
  // persist 미들웨어를 사용하여 sessionStorage에 상태 저장
  persist(
    (set) => ({
      "roomId" : null,
      "roomCode" : null,
      "roomName" : null,
      "roomPersonCount" : null,
      "members" : [],
      "hostId" : null,
      "webrtc" : [],
      "memberRooms" : [],
      fetchRoomData: (data) => set({...data}),
    }),
    {
      name: "room-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useRoomStore;