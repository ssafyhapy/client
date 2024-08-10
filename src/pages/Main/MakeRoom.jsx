import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { axiosInstance } from "../../api/apiClient";
import useRoomStore from "../../store/useRoomStore";
import { useNavigate } from "react-router-dom";
import useGameStore from "../../store/useGameStore";

const MakeRoom = ({ closeMakeRoom }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { fetchRoomData } = useRoomStore();

//  // form 제출시 방 만들기 요청
//  const onSubmit = async (data) => {
//   console.log(data);
//   try {
//     const response = await axiosInstance.post("/room/create", {
//       roomName: data.roomName,
//       roomPersonCount: data.roomPersonCount,
//     });
//     fetchRoomData(response.data.data);
//     console.log("[*] 방 입장", response.data);
//     // 방 만들기 요청 완료시 대기실로 이동
//     navigate("/games");
//   } catch (error) {
//     console.log("Error", error);
//   }
// };

const token = new URLSearchParams(location.search).get('token')

  // form 제출시 방 만들기 요청
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "https://i11c209.p.ssafy.io/api/room/create",
        {
          roomName: data.roomName,
          roomPersonCount: data.roomPersonCount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const roomData = response.data.data;
      console.log("[*] roomData",roomData);
      // fetchRoomData(response.data.data);

      // 방 만들기 요청 완료시 대기실로 이동
      navigate("/games");
    } catch (error) {
      console.log("Error", error);
    }
  };
  console.log(watch("roomName"));
  console.log(watch("roomPersonCount"));

  return (
    // 방 만들기 모달
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 모달 배경 */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeMakeRoom}
      ></div>
      {/* 모달 내용 */}
      <div className="bg-white rounded-lg shadow-lg p-8 z-50">
        <h2 className="text-2xl mb-4">방 만들기</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            {/* 방 제목 input */}
            <label className="block text-gray-700">방 제목</label>
            <input
              type="text"
              className="w-full mt-2 p-2 border rounded"
              placeholder="방 제목을 입력해주세요"
              {...register("roomName", { required: true })}
            />
            {errors.roomName && (
              <p className="text-red-500 text-sm">{errors.roomName.message}</p>
            )}
          </div>
          <div className="mb-4">
            {/* 인원 수 input */}
            <label className="block text-gray-700">인원 수</label>
            <input
              type="number"
              className="w-full mt-2 p-2 border rounded"
              defaultValue={2}
              {...register("roomPersonCount", { required: true })}
            />
            {errors.roomPersonCount && (
              <p className="text-red-500 text-sm">
                {errors.roomPersonCount.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            {/* 방 만들기 제출 버튼*/}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              방 만들기
            </button>
            {/* 취소 */}
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded ml-2"
              onClick={closeMakeRoom}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeRoom;
