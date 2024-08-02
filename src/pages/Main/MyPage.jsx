import React, { useEffect } from "react";
import NavBar from "../../components/NavBar";
import MainGradientBackground from "../../components/Common/MainGradientBackground";
import MyPageFrame from "../../components/My_page/MyPageFrame";
import { EditIcon } from "../../components/My_page/EditIcon";
import { PublicIcon } from "../../components/My_page/PublicIcon";
import useMypageStore from "../../store/useMypageStore";

const MyPage = () => {
  const {
    memberName,
    memberProviderEmail,
    memberProfileImageUrl,
    memberIntroduction,
    memberHistoryList,
    memberMemoryboxList,
    fetchdata,
  } = useMypageStore();
  useEffect(() => {
    fetchdata("/member/mypage");
  },[fetchdata]);
  return (
    <>
      <MainGradientBackground>
        <MyPageFrame>
          <div className="flex flex-col items-center gap-6">
            <div className="w-[800px] flex flex-col">
              <NavBar />
              <div className="flex justify-between">
                <div className="w-[33%]"></div>
                <div className="w-[33%">
                  <h1 className="text-4xl">My Page</h1>
                </div>
                <div className="flex justify-end items-center gap-5 w-[33%]">
                  <EditIcon />
                  <PublicIcon />
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex p-5 gap-5 relative">
                <div>프로필 이미지</div>
                <div className="flex flex-col">
                  <p>이름 : {memberName}</p>
                  <p>E-mail : {memberProviderEmail}</p>
                </div>
              </div>
              <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex items-start p-5 gap-5 relative">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl">History</h1>
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-[820px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex items-start p-5 gap-5 relative">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl">소개</h1>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="w-[820px] h-[300px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex flex-col p-5 gap-5 relative">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl">추억 상자</h1>
                </div>
                <div>
                  <div className="h-[200px] w-[200px] bg-white flex justify-center items-center">
                    <div className="h-[150px] w-[150px] bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MyPageFrame>
      </MainGradientBackground>
    </>
  );
};

export default MyPage;
