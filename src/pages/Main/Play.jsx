import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import MainGradientBackground from "../../components/Common/MainGradientBackground";
import MainHomeFrame from "../../components/Main_page/MainHomeFrame";
import MakeRoom from "./MakeRoom";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../api/apiClient";
import axios from "axios";
import useRoomStore from "../../store/useRoomStore";
import { useNavigate } from "react-router-dom";

const Play = () => {
  // 방 만들기 모달 상태
  const [makeRoom, setOpenMakeRoom] = useState(false);
  const openMakeRoom = (event) => {
    event.preventDefault();

    setOpenMakeRoom(true);
  };
  const closeMakeRoom = () => {
    setOpenMakeRoom(false);
  };

  const navigate = useNavigate();

  // 접속코드 통해 입장
    const { fetchRoomData } = useRoomStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // 제출시 방 입장(조회) 요청
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axiosInstance.post(
        // "/room/enter?roomCode=196-931"
        `/room/enter?roomCode=${data.roomCode}`
      );
      console.log("[* 방 입장]",response);
      fetchRoomData(response.data.data);
      // 방 입장 요청 완료시 카메라 체크 페이지로 이동
      navigate("/games");
    } catch (error) {
      console.log("Error", error);
    }
  };

  console.log(watch("roomCode"));
  
  // 제출시 방 입장(조회) 요청
  // const onSubmit = async (data) => {
  //   console.log(data);
  //   try {
  //     const response = await axios.post(
  //       `https://i11c209.p.ssafy.io/api/room/enter?roomCode=${data.roomCode}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjQ5OTM3OTE1Iiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjozNTIsImlhdCI6MTcyMjgyNDA4NCwiZXhwIjoxNzI1NDE2MDg0fQ.1Zpsq6_5AT3bp-yizrkzvRiH_Ck0GqIEtSYnBrZ9QOfjbCxx9FjM8NZbf9IQIMzCdxCj_CNNOF49iq1oePdQ7w`,
  //         },
  //       }
  //     );
  //     console.log("[*] 방 입장", response);
  //     // fetchRoomData(response.data.data);
  //     // 방 입장 요청 완료시 카메라 체크 페이지로 이동
  //     console.log("[* 방 입장] roomdata",response.data.data);
  //     const roomData = response.data.data;
  //     navigate("/games", { state: { roomData} });
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

  // console.log(watch("roomCode"));

  return (
    <>
      <MainGradientBackground>
        <MainHomeFrame>
          <div className="flex flex-col items-center">
            {/* 네이게이션 바 */}
            <div className="w-[800px]">
              <NavBar />
            </div>
            {/* 전체 영역 */}
            <div className="w-[400px] h-[500px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] rounded-[30px] border-[10px] border-[rgba(255,255,255,0.2)] p-5 flex flex-col justify-center">
              {/* 내부 영역 */}
              <form className="flex flex-col justify-center w-[400px] h-[500px]">
                <div className="mb-10">
                  <p className="text-gray-400">사람들을 초대하고 싶나요?</p>
                  <p className="text-gray-400">방을 만들어 보세요.</p>
                  {/* 방 만들기 버튼 */}
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
                  {/* 접속코드로 방 입장하기 */}
                  <div className="w-[90%] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] rounded-[30px] border-[10px] border-[rgba(255,255,255,0.2)] z-20 mt-5">
                    <div className="flex flex-col justify-center items-center p-3 gap-5">
                      <input
                        type="text"
                        className="w-[90%] mt-2 p-2 border rounded"
                        placeholder="접속코드를 입력해주세요"
                        // 접속코드 입력 폼, 유효성 검사
                        {...register(
                          "roomCode",
                          { required: true }
                          //   {
                          //   required: "잘못된 접속코드입니다.",
                          //   valueAsNumber: true,
                          //   validate: (value) =>
                          //     Number.isInteger(value) || "정수만 입력해주세요",
                          // }
                        )}
                      />
                      {/* 접속코드 입력시 에러 메시지 */}
                      {errors.roomCode && (
                        <p className="text-red-500 text-sm">
                          {errors.roomCode.message}
                        </p>
                      )}
                      {/* 방 입장하기 버튼, 클릭시 axios 요청 */}
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className="w-[90%] bg-blue-500 text-white py-2 px-4 rounded h-14 text-2xl"
                      >
                        입장하기
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* 방 만들기 모달 */}
          {makeRoom && <MakeRoom closeMakeRoom={closeMakeRoom} />}
        </MainHomeFrame>
      </MainGradientBackground>
    </>
  );
};

export default Play;
