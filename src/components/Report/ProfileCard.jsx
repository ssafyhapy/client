import React from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({ memberId, memberName, memberProfileImageUrl }) => {
  return (
    <div className="flex flex-col items-center w-[125px]">
      <Link to={`/member/${memberId}`}>
        <div className="bg-white rounded-full h-[125px] w-[125px] flex justify-center items-center overflow-hidden">
          <img
            src={memberProfileImageUrl}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <h1 className="text-center truncate">{memberName}</h1>
    </div>
  );
};

export default ProfileCard;
