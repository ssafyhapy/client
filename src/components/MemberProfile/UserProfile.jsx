import React, { useState } from "react";

const UserProfile = ({memberName, memberProviderEmail, memberProfileImageUrl}) => {
  return (
    <div className="w-full h-full bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex p-5 gap-5">
      <img
        src={memberProfileImageUrl}
        alt="Profile"
        className=" flex-shrink-0 w-[160px] h-[160px] object-cover rounded-lg"
      />
      {/* 이름, 이메일 출력 */}
      <div className="w-full h-auto">
        <p className="whitespace-nowrap">이름 : {memberName}</p>
        <p className="whitespace-nowrap">E-mail : {memberProviderEmail}</p>
      </div>
    </div>
  );
};
export default UserProfile;
