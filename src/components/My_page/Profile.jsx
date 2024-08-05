import React, { useState } from "react";
import { useMypageStore } from "../../store/useMypageStore";
import { useFormContext } from "react-hook-form";

const Profile = ({ isEditMode }) => {
  const { register, setValue, getValues } = useFormContext();
  const { memberName, memberProviderEmail, memberProfileImageUrl } =
    useMypageStore();
  const [previewImage, setPreviewImage] = useState(memberProfileImageUrl);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue("memberProfileImage", file); // 이미지를 form 데이터로 설정
    }
  };

  return (
    <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex p-5 gap-5 relative">
      {isEditMode ? (
        <div className="relative w-[160px] h-[160px]">
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            {...register("memberProfileImage", { onChange: handleImageChange })}
          />
          <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
            {previewImage ? (
              <img src={previewImage} alt="미리보기" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400">이미지를 선택하세요</span>
            )}
          </div>
        </div>
      ) : (
        <img src={memberProfileImageUrl} alt="Profile" className="w-[160px] h-[160px] object-cover rounded-lg" />
      )}

      <div className="flex flex-col">
        <p>이름 : {memberName}</p>
        <p>E-mail : {memberProviderEmail}</p>
      </div>
    </div>
  );
};
export default Profile;
