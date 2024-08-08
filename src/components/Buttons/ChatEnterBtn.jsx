import React from "react";
// import chatsendbutton from "src/assets/Common/chatsendbutton.png";

const ChatEnterBtn = () => {
  const chatsendbutton = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/chatsendbutton.png"
  return (
    <button className="w-[40px] h-[40px] rounded-[10px] bg-[#2D8CFF]">
      <img src={chatsendbutton} alt="채팅 엔터 버튼:얼음 모양" />
    </button>
  );
};

export default ChatEnterBtn;
