import React, { useState } from "react";
import NavBar from "../components/NavBar";
import MainGradientBackground from "../components/MainGradientBackground";
import MainHomeFrame from "../components/MainHomeFrame";
import MakeRoom from "./MakeRoom";

const Play = () => {
  const [ makeRoom, setOpenMakeRoom ] = useState(false);
  const openMakeRoom = (event) => {
    event.preventDefault();
    setOpenMakeRoom(true);
  };
  const closeMakeRoom = () => {
    setOpenMakeRoom(false);
  };
  return (
    <>
      <MainGradientBackground>
        <MainHomeFrame>
          <div className="flex flex-col items-center">
            <div className="w-[800px]">
              <NavBar />
            </div>
            <div className="w-[400px] h-[500px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] rounded-[30px] border-[10px] border-[rgba(255,255,255,0.2)] p-5 flex flex-col justify-center">
              <form className="flex flex-col justify-center w-[400px] h-[500px]">
                <div className="mb-10">
                  <p className="text-gray-400">사람들을 초대하고 싶나요?</p>
                  <p className="text-gray-400">방을 만들어 보세요.</p>
                  <button
                    onClick={openMakeRoom}
                    className="bg-blue-500 text-white mt-5 py-2 px-4 rounded w-[90%] h-14 text-2xl"
                  >
                    방 만들기
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-gray-400">사람들을 초대하고 싶나요?</p>
                  <p className="text-gray-400">
                    알고 있는 접속코드를 입력해 방에 입장하세요.
                  </p>
                  <div className="w-[90%] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] rounded-[30px] border-[10px] border-[rgba(255,255,255,0.2)] z-20 flex flex-col justify-center items-center p-5 gap-5 mt-5">
                    <input
                      type="text"
                      className="w-[90%] mt-2 p-2 border rounded"
                      placeholder="접속코드를 입력해주세요"
                    />
                    <button
                      type="submit"
                      className="w-[90%] bg-blue-500 text-white py-2 px-4 rounded h-14 text-2xl"
                    >
                      입장하기
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {makeRoom && <MakeRoom closeMakeRoom={closeMakeRoom} />}
        </MainHomeFrame>
      </MainGradientBackground>
    </>
  );
};

export default Play;
