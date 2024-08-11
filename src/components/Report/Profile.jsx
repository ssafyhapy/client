import React from "react";
import ProfileCard from "./ProfileCard";

const Profile = ({ members }) => {
  return (
    <>
      {members?.map((member) => (
        <ProfileCard
          key={member.memberName}
          memberName={member.memberName}
          memberProfileImageUrl={member.memberProfileImageUrl}
        />
      ))}
    </>
  );
};

export default Profile;
