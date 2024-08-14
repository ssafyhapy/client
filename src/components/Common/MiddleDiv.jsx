import React, { useEffect, useState, useRef } from "react";
import * as tmImage from "@teachablemachine/image";
const URL = "https://teachablemachine.withgoogle.com/models/ZkpyKO7ri";
import useGameStore from "../../store/useGameStore";
import Chatbox from "./Chatbox";
import useAuthStore from "../../store/useAuthStore";
import MicBtn from "../Buttons/MicBtn";
import EmojiBtn from "../Buttons/EmojiBtn";
import SelectEmoji from "./SelectEmoji";

import usePresenterStore from "../../store/usePresenterStore";
import webSocketService from "../../WebSocketService";
import useRoomStore from "../../store/useRoomStore";

const MiddleDiv = () => {
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
    connectionInfo,
  } = useGameStore();

  const { memberName, memberId } = useAuthStore();
  const { roomId } = useRoomStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log("클릭됨");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const data = { ready: true };

  // 마이크 상태에 따라 아이콘을 선택하는 함수
  const getMicIcon = (isAudioActive) => {
    return isAudioActive
      ? "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic_on.png"
      : "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mute.png";
  };

  // 동적으로 grid-cols 클래스를 생성
  const getGridColsClass = () => {
    const count = 1 + subscribers.length;
    // const count = 6;
    return `grid-cols-${Math.min(count, 3)}`;
  };

  useEffect(() => {
    console.log("[*] 정보 확인", publisher);
    console.log("[*] 정보 확인", subscribers);
  }, [publisher, subscribers]);

  // 비디오 크기를 동적으로 조정하는 함수
  const getVideoContainerClass = () => {
    const count = 1 + subscribers.length;
    // const count = 6;
    if (count === 1) return "w-[80%] max-w-[500px] min-w-[250px]";
    if (count === 2) return "w-[60%] max-w-[400px] min-w-[250px]";
    if (count >= 3) return "w-[40%] max-w-[400px] min-w-[250px]";
  };

  // const [redIds, setRedIds] = useState([]);
  // const [blueIds, setBlueIds] = useState([]);
  // blueIds, redIds usePresentStore에 저장해두었다 가져올것임

  const changeBackgroundColor = (id, color) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.backgroundColor = color;
    }
  };

  // 한 줄 자기소개 + 나를 맞춰봐!! 발표자 관련 =======================================================================
  // 발표자 백그라운드 노란색으로 하이라이트
  const currentPresenterId = usePresenterStore(
    (state) => state.currentPresenterId
  );
  const [highlightedElementId, setHighlightedElementId] = useState(null);

  // currentPresenterId 제대로 오는지 확인
  useEffect(() => {
    console.log("currentPresenterId updated to:", currentPresenterId);
    console.log("connectionInfo:", connectionInfo);
  }, [currentPresenterId, connectionInfo]);

  // 발표자 배경색 노란색으로 바꾸는거
  useEffect(() => {
    if (currentPresenterId === null) {
      if (highlightedElementId) {
        changeBackgroundColor(highlightedElementId, "");
        setHighlightedElementId(null); // Reset highlightedElementId
      }
      return; // Exit the effect early
    }

    // 현재 currentPresenterId & connectionInfo 가 잘 업데이트 된 상태인지 확인
    if (!currentPresenterId || Object.keys(connectionInfo).length === 0) {
      console.log(
        "Waiting for currentPresenterId or connectionInfo to be available..."
      );
      return; // Don't proceed until both are available
    }

    // 백그라운드 이미 설정된게 있으면 리셋
    if (highlightedElementId) {
      changeBackgroundColor(highlightedElementId, "");
    }

    // memberId === currentPresenterId 인 connectionId 찾아 (memberId가 string임에 주의!)
    const newHighlightedElementId = Object.keys(connectionInfo).find(
      (key) => parseInt(connectionInfo[key].memberId, 10) === currentPresenterId
    );

    if (newHighlightedElementId) {
      // Set the new highlighted element ID and change its background color
      setHighlightedElementId(newHighlightedElementId);
      changeBackgroundColor(newHighlightedElementId, "yellow");
    }

    // Log the new connectionId
    console.log(
      "New Highlighted Element ID (Connection ID):",
      newHighlightedElementId
    );
  }, [currentPresenterId, connectionInfo, highlightedElementId]);

  // ================================================================================================

  // 밸런스 게임! FIRST 고른 사람들에게 파란 배경색 부여 (SECOND는 빨간색)

  const { balanceGamePeopleChoiceInfo, resetBalanceGamePeopleChoiceInfo } =
    usePresenterStore();

  useEffect(() => {
    console.log("balanceGamePeopleChoice");
    // 빈배열인지 아닌지부터 먼저 검사
    if (
      Array.isArray(balanceGamePeopleChoiceInfo) &&
      balanceGamePeopleChoiceInfo.length > 0
    ) {
      balanceGamePeopleChoiceInfo.forEach((info) => {
        const connectionId = Object.keys(connectionInfo).find(
          (key) => parseInt(connectionInfo[key].memberId, 10) === info.memberId
        );

        if (connectionId) {
          const color = info.choice === "FIRST" ? "cornflowerblue" : "salmon";
          changeBackgroundColor(connectionId, color);
        }
      });
    } else {
      Object.keys(connectionInfo).forEach((key) => {
        const connectionId = connectionInfo[key].connectionId;
        changeBackgroundColor(connectionId, "");
      });
    }

    return () => {
      resetBalanceGamePeopleChoiceInfo([]);
    };
  }, [balanceGamePeopleChoiceInfo, connectionInfo]);

  // ================================================================================================

  // useEffect(() => {
  //   if (
  //     Array.isArray(guessMeGamePeopleSelection) &&
  //     guessMeGamePeopleSelection.length > 0 &&
  //     connectionInfo // connectionInfo가 유효한지 확인
  //   ) {
  //     // 필요한 작업 수행
  //     guessMeGamePeopleSelection.forEach((info) => {
  //       const connectionId = Object.keys(connectionInfo).find(
  //         (key) => parseInt(connectionInfo[key].memberId, 10) === info.memberId
  //       );

  //       if (connectionId) {
  //         let color = null;
  //         if (info.selection === "O") {
  //           color = "cornflowerblue";
  //         } else if (info.selection === "X") {
  //           color = "salmon";
  //         }
  //         changeBackgroundColor(connectionId, color);
  //       }
  //     });

  //     // 작업이 끝난 후 상태를 리셋
  //     resetGuessMePeopleSelection([]);
  //   } else if (
  //     Array.isArray(guessMeGamePeopleSelection) &&
  //     guessMeGamePeopleSelection.length === 0 &&
  //     connectionInfo // connectionInfo가 유효한지 확인
  //   ) {
  //     // 모든 연결 ID의 배경색을 초기화
  //     Object.keys(connectionInfo).forEach((key) => {
  //       changeBackgroundColor(key, ""); // 빈 문자열을 전달하여 배경색을 초기화
  //     });
  //   }
  // }, [guessMeGamePeopleSelection, connectionInfo]);

  // useEffect(() => {
  //   if (
  //     Array.isArray(guessMeGamePeopleSelection) &&
  //     guessMeGamePeopleSelection.length > 0
  //   ) {
  //     // 필요한 작업 수행
  //     guessMeGamePeopleSelection.forEach((info) => {
  //       const connectionId = Object.keys(connectionInfo).find(
  //         (key) => parseInt(connectionInfo[key].memberId, 10) === info.memberId
  //       );

  //       if (connectionId) {
  //         let color = null;
  //         if (info.selection === "O") {
  //           color = "cornflowerblue";
  //         } else if (info.selection === "X") {
  //           color = "salmon";
  //         }
  //         changeBackgroundColor(connectionId, color);
  //       }
  //     });

  //     // 작업이 끝난 후 상태를 리셋
  //     resetGuessMePeopleSelection([]);
  //   }
  //   else if (!guessMeGamePeopleSelection){

  //   }
  // }, [guessMeGamePeopleSelection, connectionInfo]);

  // useEffect(() => {
  //   // 빈배열인지 아닌지부터 먼저 검사
  //   if (
  //     Array.isArray(balanceGamePeopleChoiceInfo) &&
  //     balanceGamePeopleChoiceInfo.length > 0
  //   ) {
  //     balanceGamePeopleChoiceInfo.forEach((info) => {
  //       const connectionId = Object.keys(connectionInfo).find(
  //         (key) => parseInt(connectionInfo[key].memberId, 10) === info.memberId
  //       );

  //       if (connectionId) {
  //         const color = info.choice === "FIRST" ? "cornflowerblue" : "salmon";
  //         changeBackgroundColor(connectionId, color);
  //       }
  //     });
  //   }

  //   return () => {
  //     resetBalanceGamePeopleChoiceInfo();
  //   };
  // }, [balanceGamePeopleChoiceInfo, connectionInfo]);

  // =====================================================================================================

  // useEffect(() => {
  //   if (mainStreamManager) {
  //     setTimeout(() => {
  //       setRedIds(["con_RLqj1dwCk1"]);
  //     }, 3000);
  //   }
  // }, [mainStreamManager]);

  // 모션인식 관련 내용
  const videoRef = useRef(null);
  useEffect(() => {
    if (publisher && videoRef.current) {
      publisher.addVideoElement(videoRef.current);
    }
  }, [publisher]);

  const [model, setModel] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const [predictionResults, setPredictionResults] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const THRESHOLD = 0.75; // 임계치 값

  // 모델 로드
  useEffect(() => {
    async function loadModel() {
      const modelURL = `${URL}/model.json`;
      const metadataURL = `${URL}/metadata.json`;
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    }

    loadModel();
  }, []);

  const {
    finalResult,
    setFinalResult,
    startPredictionFlag,
    setStartPredictionFlag,
  } = useGameStore();

  // 나를 맞춰봐 게임! O 고른 사람들에게 파란 배경색 부여
  const { guessMeGamePeopleSelection, resetGuessMePeopleSelection } =
    usePresenterStore();

  useEffect(() => {
    if (
      Array.isArray(guessMeGamePeopleSelection) &&
      guessMeGamePeopleSelection.length > 0
    ) {
      guessMeGamePeopleSelection.forEach((info) => {
        const connectionId = Object.keys(connectionInfo).find(
          (key) => parseInt(connectionInfo[key].memberId, 10) === info.memberId
        );

        if (connectionId) {
          let color = null;
          if (info.selection === "O") {
            color = "cornflowerblue";
          } else if (info.selection === "X") {
            color = "salmon";
          }
          changeBackgroundColor(connectionId, color);
        }
      });
    }

    // 클린업 함수에서 상태를 초기화하지 않도록 변경
    // return () => {
    //   resetGuessMePeopleSelection();
    // };
  }, [guessMeGamePeopleSelection, connectionInfo]);

  // useEffect(() => {
  //   // 빈배열인지 아닌지부터 먼저 검사
  //   if (
  //     Array.isArray(guessMeGamePeopleSelection) &&
  //     guessMeGamePeopleSelection.length > 0
  //   ) {
  //     guessMeGamePeopleSelection.forEach((info) => {
  //       const connectionId = Object.keys(connectionInfo).find(
  //         (key) => parseInt(connectionInfo[key].memberId, 10) === info.memberId
  //       );

  //       if (connectionId) {
  //         let color = null
  //         if (info.selection === "O") {
  //           color = "cornflowerblue"
  //         }
  //         else if (info.selection === "X"){
  //           color = "salmon"
  //         }
  //         changeBackgroundColor(connectionId, color);
  //       }
  //     });
  //   }

  //   return () => {
  //     resetGuessMePeopleSelection([]);
  //   };
  // }, [guessMeGamePeopleSelection]);

  // useEffect(() => {
  //   if (
  //     Array.isArray(guessMeGamePeopleSelection) &&
  //     guessMeGamePeopleSelection.length > 0
  //   ) {
  //     guessMeGamePeopleSelection.forEach((info) => {
  //       const connectionId = Object.keys(connectionInfo).find(
  //         (key) => parseInt(connectionInfo[key].memberId, 10) === info.memberId
  //       );

  //       if (connectionId) {
  //         let color = null;
  //         if (info.selection === "O") {
  //           color = "cornflowerblue";
  //         } else if (info.selection === "X") {
  //           color = "salmon";
  //         }
  //         changeBackgroundColor(connectionId, color);
  //       }
  //     });
  //   }

  //   // 클린업 함수에서 상태를 초기화하지 않도록 변경
  //   return () => {
  //     resetGuessMePeopleSelection();
  //   };
  // }, [guessMeGamePeopleSelection, connectionInfo]);

  // const determineResult = (predictions) => {
  //   if (predictions.length > 0) {
  //     const highestPrediction = predictions.reduce((prev, current) =>
  //       prev.probability > current.probability ? prev : current
  //     );
  //     const highestClass = highestPrediction.className;
  //     const highestProb = highestPrediction.probability;

  //     if (highestProb >= THRESHOLD) {
  //       if (highestClass === "O") {
  //         return "O";
  //       } else if (highestClass === "X") {
  //         return "X";
  //       }
  //     }
  //   }
  //   return "Neutral"; // 임계값에 도달하지 않으면 중립 결과 반환
  // };

  // const predictionTimeoutRef = useRef(null); // Ref to store the timeout ID
  // const startPrediction = () => {
  //   let lastResult = "Neutral";

  //   const loop = async () => {
  //     if (model && videoRef.current) {
  //       const predictions = await model.predict(videoRef.current);
  //       lastResult = determineResult(predictions);
  //       console.log("Current Result: ", lastResult);
  //     }
  //     predictionTimeoutRef.current = requestAnimationFrame(loop);
  //   };

  //   // Start the prediction loop
  //   loop();

  //   // Stop the prediction loop after 5 seconds
  //   setTimeout(() => {
  //     console.log("[*] 타이머가 시작되긴 함");
  //     console.log("[*] 루프를 멈추라고 하긴 함");
  //     console.log("[*] 결과를 저장하라고 하긴 함");
  //     setFinalResult(lastResult); // Store the final result
  //     console.log("[*] 여기서 모션인식 결과를 보내줘야 함,");
  //     // 모션 인식 결과를 여기서 보내줘야 함
  //     console.log("[*] 여기서 모션인식 시작 flag를 false로 바꿔줌");
  //     setStartPredictionFlag(false); // Reset the flag
  //     cancelAnimationFrame(predictionTimeoutRef.current); // Cancel the loop
  //   }, 5000);

  // };

  const determineResult = (predictions) => {
    if (predictions.length > 0) {
      const highestPrediction = predictions.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );
      const highestClass = highestPrediction.className;
      const highestProb = highestPrediction.probability;

      if (highestProb >= THRESHOLD) {
        if (highestClass === "O") {
          return "O";
        } else if (highestClass === "X") {
          return "X";
        }
      }
    }
    return "N"; // 임계값에 도달하지 않으면 중립 결과 반환
  };

  const predictionTimeoutRef = useRef(null); // Ref to store the timeout ID

  const startPrediction = () => {
    let lastResult = "N";
    let startTime = Date.now();

    const loop = async () => {
      if (model && videoRef.current) {
        const predictions = await model.predict(videoRef.current);
        lastResult = determineResult(predictions);
        console.log("Current Result: ", lastResult);
      }

      // 5초가 경과했는지 확인
      if (Date.now() - startTime < 5000) {
        predictionTimeoutRef.current = requestAnimationFrame(loop);
      } else {
        console.log("[*] 5초 경과, 루프를 멈추고 결과를 저장");
        await setFinalResult(lastResult); // 최종 결과 저장
        // 최종 결과가 정해지면 pub해서 결과를 넘겨주기
        setStartPredictionFlag(false); // 모션 인식 중지
        cancelAnimationFrame(predictionTimeoutRef.current); // 루프 중지
      }
    };
    // Start the prediction loop
    loop();
  };

  let cnt = 0;
  useEffect(() => {
    cnt = cnt++;
    // finalResult가 있고 바뀐거면 결과를 pub 한다.
    if (finalResult) {
      webSocketService.sendGuessMeSelection(roomId, memberId, finalResult);
    }
    console.log(`최종 결과 ${cnt}`, finalResult);
  }, [finalResult]);

  useEffect(() => {
    if (startPredictionFlag) {
      startPrediction();
    }
  }, [startPredictionFlag]);

  return (
    <div id="middleDiv" className="flex justify-center h-[68vh] w-[95%] m-3">
      <div className="bg-[rgba(255,255,255,0.9)] w-[80%] min-w-[550px] h-full mr-5 rounded-[20px] ">
        <div className="flex flex-col justify-center items-center h-full w-full">
          <div
            className={`w-full h-[90%] grid place-items-center ${getGridColsClass()}`}
          >
            {publisher ? (
              <div
                id={publisher.stream.connection.connectionId}
                className={`w-[80%] p-3 flex justify-center items-center rounded-[15px] ${getVideoContainerClass()}`}
              >
                <div className="w-full relative rounded-[15px]">
                  {publisher ? (
                    <video
                      autoPlay={true}
                      // ref={(video) => video && publisher.addVideoElement(video)}
                      ref={videoRef}
                      className="object-cover rounded-[15px]"
                    />
                  ) : (
                    "비디오가 준비 중입니다."
                  )}
                  <div className="w-full absolute bottom-0 text-white flex justify-between z-20">
                    <span className="flex ">
                      <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                        {
                          connectionInfo[
                            publisher.stream.connection.connectionId
                          ].memberName
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
                      className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0 "hidden"`}
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
                      className={`w-[80%] p-3 flex justify-center items-center rounded-[15px] ${getVideoContainerClass()}`}
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
                                connectionInfo[
                                  sub.stream.connection.connectionId
                                ].memberName
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
                            className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0
                              "hidden"
                            `}
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
          <div className="flex justify-between h-[10%] mb-2">
            <span className="mr-20">
              <MicBtn />
            </span>
            <span className="relative">
              <EmojiBtn onClick={handleOpenModal} />
              {isModalOpen && (
                <div className="absolute top-0 left-full ml-4">
                  <SelectEmoji handleCloseModal={handleCloseModal} />
                </div>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Chatbox */}
      <div className="h-full rounded-[20px] flex flex-col justify-center items-center overflow-hidden min-w-[230px]">
        <Chatbox />
      </div>
    </div>
  );
};

export default MiddleDiv;
