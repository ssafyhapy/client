import React, { useState, useEffect } from "react";
import BalanceGetReady from "../../../components/Balance_game/BalanceGetReady";
import BalanceChangeChoices from "../../../components/Balance_game/BalanceChangeChoices";
import BalanceChoosing from "../../../components/Balance_game/BalanceChoosing";

const Balance = () => {
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
