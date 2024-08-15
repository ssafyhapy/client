import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import bgImage from "../../assets/bg/bgImage.jpg";
import MainFrame from "../../components/MainFrame";
import MakeRoom from "./MakeRoom";
import RoomEnter from "../../components/Play_page/RoomEnter";
import MakeRoomBtn from "../../components/Play_page/MakeRoomBtn";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Play = () => {
  const { isLogin } = useAuthStore();
  const navigate = useNavigate();
  // 방 만들기 모달 상태
  const [makeRoom, setOpenMakeRoom] = useState(false);
  const openMakeRoom = (event) => {
    if (!isLogin) {
      navigate("/login");
      return;
    }
    event.preventDefault();
    setOpenMakeRoom(true);
  };
  const closeMakeRoom = () => {
    setOpenMakeRoom(false);
  };

  return (
    <div
      className="h-screen overflow-y-scroll flex justify-center items-center bg-fixed bg-cover bg-center scrollbar-hide"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <MainFrame>
        <div className="flex flex-col items-center w-[80%] h-[80%]">
          {/* 네이게이션 바 */}
          <NavBar />
          <div className="w-full h-full flex justify-between items-center gap-10">
            <MakeRoomBtn openMakeRoom={openMakeRoom} />
            <RoomEnter />
          </div>
        </div>
        {/* 방 만들기 모달 */}
        {makeRoom && <MakeRoom closeMakeRoom={closeMakeRoom} />}
      </MainFrame>
    </div>
  );
};

export default Play;
