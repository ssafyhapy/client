import React from "react";
import chatsendbutton from "src/assets/Common/chatsendbutton.png";

const ChatEnterBtn = () => {
  return (
    <button className="w-[40px] h-[40px] rounded-[10px] bg-[#2D8CFF]">
      <img src={chatsendbutton} alt="채팅 엔터 버튼:얼음 모양" />
    </button>
  );
};

export default ChatEnterBtn;
