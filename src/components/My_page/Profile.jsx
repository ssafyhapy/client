import React from "react";

const Profile = ({
  memberProfileImageUrl,
  memberName,
  memberProviderEmail,
}) => {
  return (
    <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex p-5 gap-5 relative">
      <img src={memberProfileImageUrl} alt="" />
      <div className="flex flex-col">
        <p>이름 : {memberName}</p>
        <p>E-mail : {memberProviderEmail}</p>
      </div>
    </div>
  );
};
export default Profile;
