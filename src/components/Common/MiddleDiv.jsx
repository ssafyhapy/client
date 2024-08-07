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

  useEffect(() => {
    console.log("[*] 정보 확인", mainStreamManager);
  }, [mainStreamManager]);

  // 동적으로 grid-cols 클래스를 생성
  const getGridColsClass = () => {
    const count = 1 + subscribers.length;
    return `grid-cols-${Math.min(count, 3)}`;
  };

  return (
    <div id="middleDiv" className="flex justify-center h-[75vh] w-[95%] m-3">
      <div className="bg-[rgba(255,255,255,0.9)] flex-[7] h-full mr-5 rounded-[20px] flex justify-center items-center overflow-auto">
        <div className={`grid gap-4 w-full h-full p-4 place-items-center ${getGridColsClass()}`}>
          {/* 화면 나오기 */}
          {mainStreamManager ? (
            <div className="relative w-full h-0 pb-[56.25%] bg-red-300 rounded-[15px]">
              <video
                autoPlay={true}
                ref={(video) =>
                  video && mainStreamManager.addVideoElement(video)
                }
                className="absolute top-0 left-0 w-full h-full object-cover rounded-[15px]"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
                <div className="w-full text-white flex absolute bottom-0">
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
          ) : (
            <div>비디오를 연결하고 있습니다.</div>
          )}
          {subscribers &&
            subscribers.length > 0 &&
            subscribers.map((sub, index) => (
              <div
                key={index}
                className="relative w-full h-0 pb-[56.25%] bg-red-300 rounded-[15px]"
              >
                <video
                  autoPlay={true}
                  ref={(video) => video && sub.addVideoElement(video)}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-[15px]"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
                  <div className="w-full text-white flex absolute bottom-0">
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
            ))}
        </div>
      </div>
      <div className="h-full rounded-[20px] flex flex-col justify-center items-center overflow-hidden">
        <Chatbox />
      </div>
    </div>
  );
};

export default MiddleDiv;
