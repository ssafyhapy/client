// import React from "react";
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { OpenVidu } from "openvidu-browser";

// import GameBackground from "../../components/Common/GameBackground";
// import CamCheck from "./../../components/Camera_check/CamCheck";
// import WaitingRoom from "./../../components/Waiting_room/WaitingRoom";
// import SelfIntroduction from "./../../components/Self_introduction/SelfIntroduction";
// import BalanceGame from "./../../components/Balance_game/BalanceGame";
// import WrapUp from "./../../components/Wrap_up/WrapUp";
// import PhotographFirst from "./../../components/Photo/PhotographFirst";
// import PhotographLast from "./../../components/Photo/PhotographLast";
// import useGameStore from "./../../store/useGameStore";
// import GuessMe from "./../../components/Guess_me/GuessMe";
// import TopDiv from "../../components/Common/TopDiv";
// import MiddleDiv from "../../components/Common/MiddleDiv";
// import BottomDiv from "../../components/Common/BottomDiv";

// const Games = () => {
//   const gameStep = useGameStore((state) => state.gameStep);
//   const setGameStep = useGameStore((state) => state.setGameStep);
//   const {
//     mainStreamManager,
//     setMainStreamManager,
//     publisher,
//     setPublisher,
//     subscribers,
//     setSubscribers,
//     connectionInfo,
//     setConnectionInfo,
//   } = useGameStore();

//   const location = useLocation();
//   const { roomData } = location.state;
//   const { session, setSession } = useGameStore();
//   const mySessionId = roomData.webrtc.sessionId;
//   const myUserName = "Participant" + Math.floor(Math.random() * 100);

//   const OV = new OpenVidu();

//   useEffect(() => {
//     const joinSession = async () => {
//       const session = OV.initSession();

//       session.on("streamCreated", (event) => {
//         console.log("[*]stream Created event", event);
//         const subscriber = session.subscribe(event.stream, undefined);
//         console.log("[*]Subscriber created", subscriber);

//         subscriber.on("videoElementCreated", (event) => {
//           console.log("[*]Video Element Created", event.element);
//         });
//         const newSubscribers = [...subscribers, subscriber];
//         setSubscribers(newSubscribers);
//       });

//       session.on("connectionCreated", (event) => {
//         console.log("[*] connection", event.connection);
//         const connectionData = JSON.parse(event.connection.data);
//         console.log(connectionData);
//         const memberId = connectionData.memberId;
//         const newConnectionData = {
//           connectionId: event.connection.connectionId,
//           memberName: connectionData.memberName,
//           memberId: memberId,
//         };
//         console.log("[*] newconnectionData", newConnectionData);
//         setConnectionInfo(newConnectionData);
//       });

//       session.on("streamDestroyed", (event) => {
//         setSubscribers((prevSubscribers) =>
//           prevSubscribers.filter(
//             (subscriber) => subscriber !== event.stream.streamManager
//           )
//         );
//       });

//       try {
//         await session.connect(roomData.webrtc.openviduToken);
//         console.log("Session connected successfully");

//         const publisher = await OV.initPublisher(undefined, {
//           audioSource: undefined,
//           videoSource: undefined,
//           publishAudio: true,
//           publishVideo: true,
//           resolution: "640x480",
//           frameRate: 30,
//           insertMode: "APPEND",
//           mirror: false,
//         });

//         await session.publish(publisher);
//         console.log("Publisher created and published successfully");

//         session.publish(publisher);

//         setSession(session);
//         setMainStreamManager(publisher);
//         setPublisher(publisher);

//         console.log("[*]session", session);
//         console.log("[*]publisher", publisher);
//         console.log("[*]subscribers", subscribers);
//       } catch (error) {
//         console.error("There was an error connecting to the session:", error);
//       }
//     };

//     joinSession();

//     return () => {
//       if (session) session.disconnect();
//     };
//   }, []);

//   const handleMaskChange = () => {
//     if (publisher) {
//       const canvasElement = document.getElementById("your-canvas-id");
//       if (canvasElement) {
//         const newVideoTrack = canvasElement
//           .captureStream(30)
//           .getVideoTracks()[0];

//         // 퍼블리셔의 비디오 트랙을 캔버스에서 캡처한 스트림으로 교체
//         publisher
//           .replaceTrack(newVideoTrack)
//           .then(() => {
//             console.log("Video track replaced successfully");
//           })
//           .catch((error) => {
//             console.error("Error replacing video track:", error);
//           });
//       }
//     }
//   };

//   useEffect(() => {
//     console.log("[*] 전체 connectionInfo", connectionInfo);
//     console.log("[*] 전체 mainStream", mainStreamManager);
//   }, [connectionInfo]);

//   return (
//     <GameBackground>
//       {/* TopDiv */}
//       {gameStep !== "camera-check" &&
//       gameStep !== "photo-first" &&
//       gameStep !== "photo-last" ? (
//         <TopDiv gameStep={gameStep} setGameStep={setGameStep}></TopDiv>
//       ) : null}

//       {/* MiddleDiv */}
//       {gameStep !== "camera-check" &&
//       gameStep !== "photo-first" &&
//       gameStep !== "photo-last" ? (
//         <MiddleDiv></MiddleDiv>
//       ) : null}

//       {/* 자체 UI */}
//       {gameStep === "camera-check" && (
//         <CamCheck onMaskChange={handleMaskChange} />
//       )}
//       {gameStep === "photo-first" && <PhotographFirst />}
//       {gameStep === "photo-last" && <PhotographLast />}

//       {/* BottomDiv - 게임 로직 */}
//       {gameStep !== "camera-check" &&
//       gameStep !== "photo-first" &&
//       gameStep !== "photo-last" ? (
//         <BottomDiv>
//           {gameStep === "waiting-room" && <WaitingRoom />}
//           {gameStep === "self-introduction" && <SelfIntroduction />}
//           {gameStep === "guess-me" && <GuessMe />}
//           {gameStep === "balance-game" && <BalanceGame />}
//           {gameStep === "wrap-up" && <WrapUp />}
//         </BottomDiv>
//       ) : null}
//     </GameBackground>
//   );
// };

// export default Games;

// import React from "react";
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { OpenVidu } from "openvidu-browser";

// import GameBackground from "../../components/Common/GameBackground";
// import CamCheck from "./../../components/Camera_check/CamCheck";
// import WaitingRoom from "./../../components/Waiting_room/WaitingRoom";
// import SelfIntroduction from "./../../components/Self_introduction/SelfIntroduction";
// import BalanceGame from "./../../components/Balance_game/BalanceGame";
// import WrapUp from "./../../components/Wrap_up/WrapUp";
// import PhotographFirst from "./../../components/Photo/PhotographFirst";
// import PhotographLast from "./../../components/Photo/PhotographLast";
// import useGameStore from "./../../store/useGameStore";
// import GuessMe from "./../../components/Guess_me/GuessMe";
// import TopDiv from "../../components/Common/TopDiv";
// import MiddleDiv from "../../components/Common/MiddleDiv";
// import BottomDiv from "../../components/Common/BottomDiv";

// const Games = () => {
//   const gameStep = useGameStore((state) => state.gameStep);
//   const setGameStep = useGameStore((state) => state.setGameStep);
//   const {
//     mainStreamManager,
//     setMainStreamManager,
//     publisher,
//     setPublisher,
//     subscribers,
//     setSubscribers,
//     connectionInfo,
//     setConnectionInfo,
//     session, // 상태에서 session을 가져옵니다.
//     setSession, // setSession 함수를 가져옵니다.
//   } = useGameStore();

//   const location = useLocation();
//   const { roomData } = location.state;
//   const mySessionId = roomData.webrtc.sessionId;
//   const myUserName = "Participant" + Math.floor(Math.random() * 100);

//   const OV = new OpenVidu();

//   useEffect(() => {
//     const joinSession = async () => {
//       const session = OV.initSession(); // OpenVidu 세션 초기화

//       session.on("streamCreated", (event) => {
//         console.log("[*]stream Created event", event);
//         const subscriber = session.subscribe(event.stream, undefined);
//         console.log("[*]Subscriber created", subscriber);

//         subscriber.on("videoElementCreated", (event) => {
//           console.log("[*]Video Element Created", event.element);
//         });
//         const newSubscribers = [...subscribers, subscriber];
//         setSubscribers(newSubscribers);
//       });

//       session.on("connectionCreated", (event) => {
//         console.log("[*] connection", event.connection);
//         const connectionData = JSON.parse(event.connection.data);
//         console.log(connectionData);
//         const memberId = connectionData.memberId;
//         const newConnectionData = {
//           connectionId: event.connection.connectionId,
//           memberName: connectionData.memberName,
//           memberId: memberId,
//         };
//         console.log("[*] newconnectionData", newConnectionData);
//         setConnectionInfo(newConnectionData);
//       });

//       session.on("streamDestroyed", (event) => {
//         setSubscribers((prevSubscribers) =>
//           prevSubscribers.filter(
//             (subscriber) => subscriber !== event.stream.streamManager
//           )
//         );
//       });

//       try {
//         await session.connect(roomData.webrtc.openviduToken); // 세션 연결
//         console.log("Session connected successfully");

//         const publisher = await OV.initPublisher(undefined, {
//           audioSource: undefined,
//           videoSource: undefined,
//           publishAudio: true,
//           publishVideo: true,
//           resolution: "640x480",
//           frameRate: 30,
//           insertMode: "APPEND",
//           mirror: false,
//         });

//         await session.publish(publisher); // 퍼블리셔를 세션에 게시
//         console.log("Publisher created and published successfully");

//         setSession(session); // session 상태 업데이트
//         setMainStreamManager(publisher);
//         setPublisher(publisher);

//         console.log("[*]session", session);
//         console.log("[*]publisher", publisher);
//         console.log("[*]subscribers", subscribers);
//       } catch (error) {
//         console.error("There was an error connecting to the session:", error);
//       }
//     };

//     joinSession();

//     return () => {
//       if (session) session.disconnect();
//     };
//   }, []);

//   // 마스크가 변경될 때 호출될 함수
//   const handleMaskChange = () => {
//     if (publisher) {
//       const canvasElement = document.getElementById("publisher"); // Canvas의 ID로 가져옵니다.
//       if (canvasElement) {
//         const newVideoTrack = canvasElement
//           .captureStream(30)
//           .getVideoTracks()[0];

//         // 퍼블리셔의 비디오 트랙을 캔버스에서 캡처한 스트림으로 교체
//         publisher
//           .replaceTrack(newVideoTrack)
//           .then(() => {
//             console.log("Video track replaced successfully");
//           })
//           .catch((error) => {
//             console.error("Error replacing video track:", error);
//           });
//       }
//     }
//   };

//   useEffect(() => {
//     console.log("[*] 전체 connectionInfo", connectionInfo);
//     console.log("[*] 전체 mainStream", mainStreamManager);
//   }, [connectionInfo]);

//   return (
//     <GameBackground>
//       {/* TopDiv */}
//       {gameStep !== "camera-check" &&
//       gameStep !== "photo-first" &&
//       gameStep !== "photo-last" ? (
//         <TopDiv gameStep={gameStep} setGameStep={setGameStep}></TopDiv>
//       ) : null}

//       {/* MiddleDiv */}
//       {gameStep !== "camera-check" &&
//       gameStep !== "photo-first" &&
//       gameStep !== "photo-last" ? (
//         <MiddleDiv></MiddleDiv>
//       ) : null}

//       {/* 자체 UI */}
//       {gameStep === "camera-check" && (
//         <CamCheck onMaskChange={handleMaskChange} /> // 마스크 변경 핸들러 전달
//       )}
//       {gameStep === "photo-first" && <PhotographFirst />}
//       {gameStep === "photo-last" && <PhotographLast />}

//       {/* BottomDiv - 게임 로직 */}
//       {gameStep !== "camera-check" &&
//       gameStep !== "photo-first" &&
//       gameStep !== "photo-last" ? (
//         <BottomDiv>
//           {gameStep === "waiting-room" && <WaitingRoom />}
//           {gameStep === "self-introduction" && <SelfIntroduction />}
//           {gameStep === "guess-me" && <GuessMe />}
//           {gameStep === "balance-game" && <BalanceGame />}
//           {gameStep === "wrap-up" && <WrapUp />}
//         </BottomDiv>
//       ) : null}
//     </GameBackground>
//   );
// };

// export default Games;

import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { OpenVidu } from "openvidu-browser";

import GameBackground from "../../components/Common/GameBackground";
import CamCheck from "./../../components/Camera_check/CamCheck";
import WaitingRoom from "./../../components/Waiting_room/WaitingRoom";
import SelfIntroduction from "./../../components/Self_introduction/SelfIntroduction";
import BalanceGame from "./../../components/Balance_game/BalanceGame";
import WrapUp from "./../../components/Wrap_up/WrapUp";
import PhotographFirst from "./../../components/Photo/PhotographFirst";
import PhotographLast from "./../../components/Photo/PhotographLast";
import useGameStore from "./../../store/useGameStore";
import GuessMe from "./../../components/Guess_me/GuessMe";
import TopDiv from "../../components/Common/TopDiv";
import MiddleDiv from "../../components/Common/MiddleDiv";
import BottomDiv from "../../components/Common/BottomDiv";

const Games = () => {
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const {
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
    connectionInfo,
    setConnectionInfo,
    session, // 상태에서 session을 가져옵니다.
    setSession, // setSession 함수를 가져옵니다.
  } = useGameStore();

  const location = useLocation();
  const { roomData } = location.state;
  const mySessionId = roomData.webrtc.sessionId;
  const myUserName = "Participant" + Math.floor(Math.random() * 100);

  const OV = new OpenVidu();

  useEffect(() => {
    const joinSession = async () => {
      const session = OV.initSession(); // OpenVidu 세션 초기화

      session.on("streamCreated", (event) => {
        console.log("[*]stream Created event", event);
        const subscriber = session.subscribe(event.stream, undefined);
        console.log("[*]Subscriber created", subscriber);

        subscriber.on("videoElementCreated", (event) => {
          console.log("[*]Video Element Created", event.element);
        });
        const newSubscribers = [...subscribers, subscriber];
        setSubscribers(newSubscribers);
      });

      session.on("connectionCreated", (event) => {
        console.log("[*] connection", event.connection);
        const connectionData = JSON.parse(event.connection.data);
        console.log(connectionData);
        const memberId = connectionData.memberId;
        const newConnectionData = {
          connectionId: event.connection.connectionId,
          memberName: connectionData.memberName,
          memberId: memberId,
        };
        console.log("[*] newconnectionData", newConnectionData);
        setConnectionInfo(newConnectionData);
      });

      session.on("streamDestroyed", (event) => {
        setSubscribers((prevSubscribers) =>
          prevSubscribers.filter(
            (subscriber) => subscriber !== event.stream.streamManager
          )
        );
      });

      try {
        await session.connect(roomData.webrtc.openviduToken); // 세션 연결
        console.log("Session connected successfully");

        const publisher = await OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: "640x480",
          frameRate: 30,
          insertMode: "APPEND",
          mirror: false,
        });

        await session.publish(publisher); // 퍼블리셔를 세션에 게시
        console.log("Publisher created and published successfully");

        setSession(session); // session 상태 업데이트
        setMainStreamManager(publisher);
        setPublisher(publisher);

        console.log("[*]session", session);
        console.log("[*]publisher", publisher);
        console.log("[*]subscribers", subscribers);
      } catch (error) {
        console.error("There was an error connecting to the session:", error);
      }
    };

    joinSession();

    return () => {
      if (session) session.disconnect();
    };
  }, []);

  const handleMaskChange = () => {
    if (publisher) {
      const canvasElement = document.getElementById("publisher");
      if (canvasElement) {
        const newVideoTrack = canvasElement
          .captureStream(30)
          .getVideoTracks()[0];

        publisher
          .replaceTrack(newVideoTrack)
          .then(() => {
            console.log("Video track replaced successfully");
          })
          .catch((error) => {
            console.error("Error replacing video track:", error);
          });
      }
    }
  };

  useEffect(() => {
    console.log("[*] 전체 connectionInfo", connectionInfo);
    console.log("[*] 전체 mainStream", mainStreamManager);
  }, [connectionInfo]);

  return (
    <GameBackground>
      {/* TopDiv */}
      {gameStep !== "camera-check" &&
      gameStep !== "photo-first" &&
      gameStep !== "photo-last" ? (
        <TopDiv gameStep={gameStep} setGameStep={setGameStep}></TopDiv>
      ) : null}

      {/* MiddleDiv */}
      {gameStep !== "camera-check" &&
      gameStep !== "photo-first" &&
      gameStep !== "photo-last" ? (
        <MiddleDiv></MiddleDiv>
      ) : null}

      {/* 자체 UI */}
      {gameStep === "camera-check" && (
        <CamCheck onMaskChange={handleMaskChange} /> // 마스크 변경 핸들러 전달
      )}
      {gameStep === "photo-first" && <PhotographFirst />}
      {gameStep === "photo-last" && <PhotographLast />}

      {/* BottomDiv - 게임 로직 */}
      {gameStep !== "camera-check" &&
      gameStep !== "photo-first" &&
      gameStep !== "photo-last" ? (
        <BottomDiv>
          {gameStep === "waiting-room" && <WaitingRoom />}
          {gameStep === "self-introduction" && <SelfIntroduction />}
          {gameStep === "guess-me" && <GuessMe />}
          {gameStep === "balance-game" && <BalanceGame />}
          {gameStep === "wrap-up" && <WrapUp />}
        </BottomDiv>
      ) : null}
    </GameBackground>
  );
};

export default Games;
