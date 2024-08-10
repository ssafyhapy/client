import React, { useState } from "react";
import { useMypageStore } from "../../store/useMypageStore";
import { useFormContext } from "react-hook-form";

const Profile = ({ isEditMode }) => {
  const { setValue } = useFormContext();
  const { memberName, memberProviderEmail, memberProfileImageUrl } =
    useMypageStore();
  // 이미지 미리보기 상태
  const [previewImage, setPreviewImage] = useState("");

  // 이미지 변경 이벤트 핸들러
  const handleImageChange = (e) => {
    // 파일 객체 가져오기
    const file = e.target.files[0];
    // 파일이 존재하면
    if (file) {
      // 이미지 미리보기 설정
      setPreviewImage(URL.createObjectURL(file));
      // 이미지를 form 데이터로 설정
      setValue("memberProfileImage", file); 
    }
  };

  return (
    <div className="w-full h-full bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex p-5 gap-5 relative">
      {isEditMode ? (
        <div className="relative w-[160px] h-[160px]">
          {/* 이미지 업로드 input */}
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange = {handleImageChange}
          />
          <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
            {/* 업로드 이미지 미리보기 */}
            {previewImage ? (
              <img src={previewImage} alt="미리보기" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400">이미지를 선택하세요</span>
            )}
          </div>
        </div>
      ) : (
        // 프로필 이미지
        <img src={memberProfileImageUrl} alt="Profile" className="w-[160px] h-[160px] object-cover rounded-lg" />
      )}

      {/* 이름, 이메일 출력 */}
      <div className="flex flex-col">
        <p className="whitespace-nowrap">이름 : {memberName}</p>
        <p className="whitespace-nowrap">E-mail : {memberProviderEmail}</p>
      </div>
    </div>
  );
};
export default Profile;
