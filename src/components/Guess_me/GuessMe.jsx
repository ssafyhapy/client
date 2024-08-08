import React, {useEffect} from "react";
import GuessMeAnswer from "./GuessMeAnswer";
import GuessMeGetReady from "./GuessMeGetReady";
import GuessMeAllPrepared from "./GuessMeAllPrepared";
import { useState } from "react";
import webSocketService from "../../WebSocketService";
import { useWebSocket } from "../../WebSocketContext";

const GuessMe = () => {
  const [guessMeStep, setGuessMeStep] = useState("getready");

  // 일단 룸아이디 박아둠
  const roomId= 1

  const webSocketService = useWebSocket()

  // 여기서 구독하는중 (컴포넌트 바뀌어도 구독이 끊기지않게!)
  useEffect(() => {
    const handleGuessMeMessage = (message) => {
      console.log("Received GuessMe message:", message);
      if (message.memberState === "balance") {
        // Move to the next game step when the final message is received
        setGuessMeStep("balance-game");
      } else {
        setGuessMeStep("Answer")
      }
    };

    webSocketService.subscribeToGuessMe(roomId, handleGuessMeMessage);

    return () => {
      webSocketService.unsubscribe(`/api/sub/ox/${roomId}/next`);
    };
  }, [roomId, webSocketService]);

  return (
    <>
      {guessMeStep === "getready" && (
        <GuessMeGetReady
          guessMeStep={guessMeStep}
          setGuessMeStep={setGuessMeStep}
        />
      )}
      {guessMeStep === "allPrepared" && (
        <GuessMeAllPrepared
          guessMeStep={guessMeStep}
          setGuessMeStep={setGuessMeStep}
        />
      )}
      {guessMeStep === "Answer" && (
        <GuessMeAnswer
          guessMeStep={guessMeStep}
          setGuessMeStep={setGuessMeStep}
        />
      )}
    </>
  );
};

export default GuessMe;
