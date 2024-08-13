// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ExitBtn = () => {
//   const navigate = useNavigate()
//   const exitToMain = ()=>{
//     navigate("/")
//   }

//   return (
//     <button onClick={exitToMain} className="w-[65px] h-[30px] rounded-[30px] text-[#ffffff] text-[16px] bg-[rgba(255,86,117)] shadow-[0_4px_10px_rgba(66,72,81,0.5)] absolute right-10 top-3 z-20">
//       나가기
//     </button>
//   );
// };

// export default ExitBtn;

import React from "react";
import { useNavigate } from "react-router-dom";
import useOpenViduSession from "../../hooks/useOpenViduSession";
import { axiosInstance } from "../../api/apiClient";
import useRoomStore from "../../store/useRoomStore";
const ExitBtn = ({session}) => {
  const { roomId } = useRoomStore();
  const navigate = useNavigate();
  const exitToMain = async () => {
    navigate("/");
    if (session) {
      session.disconnect();
      console.log("Session disconnected successfully");
      // 서버에 방 나가기 요청
      const response = await axiosInstance.delete(`/room/${roomId}/exit`);
      console.log("방 나가기 완료");
      console.log(response.data);
    }
  };

  return (
    <button
      onClick={exitToMain}
      className="w-[65px] h-[30px] rounded-[30px] text-[#ffffff] text-[16px] bg-[rgba(255,86,117)] shadow-[0_4px_10px_rgba(66,72,81,0.5)] absolute right-10 top-3 z-20"
    >
      나가기
    </button>
  );
};

export default ExitBtn;
