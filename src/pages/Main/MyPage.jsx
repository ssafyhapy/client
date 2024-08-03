import React, { useEffect } from "react";
import NavBar from "../../components/NavBar";
import MainGradientBackground from "../../components/Common/MainGradientBackground";
import MyPageFrame from "../../components/My_page/MyPageFrame";
import useMypageStore from "../../store/useMypageStore";
import Header from "../../components/My_page/Header";
import Profile from "../../components/My_page/Profile";
import History from "../../components/My_page/History";
import Introduction from "../../components/My_page/Introduction";
import Memory from "../../components/My_page/Memory";
import MemoryBox from "../../components/My_page/MemoryBox";


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
  }, [fetchdata]);
  return (
    <>
      <MainGradientBackground>
        <MyPageFrame>
          <div className="flex flex-col items-center gap-6">
            <div className="w-[800px] flex flex-col">
              <NavBar />
              <Header />
            </div>

            <div className="flex gap-5">
              <Profile
                memberName={memberName}
                memberProfileImageUrl={memberProfileImageUrl}
                memberProviderEmail={memberProviderEmail}
              />
              <History memberHistoryList={memberHistoryList} />
            </div>
            <div className="flex gap-5">
              <Introduction memberIntroduction={memberIntroduction} />
            </div>
            <div className="flex">
              <Memory memberMemoryboxList={memberMemoryboxList}>
                <MemoryBox />
              </Memory>
            </div>
          </div>
        </MyPageFrame>
      </MainGradientBackground>
    </>
  );
};

export default MyPage;
