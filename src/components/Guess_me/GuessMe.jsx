import React from "react";
import GuessMeAnswer from "./GuessMeAnswer";
import GuessMeGetReady from "./GuessMeGetReady";
import GuessMeAllPrepared from "./GuessMeAllPrepared";
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
