import GuessMeAnswer from "../../../components/Guess_me/GuessMeAnswer";
import GuessMeGetReady from "../../../components/Guess_me/GuessMeGetReady";
import GuessMeAllPrepared from "../../../components/Guess_me/GuessMeAllPrepared";
import { useState } from "react";

const GuessMe = () => {
  const [guessMeStep, setGuessMeStep] = useState("getready");

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
