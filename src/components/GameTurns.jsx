import React from "react";
import checkedCircle from "./../assets/checked.png";
import circle from "./../assets/circle.png";
import arrow from "./../assets/arrow.png";
const GameTurns = ({sectionNumber}) => {

  return (
    <>
        <div className="flex justify-around w-[555px] h-[54px]">
          <div className="flex flex-col items-center justify-center h-full">
            <img src={checkedCircle} alt="" />
            <div>한 줄 자기소개</div>
          </div>
            <img src={arrow} alt="" />
          <div className="flex flex-col items-center justify-center h-full">
            <img src={checkedCircle} alt="" className={`${sectionNumber<2 ? "hidden" : null }`}/>
            <img src={circle} alt="" className={`${sectionNumber>=2 ? "hidden" : null }`}/>
            <div>나를 맞춰봐</div>
          </div>
            <img src={arrow} alt="" />
          <div className="flex flex-col items-center justify-center h-full">
            <img src={checkedCircle} alt="" className={`${sectionNumber<3 ? "hidden" : null }`}/>
            <img src={circle} alt="" className={`${sectionNumber>=3 ? "hidden" : null }`}/>
            <div>밸런스 게임</div>
          </div>
        </div>
    </>
  );
};

export default GameTurns;
