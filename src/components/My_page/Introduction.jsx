import React from "react";
import { useFormContext } from "react-hook-form";
import { useMypageStore } from "../../store/useMypageStore";

const Introduction = ({ isEditMode }) => {
  const { memberIntroduction } = useMypageStore();
  const { register } = useFormContext();

  return (
    <div className="w-full h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex items-start p-5 gap-5 relative">
      <div className="w-full flex flex-col justify-center gap-5">
        <h1 className="text-3xl">About me</h1>
        {/* 수정 모드일 때 textarea로 변경 */}
        {isEditMode ? (
          <textarea
            // 소개 입력 폼
            {...register("memberIntroduction")}
            className="bg-blue-100 border-2 border-blue-500 shadow-md p-4 rounded-lg resize-y w-full min-h-[120px] text-lg "
          />
        ) : // 소개 출력
        memberIntroduction ? (
          <p className="text-2xl">{memberIntroduction}</p>
        ) : (
          <p className="text-gray-300">나에 대해 소개해주세요</p>
        )}
      </div>
    </div>
  );
};
export default Introduction;
