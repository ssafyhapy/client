import React from "react";
import MainGradientBackground from "../../components/Common/MainGradientBackground";
import MyPageFrame from "../../components/My_page/MyPageFrame";
import NavBar from "../../components/NavBar";
import Carousel from "../../components/Carousel";

const Report = () => {
  return (
    <>
      <MainGradientBackground>
        <MyPageFrame>
          <div className="flex flex-col items-center gap-5">
            <div className="w-[800px]">
              <NavBar />
            </div>

            <div className="w-[800px]">
              <h1 className="text-4xl font-bold text-center">Report</h1>
            </div>

            <div className="flex gap-5">
              <div className="bg-white rounded-full h-[125px] w-[125px] flex justify-center items-center">프로필 사진</div>
              <div className="bg-white rounded-full h-[125px] w-[125px]"></div>
              <div className="bg-white rounded-full h-[125px] w-[125px]"></div>
              <div className="bg-white rounded-full h-[125px] w-[125px]"></div>
              <div className="bg-white rounded-full h-[125px] w-[125px]"></div>
              <div className="bg-white rounded-full h-[125px] w-[125px]"></div>
            </div>

            <div className="flex gap-5 mt-5">
              <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] rounded-[20px] flex p-5 gap-5 relative">
                <div className="absolute top-[-10px] left-[-10px] rounded-[20px] bg-white w-[20%] h-[20%] flex justify-center items-center" >
                  <h1>step 1</h1>
                </div>
                <Carousel>
                  <h1>나는 캐러셀이다.</h1>
                </Carousel>
              </div>

              <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] rounded-[20px] flex p-5 gap-5 relative">
              <div className="absolute top-[-10px] left-[-10px] rounded-[20px] bg-white w-[20%] h-[20%] flex justify-center items-center" >
                  <h1>step 2</h1>
                </div>
                <Carousel>
                  <h1>나도 캐러셀이다.</h1>
                </Carousel>
              </div>
            </div>

            <div>
              <div className="w-[820px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] rounded-[20px] flex p-5 gap-5 relative">
              <div className="absolute top-[-10px] left-[-10px] rounded-[20px] bg-white w-[10%] h-[20%] flex justify-center items-center">
                  <h1>step 3</h1>
                </div>
                <Carousel>
                  <h1>애도 캐러셀이다.</h1>
                </Carousel>
              </div>
            </div>

            <div>
              <div className="w-[820px] h-full bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex p-5 gap-5 relative">
                <div className="h-[200px] w-[50%] bg-white flex justify-center items-center">
                  <div className="h-[150px] w-[90%] bg-gray-300 flex justify-center items-center">before</div>
                </div>
                <div className="h-[200px] w-[50%] bg-white flex justify-center items-center">
                  <div className="h-[150px] w-[90%] bg-gray-300 flex justify-center items-center">after</div>
                </div>
              </div>
            </div>
          </div>
        </MyPageFrame>
      </MainGradientBackground>
    </>
  );
};

export default Report;
