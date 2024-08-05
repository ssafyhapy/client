import React from "react";
import homeMask from "../../assets/Main_page/home_mask.png"
import homeCamera from "../../assets/Main_page/home_camera.png"
import homeReport from "../../assets/Main_page/home_report.png"

const Service = () => {
  return (
    <div className="flex flex-col items-center mt-5 h-[350px]">
      <p className="text-sm opacity-80">
        사르르는 어떤 목적으로 모인 그룹이든 첫 만남에 어색하지 않도록
      </p>
      <p className="text-sm opacity-80">
        서로를 알아가는 시간을 가질 수 있도록 다양한 게임으로 구성된 화상 채팅
        서비스입니다.
      </p>
      <p className="text-sm opacity-80">
        구성되어 있는 게임들을 하나하나 따라가는 것만으로도 서로를 더 잘
        이해하게 될 거예요.
      </p>

      <h1 className="text-base text-[#4D98F7] mt-5 mb-5">
        사르르만의 독특한 서비스
      </h1>

      <div className="flex flex-col justify-start border-4">
        <div className="flex items-center gap-10 ">
          <div>
            <img src={homeMask} alt="" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm opacity-80">
              온라인에서의 첫 만남이 조금 덜 어색하고, 조금 더 재미있도록!{" "}
            </p>
            <p className="text-sm opacity-80">
              가면을 쓰고 게임을 하며 알아가는 시간을 가져요.가면은 마지막
              세션인 랩업에서 벗게 될 거예요.
            </p>
          </div>
        </div>

        <div className="flex items-center ml-auto">
          <div className="flex flex-col gap-2">
            <p className="text-sm opacity-80">
              오늘 우리가 처음 만난 이 순간! 기념촬영을 해 기록을 남겨요.{" "}
            </p>
            <p className="text-sm opacity-80">
              나중에 마이페이지의 추억상자에서 다시 보며 추억을 되새길 수
              있어요.
            </p>
          </div>
          <div>
            <img src={homeCamera} alt="" />
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div>
            <img src={homeReport} alt="" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm opacity-80">
              게임이 모두 끝나면 오늘 한 플레이에 대한 레포트를 받아보실 수
              있어요.{" "}
            </p>
            <p className="text-sm opacity-80">
              각자 했던 자기소개나 나를 맞춰봐 문제들을 다시 확인할 수 있어요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
