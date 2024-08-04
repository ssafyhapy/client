import React from "react";
import { useFormContext } from "react-hook-form";

const Introduction = ({ memberIntroduction, isEditMode }) => {
  const { register } = useFormContext();
  return (
    <div className="w-[820px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex items-start p-5 gap-5 relative">
      <div className="flex flex-col justify-center gap-2">
        <h1 className="text-2xl">소개</h1>
        {isEditMode ? (
          <textarea
            {...register("memberIntroduction")}
            defaultValue={memberIntroduction?.memberIntroduction}
            className="bg-blue-100 border-2 border-blue-500 shadow-md p-4 rounded-lg resize-y min-h-[120px] text-lg w-[780px]"
          />
        ) : (
          <p>{memberIntroduction?.memberIntroduction}</p>
        )}
      </div>
    </div>
  );
};
export default Introduction;
