import React from "react";
import ProfileCard from "./ProfileCard";

const Profile = ({ members }) => {
  return (
    <>
      {members?.map((member) => (
        <ProfileCard
          key={member.memberId}
          memberId={member.memberId}
          memberName={member.memberName}
          memberProfileImageUrl={member.memberProfileImageUrl}
        />
      ))}
    </>
  );
};

export default Profile;
