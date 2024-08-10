import React from "react";
import NavBar from "../../NavBar";
import PlayBtn from "../../Buttons/PlayBtn";
import MainHomeFrame from "../MainHomeFrame";
import ScrollDownBtn from "../ScrollDownBtn";
import RotateDescription from "../RotateDescription";

const FirstService = () => {
  return (
    <MainHomeFrame>
      <div className="flex flex-col w-[80%] h-[80%] justify-between items-center">
        <NavBar />
        <RotateDescription
          sentences={[
            "어떤 목적으로 모인 그룹이든",
            "첫 만남에 어색하지 않도록",
            "서로 알아가는 시간을 가지도록",
            "다양한 게임으로 구성된",
            "화상 채팅 서비스입니다.",
            "구성되어 있는 게임들을",
            "하나하나 따라가는 것만으로도",
            "서로를 더 잘 이해하게 될 거예요.",
          ]}
          fontsize="64px"
        />
        <div className="flex justify-between w-full">
          <div className="w-[33%]"></div>
          <ScrollDownBtn text="사르르 서비스 확인하기" color="#000000" />
          <div className="w-[33%] flex justify-end">
            <PlayBtn />
          </div>
        </div>
      </div>
    </MainHomeFrame>
  );
};

export default FirstService;
