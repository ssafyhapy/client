import React, { useState, useEffect, useRef } from "react";
import Photograph_final from "./Photograph_final";
import GameTurns from "./../Common/GameTurns";
import TakePhotoModal from "./TakePhotoModal";
import html2canvas from "html2canvas";

import { useNavigate } from "react-router-dom";
import useGameStore from "../../store/useGameStore";
import { axiosInstance } from "../../api/apiClient";

import useRoomStore from "../../store/useRoomStore";
import useAuthStore from "../../store/useAuthStore";

const PhotographLast = () => {
  const { gameStep } = useGameStore();
  const { publisher, subscribers, connectionInfo } = useGameStore();

  // const pics = Array(6).fill("pic");
  const [showModal, setShowModal] = useState(false);
  const photoRef = useRef(null);
  const { memberId } = useAuthStore();
  const { roomId, hostId } = useRoomStore();

  const navigate = useNavigate();

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
            // Blob을 FormData에 추가
          const formData = new FormData();
          formData.append("image", blob, "capture.png");

          try {
            // 서버에 이미지 업로드
            const response = await axiosInstance.post(
              `/room/${roomId}/memoryBox/after`,
              formData
            );
            console.log("Success:", response.data);
          } catch (error) {
            console.error("Error:", error);
          }
          }  
        }, "image/png"); // 이미지 포맷 설정
      });
      // 업로드 후 모달 닫기
      setShowModal(false);

      // 사진찍고 2초뒤 자동으로 레포트 페이지로 이동
      setTimeout(() => {
        navigate(`/room/${roomId}/report`);
      }, 2000);
    }
  };

  // 비디오 크기를 동적으로 조정하는 함수
  const getVideoContainerClass = () => {
    const count = 1 + subscribers.length;
    // const count = 6;
    if (count === 1) return "w-[30%] max-w-[300px] min-w-[230px]";
    if (count === 2) return "w-[30%] max-w-[250px] min-w-[200px]";
    if (count >= 3) return "w-[30%] max-w-[200px] min-w-[200px]";
  };

  const getMicIcon = (isAudioActive) => {
    return isAudioActive
      ? "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic_on.png"
      : "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mute.png";
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        style={{ height: "calc(100vh - 50px)" }}
        className="w-1/2 bg-[rgba(255,255,255,0.6)] flex flex-col justify-between"
      >
        <div
          ref={photoRef}
          className="h-4/5 bg-custom-gradient-game mr-[44px] ml-[44px] mt-[35px] mb-[39px] p-4 rounded-lg grid grid-cols-2 place-items-center gap-4"
          // style={{
          //   backgroundImage:
          //     "url('https://sarrr.s3.ap-northeast-2.amazonaws.com/artwork-7182531_1280.jpg')",
          //   backgroundSize: "cover", // 이미지가 요소를 완전히 덮도록 설정
          //   backgroundPosition: "center", // 이미지가 중앙에 위치하도록 설정
          // }}
        >
          {publisher ? (
            <div
              id={publisher.stream.connection.connectionId}
              className={`flex justify-center items-center rounded-[15px] ${getVideoContainerClass()} bg-white`}
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
                    className={`flex justify-center items-center rounded-[15px] ${getVideoContainerClass()} bg-white`}
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
      {/* <div className="m-2 flex items-center justify-center">
        <GameTurns gameStep={gameStep} />
      </div>
      <div className="text-center text-sm m-5 font-bold">
        <Photograph_intro />
      </div> */}
      {showModal && <TakePhotoModal onCapture={handleCapture} />}
    </div>
  );
};

//   return (
//     <>
//       <div
//         ref={photoRef}
//         style={{ height: "calc(100vh - 50px)" }}
//         className="w-1/2 bg-[rgba(255,255,255,0.6)] flex flex-col justify-between"
//       >
//         <div className="h-4/5 bg-[rgba(255,255,255,0.7)] mr-[44px] ml-[44px] mt-[35px] mb-[39px] p-4 grid grid-cols-2 gap-4">
//           {publisher ? (
//             <div
//               id={publisher.stream.connection.connectionId}
//               className={`flex justify-center items-center rounded-[15px] ${getVideoContainerClass()}`}
//             >
//               <div className="w-full relative rounded-[15px]">
//                 {publisher ? (
//                   <video
//                     autoPlay={true}
//                     ref={(video) => video && publisher.addVideoElement(video)}
//                     className="object-cover rounded-[15px]"
//                   />
//                 ) : (
//                   "비디오가 준비 중입니다."
//                 )}
//                 <div className="w-full absolute bottom-0 text-white flex justify-between z-20">
//                   <span className="flex ">
//                     <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//                       {
//                         connectionInfo[publisher.stream.connection.connectionId]
//                           .memberName
//                       }
//                     </span>
//                     <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//                       <img
//                         src={getMicIcon(publisher.stream.audioActive)}
//                         alt="mic icon"
//                         className="w-[12px] h-[18px]"
//                       />
//                     </span>
//                   </span>
//                   <span
//                     className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0 ${
//                       false ? null : "hidden"
//                     }`}
//                   >
//                     준비완료
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ) : null}

//           {/* 여러명 있을 때 */}
//           {subscribers.length > 0 ? (
//             // 구독자 비디오 표현
//             <>
//               {/* 구독자 비디오 배경 */}
//               {/* 구독자 비디오 돌리기 */}
//               {subscribers.map((sub) => {
//                 const connectionId = sub.stream?.connection?.connectionId;
//                 if (!connectionId) {
//                   console.warn(`No connectionId found for subscriber:`, sub);
//                   return null;
//                 }

//                 return (
//                   <div
//                     key={connectionId}
//                     id={connectionId}
//                     className={`flex justify-center items-center rounded-[15px] ${getVideoContainerClass()}`}
//                   >
//                     <div className="w-full relative rounded-[15px]">
//                       <div id="subscriber">
//                         <video
//                           autoPlay={true}
//                           ref={(video) => video && sub.addVideoElement(video)}
//                           className="object-cover rounded-[15px]"
//                         />
//                       </div>

//                       <div className="w-full absolute bottom-0 text-white flex justify-between z-20">
//                         <span className="flex ">
//                           <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//                             {/* 이름 */}
//                             {
//                               connectionInfo[sub.stream.connection.connectionId]
//                                 .memberName
//                             }
//                           </span>
//                           <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//                             {/* 마이크 상태 */}
//                             <img
//                               src={getMicIcon(sub.stream.audioActive)}
//                               alt="mic icon"
//                               className="w-[12px] h-[18px]"
//                             />
//                           </span>
//                         </span>
//                         <span
//                           className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0 ${
//                             false ? null : "hidden"
//                           }`}
//                         >
//                           {/* 준비완료 */}
//                           준비완료
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </>
//           ) : null}
//           {/* </div> */}
//           {/* {pics.map((pic, index) => (
//             <div key={index} className="flex items-center justify-center">
//               <p className="m-5">{pic}</p>
//             </div>
//           ))} */}
//           {/* {pics.map((pic, index) => (
//             <div key={index} className="flex items-center justify-center">
//               <p className="m-5">{pic}</p>
//             </div>
//           ))} */}
//         </div>
//         <div className="m-2 flex items-center justify-center">
//           <GameTurns gameStep={gameStep} />
//         </div>
//         <div className="text-center text-sm m-5 font-bold">
//           <Photograph_final />
//         </div>
//       </div>
//       {showModal && <TakePhotoModal onCapture={handleCapture} />}
//     </>
//   );
// };

export default PhotographLast;
