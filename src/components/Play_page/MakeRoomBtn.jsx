import React from "react";
import PlayFrame from "./PlayFrame";
import MakeDescription from "./MakeDescription";


const MakeRoomBtn = ({ openMakeRoom }) => {

  return (
    <PlayFrame>
      <div className="flex flex-col justify-between items-center w-full h-full p-3 gap-5">
        <MakeDescription />
        <iframe src="https://lottie.host/embed/7608942c-876d-491c-8b1f-38b25658721d/SXUWDs8Uj4.json"></iframe>
        <button
          onClick={openMakeRoom}
          className="bg-[#9400d3b0] text-white mt-5 py-2 px-4 rounded-[30px] w-[90%] h-14 text-2xl shadow-[0_4px_10px_rgba(66,72,81,0.5)]"
        >
          {/* rounded-[30px] text-[#9400d3b0] text-[20px] bg-gradient-to-br from-[#FFFFFF] to-[rgba(30,144,255,0.3)] shadow-[0_4px_10px_rgba(66,72,81,0.5)] */}
          방 만들기
        </button>
      </div>
    </PlayFrame>
  );
};

export default MakeRoomBtn;
