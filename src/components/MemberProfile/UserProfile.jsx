import React, { useState } from "react";

const UserProfile = ({memberName, memberProviderEmail, memberProfileImageUrl}) => {
  return (
    <div className="w-full h-full flex flex-col items-center bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] p-5 gap-5">
      <img
        src={memberProfileImageUrl}
        alt="Profile"
        className="w-[160px] h-[160px] object-cover rounded-lg"
      />
      {/* 이름, 이메일 출력 */}
      <div className="w-full h-auto flex flex-col items-center">
        <p className="text-3xl">{memberName}</p>
        <p>{memberProviderEmail}</p>
      </div>
    </div>
  );
};
export default UserProfile;
