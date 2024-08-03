import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import MainGradientBackground from "../../components/Common/MainGradientBackground";
import MyPageFrame from "../../components/My_page/MyPageFrame";
import {
  useMypageStore,
  useUpdateMypageStore,
} from "../../store/useMypageStore";
import Header from "../../components/My_page/Header";
import Profile from "../../components/My_page/Profile";
import History from "../../components/My_page/History";
import Introduction from "../../components/My_page/Introduction";
import Memory from "../../components/My_page/Memory";
import MemoryBox from "../../components/My_page/MemoryBox";
import { useForm } from "react-hook-form";

const MyPage = () => {
  const {
    memberName,
    memberProviderEmail,
    memberProfileImageUrl,
    memberIntroduction,
    memberHistoryList,
    memberMemoryboxList,
    fetchData,
    updateData,
  } = useMypageStore();

  const { isEditMode, setEditMode } = useUpdateMypageStore();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchData("/member/mypage");
  }, [fetchData]);

  const onSubmit = (data) => {
    updateData("/member/mypage", data);
    setEditMode(false);
  };

  return (
    <>
      <MainGradientBackground>
        <MyPageFrame>
          <div className="flex flex-col items-center gap-6">
            <div className="w-[800px] flex flex-col">
              <NavBar />
              <Header
                isEditMode={isEditMode}
                setEditMode={setEditMode}
                onSubmit={handleSubmit(onSubmit)}
              />
            </div>

            <form className="flex flex-col items-center gap-5">
              <div className="flex gap-5">
                <Profile
                  memberName={memberName}
                  memberProfileImageUrl={memberProfileImageUrl}
                  memberProviderEmail={memberProviderEmail}
                />
                <History
                  memberHistoryList={memberHistoryList}
                  isEditMode={isEditMode}
                  register={register}
                />
              </div>
              <div className="flex gap-5">
                <Introduction
                  memberIntroduction={memberIntroduction}
                  isEditMode={isEditMode}
                  register={register}
                />
              </div>
              <div className="flex">
                <Memory memberMemoryboxList={memberMemoryboxList}>
                  <MemoryBox />
                </Memory>
              </div>
            </form>
          </div>
        </MyPageFrame>
      </MainGradientBackground>
    </>
  );
};

export default MyPage;
