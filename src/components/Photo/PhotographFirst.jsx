import React, { useState, useEffect, useRef } from "react";
import Photograph_intro from "./Photograph_intro";
import GameTurns from "./../Common/GameTurns";
import TakePhotoModal from "./../Photo/TakePhotoModal";
import html2canvas from "html2canvas";
import useGameStore from "./../../store/useGameStore";
import useRoomStore from "../../store/useRoomStore";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/apiClient";

const PhotographFirst = () => {
  const { publisher, subscribers, connectionInfo } = useGameStore();
  const [showModal, setShowModal] = useState(false);
  const photoRef = useRef(null);
  const { roomId, hostId } = useRoomStore();
  const navigate = useNavigate();
  const { memberId } = useAuthStore();
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCapture = async () => {
    if (photoRef.current) {
      html2canvas(photoRef.current).then((canvas) => {
        canvas.toBlob(async (blob) => {
          if (memberId === hostId) {
            const formData = new FormData();
            formData.append("image", blob, "capture.png");

            try {
              const response = await axiosInstance.post(
                `/room/${roomId}/memoryBox/before`,
                formData
              );
              console.log("Success:", response.data);
            } catch (error) {
              console.error("Error:", error);
            }
          }
        }, "image/png");
      });

      setTimeout(() => {
        setShowModal(false);
        setGameStep("guess-me");
      }, 2000);
    }
  };

  const getGridColsClass = () => {
    const count = 1 + subscribers.length;
    return `grid-cols-${Math.min(count, 3)}`;
  };

  const getVideoContainerClass = () => {
    const count = 1 + subscribers.length;
    if (count === 1) return "max-w-[300px] min-w-[230px]";
    if (count === 2) return "max-w-[250px] min-w-[200px]";
    if (count >= 3) return "max-w-[150px] min-w-[200px]";
  };

  const getMicIcon = (isAudioActive) => {
    return isAudioActive
      ? "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic_on.png"
      : "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mute.png";
  };

  return (
    <div className="w-full h-screen bg-custom-gradient-game flex items-center justify-center">
      <div
        style={{ height: "calc(100vh - 50px)" }}
        className="w-1/2 bg-[rgba(255,255,255,0.6)] flex flex-col justify-between"
      >
        <div
          ref={photoRef}
          className="h-4/5 bg-[rgba(200,200,200,0.7)] mr-[44px] ml-[44px]
          mt-[35px] mb-[39px] p-4 border-4 border-gray-500 rounded-lg grid grid-cols-2 place-items-center gap-4"
          // 변경된 부분: 옅은 회색 배경과 프레임(border) 추가
        >
          {publisher ? (
            <div
              id={publisher.stream.connection.connectionId}
              className={`flex justify-center items-center rounded-[15px] ${getVideoContainerClass()} bg-white border-2 border-gray-300`}
              // 변경된 부분: 비디오 주변에 흰색 배경과 얇은 테두리 추가
            >
              <div className="w-full relative rounded-[15px]">
                {publisher ? (
                  <video
                    autoPlay={true}
                    ref={(video) => video && publisher.addVideoElement(video)}
                    className="object-cover rounded-[15px]"
                  />
                ) : (
                  "비디오가 준비 중입니다."
                )}
                <div className="w-full absolute bottom-0 text-white flex justify-between z-20">
                  <span className="flex ">
                    <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                      {
                        connectionInfo[publisher.stream.connection.connectionId]
                          .memberName
                      }
                    </span>
                    <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                      <img
                        src={getMicIcon(publisher.stream.audioActive)}
                        alt="mic icon"
                        className="w-[12px] h-[18px]"
                      />
                    </span>
                  </span>
                  <span
                    className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0 ${
                      false ? null : "hidden"
                    }`}
                  >
                    준비완료
                  </span>
                </div>
              </div>
            </div>
          ) : null}
          {subscribers.length > 0 ? (
            <>
              {subscribers.map((sub) => {
                const connectionId = sub.stream?.connection?.connectionId;
                if (!connectionId) {
                  console.warn(`No connectionId found for subscriber:`, sub);
                  return null;
                }
                return (
                  <div
                    key={connectionId}
                    id={connectionId}
                    className={`flex justify-center items-center rounded-[15px] ${getVideoContainerClass()} bg-white border-2 border-gray-300`}
                    // 변경된 부분: 비디오 주변에 흰색 배경과 얇은 테두리 추가
                  >
                    <div className="w-full relative rounded-[15px]">
                      <div id="subscriber">
                        <video
                          autoPlay={true}
                          ref={(video) => video && sub.addVideoElement(video)}
                          className="object-cover rounded-[15px]"
                        />
                      </div>
                      <div className="w-full absolute bottom-0 text-white flex justify-between z-20">
                        <span className="flex ">
                          <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                            {
                              connectionInfo[sub.stream.connection.connectionId]
                                .memberName
                            }
                          </span>
                          <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                            <img
                              src={getMicIcon(sub.stream.audioActive)}
                              alt="mic icon"
                              className="w-[12px] h-[18px]"
                            />
                          </span>
                        </span>
                        <span
                          className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0 ${
                            false ? null : "hidden"
                          }`}
                        >
                          준비완료
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
      <div className="m-2 flex items-center justify-center">
        <GameTurns gameStep={gameStep} />
      </div>
      <div className="text-center text-sm m-5 font-bold">
        <Photograph_intro />
      </div>
      {showModal && <TakePhotoModal onCapture={handleCapture} />}
    </div>
  );
};

export default PhotographFirst;
