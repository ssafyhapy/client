import React from "react";
import ProfileCard from "./ProfileCard";

const Profile = ({ members }) => {
  return (
    <div className="flex flex-wrap justify-between gap-5">
      {members?.map((member) => (
        <ProfileCard
          key={member.memberId}
          memberId={member.memberId}
          memberName={member.memberName}
          memberProfileImageUrl={member.memberProfileImageUrl}
        />
      ))}
    </div>
  );
};

export default Profile;
