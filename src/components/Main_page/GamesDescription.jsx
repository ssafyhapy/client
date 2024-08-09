import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SelfIntroduction from "./games/SelfIntroduction";
import GuessMe from "./games/GuessMe";
import BalanceGame from "./games/BalanceGame";
import MainHomeFrame from "./MainHomeFrame";
import NavBar from "../NavBar";
import PlayBtn from "../Buttons/PlayBtn";

const GamesDescription = () => {
  const [selectedId, setSelectedId] = useState(null);

  const sections = [
    { id: 1, component: <SelfIntroduction />, title: "한 줄 자기소개" },
    { id: 2, component: <GuessMe />, title: "나를 맞춰봐" },
    { id: 3, component: <BalanceGame />, title: "밸런스 게임" },
  ];

  return (
    <MainHomeFrame>
      <div className="flex flex-col w-[80%] h-[80%] justify-between items-center">
        <NavBar />
        <div className="flex flex-wrap items-center justify-center gap-6 p-6">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              layoutId={section.id}
              onClick={() => setSelectedId(section.id)}
              className={`cursor-pointer bg-white rounded-[20px] shadow-lg p-4 flex flex-col justify-center items-center ${
                section.id === 3 ? "w-[624px] h-[150px]" : "w-[300px] h-[150px]"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <motion.h2 className="text-3xl font-bold text-center">
                {section.title}
              </motion.h2>
            </motion.div>
          ))}

          <AnimatePresence>
            {selectedId && (
              <motion.div
                layoutId={selectedId}
                className="fixed inset-0 z-20 flex items-center justify-center bg-white bg-opacity-40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div className="bg-white p-10 rounded-[30px] shadow-lg max-w-[90%] max-h-[90%] overflow-auto">
                  <motion.h2 className="text-3xl font-bold text-center mb-4">
                    {
                      sections.find((section) => section.id === selectedId)
                        .title
                    }
                  </motion.h2>
                  {
                    sections.find((section) => section.id === selectedId)
                      .component
                  }
                  <motion.div className="flex justify-end">
                    <motion.button
                      onClick={() => setSelectedId(null)}
                      className="mt-5 bg-gray-200 p-2 rounded"
                    >
                      닫기
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="self-end">
          <PlayBtn />
        </div>
      </div>
    </MainHomeFrame>
  );
};

export default GamesDescription;
