import React, { useState, useEffect } from "react";
import useGameStore from "../../store/useGameStore";
import BalanceGetReady from "./BalanceGetReady";
import BalanceChangeChoices from "./BalanceChangeChoices";
import BalanceChoosing from "./BalanceChoosing";

const Balance = () => {
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const [showModal, setShowModal] = useState(true);
  const [currentStep, setCurrentStep] = useState("getReady");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 6 ? prevDots + " ·" : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleSubjectSaveModal = () => {
    setShowModal(false);
    setCurrentStep("changeChoices");
  };

  const handleSubjectConfirm = () => {
    setCurrentStep("choosing");
  };

  const handleTimerEnd = () => {
    setCurrentStep("changeChoices");
  };

  return (
    <>
      {showModal && currentStep === "getReady" && (
        <BalanceGetReady onClose={handleSubjectSaveModal} dots={dots} />
      )}
      {currentStep === "changeChoices" && (
        <BalanceChangeChoices onConfirm={handleSubjectConfirm} />
      )}
      {currentStep === "choosing" && <BalanceChoosing onTimerEnd={handleTimerEnd} currentStep={`${currentStep==="choosing"?true:false}`}/>}
    </>
  );
};

export default Balance;
