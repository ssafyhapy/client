import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { OpenVidu } from "openvidu-browser";

import CamCheck from "./../../components/Camera_check/CamCheck";
import WaitingRoom from "./../../components/Waiting_room/WaitingRoom";
import SelfIntroduction from "./../../components/Self_introduction/SelfIntroduction";
import BalanceGame from "./../../components/Balance_game/BalanceGame";
import WrapUp from "./../../components/Wrap_up/WrapUp";
import PhotographFirst from "./../../components/Photo/PhotographFirst";
import PhotographLast from "./../../components/Photo/PhotographLast";
import useGameStore from "./../../store/useGameStore";
import GuessMe from "./../../components/Guess_me/GuessMe";
import { memo } from "react";

const Games = memo(() => {
  const gameStep = useGameStore((state) => state.gameStep);
  
  const location = useLocation();
  const { roomData } = location.state;
  const OV = new OpenVidu();
  const [session, setSession] = useState(OV.initSession());
  const [mainStreamManager, setMainStreamManager] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const mySessionId = roomData.webrtc.sessionId;
  const myUserName = "Participant" + Math.floor(Math.random() * 100);


  useEffect(() => {
    const joinSession = async () => {
      session.on('streamCreated', (event) => {
        const subscriber = session.subscribe(event.stream, undefined);
        setSubscribers((prevSubscribers) => {console.log('[*] setSub', prevSubscribers, subscriber); return [...prevSubscribers, subscriber]});
      });

      session.on('streamDestroyed', (event) => {
        setSubscribers((prevSubscribers) =>
          prevSubscribers.filter((subscriber) => subscriber !== event.stream.streamManager)
        );
      });

      try {
        await session.connect(roomData.webrtc.openviduToken, { clientData: myUserName });

        const publisher = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: false,
          publishVideo: true,
          resolution: '640x480',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false
        });

        session.publish(publisher);

        setSession(session);
        setMainStreamManager(publisher);
        setPublisher(publisher);
      } catch (error) {
        console.error('There was an error connecting to the session:', error);
      }
    };

    joinSession();

    return () => {
      if (session) session.disconnect();
    };
  }, []);

  return (
    <>
      
      {gameStep === "camera-check" && <CamCheck mainStreamManager={mainStreamManager} subscribers={subscribers}/>}
      {gameStep === "waiting-room" && <WaitingRoom />}
      {gameStep === "self-introduction" && <SelfIntroduction />}
      {gameStep === "balance-game" && <BalanceGame />}
      {gameStep === "wrap-up" && <WrapUp />}
      {gameStep === "guess-me" && <GuessMe />}
      {gameStep === "photo-first" && <PhotographFirst />}
      {gameStep === "photo-last" && <PhotographLast />}
    </>
  );
});

export default Games;
