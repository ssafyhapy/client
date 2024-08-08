import React from "react";
import MainGradientBackground from "../../components/Common/MainGradientBackground";
import MyPageFrame from "../../components/My_page/MyPageFrame";
import NavBar from "../../components/NavBar";
import Profile from "../../components/Report/Profile";
import Step1 from "../../components/Report/Step1";
import Step2 from "../../components/Report/Step2";
import Step3 from "../../components/Report/Step3";
import Picture from "../../components/Report/Picture";

const Report = () => {
  return (
    <>
      <MainGradientBackground>
        <MyPageFrame>
          <div className="flex flex-col items-center gap-5">
            <div className="w-[800px]">
              {/* // 네비게이션 바 */}
              <NavBar />
            </div>

            <div className="w-[800px]">
              {/* // 제목 */}
              <h1 className="text-4xl font-bold text-center">Report</h1>
            </div>

            <div className="flex gap-5">
              {/* // 프로필 */}
              <Profile />
            </div>

            <div className="flex gap-5 mt-5">
              {/* // 스텝 1, 2 */}
              <Step1 />
              <Step2 />
            </div>

            <div>
              {/* // 스텝 3 */}
              <Step3 />
            </div>

            <div>
              {/* // 활동 전후 사진 */}
              <Picture />
            </div>
          </div>
        </MyPageFrame>
      </MainGradientBackground>
    </>
  );
};

export default Report;
