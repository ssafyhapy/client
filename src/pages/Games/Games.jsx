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
import { WebSocketProvider } from "../../WebSocketContext";
import useRoomStore from "../../store/useRoomStore";

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
  } = useGameStore();

  const { webrtc } = useRoomStore()
  const [session, setSession] = useState(null);


  const OV = new OpenVidu();

  useEffect(() => {
    const joinSession = async () => {
      const session = OV.initSession();

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
        await session.connect(webrtc.openviduToken);
        console.log("Session connected successfully");

        const newpublisher = await OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: "640x480",
          frameRate: 30,
          insertMode: "APPEND",
          mirror: false,
        });

        await session.publish(newpublisher);
        console.log("Publisher created and published successfully");

        // session.publish(newpublisher);

        setSession(session);
        setMainStreamManager(newpublisher);
        setPublisher(newpublisher);

        console.log("[*]session", session);
        console.log("[*]publisher", newpublisher);
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

  useEffect(() => {
    console.log("[*] 전체 connectionInfo", connectionInfo);
    console.log("[*] 전체 mainStream", mainStreamManager);
    console.log("[*] 전체 subscribers", subscribers);
  }, [connectionInfo]);

  return (
    <WebSocketProvider>
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
        {gameStep === "camera-check" && <CamCheck />}
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
    </WebSocketProvider>
  );
};

export default Games;
