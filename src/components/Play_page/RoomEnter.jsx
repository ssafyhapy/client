import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../api/apiClient";
import useRoomStore from "../../store/useRoomStore";
import { useNavigate } from "react-router-dom";
import PlayFrame from "./PlayFrame";
import EnterDescription from "./EnterDescription";

const RoomEnter = () => {
  const navigate = useNavigate();
  const { fetchRoomData } = useRoomStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axiosInstance.post(
        `/room/enter?roomCode=${data.roomCode}`
      );
      fetchRoomData(response.data.data);
      console.log("[* 방 입장]", response.data.data);
      navigate("/games");
    } catch (error) {
      console.log("Error", error);
    }
  };

  console.log(watch("roomCode"));

  return (
    // {/* 접속코드로 방 입장하기 */}
    <PlayFrame>
      <form className="flex flex-col justify-between items-center w-full h-full p-3 gap-5">
        <EnterDescription />
        <iframe src="https://lottie.host/embed/e7783617-e411-4e42-804f-c24ee22bb971/0WOoAyWq50.json"></iframe>
        <div className="flex flex-col w-full items-center">
          <input
            type="text"
            className="w-[90%] mb-3 p-2 border rounded-[30px]"
            placeholder="접속코드를 입력해주세요"
            // 접속코드 입력 폼, 유효성 검사
            {...register("roomCode", { required: true })}
          />
          {/* 접속코드 입력시 에러 메시지 */}
          {/* {errors.roomCode && (
          <p className="text-red-500 text-sm">{errors.roomCode.message}</p>
        )} */}

          {/* 방 입장하기 버튼, 클릭시 axios 요청 */}
          <button
            onClick={handleSubmit(onSubmit)}
            className="w-[90%] bg-blue-500 text-white py-2 px-4 rounded-[30px] h-14 text-2xl"
          >
            입장하기
          </button>
        </div>
      </form>
    </PlayFrame>
  );
};

export default RoomEnter;
