import React, { useState, useEffect, useRef } from "react";
import Photograph_intro from "./Photograph_intro";
import GameTurns from "./../Common/GameTurns";
import TakePhotoModal from "./../Photo/TakePhotoModal";
import html2canvas from "html2canvas";
import useGameStore from "./../../store/useGameStore";
import useRoomStore from "../../store/useRoomStore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/apiClient";
const PhotographFirst = () => {
  const { publisher, subscribers, connectionInfo } = useGameStore();

  const pics = Array(6).fill("pic");
  const [showModal, setShowModal] = useState(false);
  const photoRef = useRef(null);
  const { roomId } = useRoomStore();
  const navigate = useNavigate();

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
          // Blob을 FormData에 추가
          const formData = new FormData();
          formData.append("image", blob, "capture.png");

          try {
            // 서버에 이미지 업로드
            const response = await axiosInstance.post(
              `/room/${roomId}/memoryBox/before`,
              formData
            );
            console.log("Success:", response.data);
            // 업로드 후 모달 닫기
            setShowModal(false);

            // 2초 뒤에 페이지 이동
            setTimeout(() => {
              setGameStep("guess-me");
              // navigate("/guessme-getready");
            }, 2000);
          } catch (error) {
            console.error("Error:", error);
          }
        }, "image/png"); // 이미지 포맷 설정
      });
    }
  };
  const getGridColsClass = () => {
    const count = 1 + subscribers.length;
    return `grid-cols-${Math.min(count, 3)}`;
  };

  // 비디오 크기를 동적으로 조정하는 함수
  const getVideoContainerClass = () => {
    const count = 1 + subscribers.length;
    // const count = 6;
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
          className="h-4/5 bg-[rgba(255,255,255,0.7)] mr-[44px] ml-[44px]
          mt-[35px] mb-[39px] p-1 grid grid-cols-2 place-items-center gap-1"
        >
          {publisher ? (
            <div
              id={publisher.stream.connection.connectionId}
              className={`flex justify-center items-center rounded-[15px] ${getVideoContainerClass()}`}
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
          {/* 여러명 있을 때 */}
          {subscribers.length > 0 ? (
            // 구독자 비디오 표현
            <>
              {/* 구독자 비디오 배경 */}
              {/* 구독자 비디오 돌리기 */}
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
                    className={`flex justify-center items-center rounded-[15px] ${getVideoContainerClass()}`}
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
                            {/* 이름 */}
                            {
                              connectionInfo[sub.stream.connection.connectionId]
                                .memberName
                            }
                          </span>
                          <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                            {/* 마이크 상태 */}
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
                          {/* 준비완료 */}
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
        {/* </div> */}
        {/* {pics.map((pic, index) => (
            <div key={index} className="flex items-center justify-center">
              <p className="m-5">{pic}</p>
            </div>
          ))} */}
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
