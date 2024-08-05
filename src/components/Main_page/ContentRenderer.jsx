import React from "react";
import Service from "../../components/Main_page/Service";
import SelfIntroduction from "../../components/Main_page/SelfIntroduction";
import GuessMe from "../../components/Main_page/GuessMe";
import BalanceGame from "../../components/Main_page/BalanceGame";

const ContentRenderer = ({ content }) => {
  switch (content) {
    case "service":
      return <Service />;
    case "selfIntroduction":
      return <SelfIntroduction />;
    case "guessMe":
      return <GuessMe />;
    case "balanceGame":
      return <BalanceGame />;
    default:
      return null;
  }
};

export default ContentRenderer;
