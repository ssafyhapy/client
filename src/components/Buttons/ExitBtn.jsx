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

const ExitBtn = () => {
  const navigate = useNavigate()
  const { session } = useOpenViduSession();
  const exitToMain = ()=>{
    if (session) {
      session.disconnect();
      console.log("Session disconnected successfully");
    }
    navigate("/")
  }

  return (
    <button onClick={exitToMain} className="w-[65px] h-[30px] rounded-[30px] text-[#ffffff] text-[16px] bg-[rgba(255,86,117)] shadow-[0_4px_10px_rgba(66,72,81,0.5)] absolute right-10 top-3 z-20">
      나가기
    </button>
  );
};

export default ExitBtn;
