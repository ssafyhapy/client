import React, { useEffect } from "react";
import useGameStore from "../../store/useGameStore";
import Chatbox from "./Chatbox";
import useAuthStore from "../../store/useAuthStore";

const MiddleDiv = () => {
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const {
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
  } = useGameStore();

  const { memberName } = useAuthStore();

  const data = { ready: true, mic: true };

  // 동적으로 grid-cols 클래스를 생성
  const getGridColsClass = () => {
    const count = 1 + subscribers.length;
    // const count = 6;
    return `grid-cols-${Math.min(count, 3)}`;
  };

  useEffect(() => {
    console.log("[*] 정보 확인", mainStreamManager);
  }, [mainStreamManager]);

   // 비디오 크기를 동적으로 조정하는 함수
   const getVideoContainerClass = () => {
    const count = 1 + subscribers.length;
    // const count = 6;
    if (count === 1) return "w-[80%] max-w-[500px] min-w-[250px]";
    if (count === 2) return "w-[60%] max-w-[400px] min-w-[250px]";
    if (count >= 3) return "w-[40%] max-w-[400px] min-w-[250px]";
  };

  return (
    <div id="middleDiv" className="flex justify-center h-[68vh] w-[95%] m-3">
      <div
        className={`bg-[rgba(255,255,255,0.9)] w-[80%] h-full mr-5 rounded-[20px] grid place-items-center ${getGridColsClass()}`}
      >
        {/* mainStreamManager만 있을 때 */}
        {mainStreamManager ? (
          <div className={`w-[80%] p-5 bg-red-300 flex justify-center items-center rounded-[15px] ${getVideoContainerClass()}`}>
            <div className="w-full relative rounded-[15px]">
              {mainStreamManager ? (
                <video
                  autoPlay={true}
                  ref={(video) =>
                    video && mainStreamManager.addVideoElement(video)
                  }
                  className="object-cover rounded-[15px]"
                />
              ) : (
                "비디오가 준비 중입니다."
              )}
              <div className="w-full absolute bottom-0 text-white flex justify-between z-20">
                <span className="flex ">
                  <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                    {memberName}
                  </span>
                  <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                    <img
                      src="https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic_on.png"
                      alt="mic on"
                      className={`w-[12px] h-[18px] ${
                        data.mic ? null : "hidden"
                      }`}
                    />
                    <img
                      src="https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mute.png"
                      alt="mute"
                      className={`w-[12px] h-[18px] ${
                        data.mic ? "hidden" : null
                      }`}
                    />
                  </span>
                </span>
                <span
                  className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0 ${
                    data.ready ? null : "hidden"
                  }`}
                >
                  준비완료
                </span>
              </div>
            </div>
          </div>
        ) : null}      

        {/* 여러명 있을 때 */}
        {mainStreamManager && subscribers.length > 0 ? (
          // 구독자 비디오 표현
          // 구독자 비디오 배경
          <div className={`w-[80%] p-5 bg-red-300 flex justify-center items-center rounded-[15px] ${getVideoContainerClass()}`}>
            <div className="w-full relative rounded-[15px]">
              {/* 구독자 비디오 돌리기 */}
              {subscribers.map((sub, index) => (
                <div key={index} id="subscriber">
                  <video
                    autoPlay={true}
                    ref={(video) => video && sub.addVideoElement(video)}
                    className="object-cover rounded-[15px]"
                  />
                </div>
              ))}

              <div className="w-full absolute bottom-0 text-white flex justify-between z-20">
                <span className="flex ">
                  <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                    {/* 이름 */}
                    {memberName}
                  </span>
                  <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                    {/* 마이크 상태 */}
                    <img
                      src="https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic_on.png"
                      alt="mic on"
                      className={`w-[12px] h-[18px] ${
                        data.mic ? null : "hidden"
                      }`}
                    />
                    <img
                      src="https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mute.png"
                      alt="mute"
                      className={`w-[12px] h-[18px] ${
                        data.mic ? "hidden" : null
                      }`}
                    />
                  </span>
                </span>
                <span
                  className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0 ${
                    data.ready ? null : "hidden"
                  }`}
                >
                  {/* 준비완료 */}
                  준비완료
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Chatbox */}
      <div className="h-full rounded-[20px] flex flex-col justify-center items-center overflow-hidden">
        <Chatbox />
      </div>
    </div>
  );
};

export default MiddleDiv;
