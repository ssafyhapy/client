import React from "react";

const ProfileCard = ({ memberProfileImageUrl, memberName }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-full h-[125px] w-[125px] flex justify-center items-center overflow-hidden">
        <img
          src={memberProfileImageUrl}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>
      <h1>{memberName}</h1>
    </div>
  );
};

export default ProfileCard;
