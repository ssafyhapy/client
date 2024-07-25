import React, { useState } from "react";
import PlayBtn from "../components/btn/PlayBtn";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

const Home2 = () => {
  const [content, setContent] = useState("service");

  const service = (
    <div className="flex flex-col">
      <p>사르르는 어떤 목적으로 모인 그룹이든 첫 만남에 어색하지 않도록</p>
      <p>
        서로를 알아가는 시간을 가질 수 있도록 다양한 게임으로 구성된 화상 채팅
        서비스입니다.
      </p>
      <p>
        구성되어 있는 게임들을 하나하나 따라가는 것만으로도 서로를 더 잘
        이해하게 될 거예요.
      </p>

      <h1>사르르만의 독특한 서비스</h1>
      <div>
        <p>온라인에서의 첫 만남이 조금 덜 어색하고, 조금 더 재미있도록! </p>
        <p>
          가면을 쓰고 게임을 하며 알아가는 시간을 가져요. 가면은 마지막 세션인
          랩업에서 벗게 될 거예요.
        </p>
      </div>
      <div>
        <p>오늘 우리가 처음 만난 이 순간! 기념촬영을 해 기록을 남겨요. </p>
        <p>
          나중에 마이페이지의 추억상자에서 다시 보며 추억을 되새길 수 있어요.
        </p>
      </div>
      <div>
        <p>
          게임이 모두 끝나면 오늘 한 플레이에 대한 레포트를 받아보실 수 있어요.{" "}
        </p>
        <p>각자 했던 자기소개나 나를 맞춰봐 문제들을 다시 확인할 수 있어요.</p>
      </div>
    </div>
  );

  const selfIntroduction = (
    <div className="flex gap-5">
      <p>이미지</p>
      <div>
        <h1>한 줄 자기소개</h1>
        <p>스스로를 어떻게 정의하시나요? </p>
        <p>남들에게 알려주고 싶은 </p>
        <p>자신은 어떤 느낌인가요?</p>
        <p>자신을 한 줄로 정의할 만한 문구를 적고</p>
        <p>모두와 이야기해보세요.</p>
        <p>자신만의 독특한 문구를 생각해내서</p>
        <p>대화를 나누면 더 재미있을 거예요!</p>
      </div>
    </div>
  );
  const guessMe = (
    <div className="flex gap-5">
      <p>이미지</p>
      <div>
        <h1>나를 맞춰봐</h1>

        <p>특이한 tmi, 공유하고 </p>
        <p>싶은 특별한 경험 등이 있나요?</p>
        <p>MBTI, 취미 등을 OX 문제로 내고 </p>
        <p>서로 맞춰보며 더 잘 알아갈 수 있게 될 거예요!</p>
        <p>OX 모양을 몸으로 직접 만들며 </p>
        <p>맞출 수 있기 때문에 더 재미있어요!</p>
      </div>
    </div>
  );

  const balanceGame = (
    <div className="flex gap-5">
      <p>이미지</p>
      <div>
        <h1>밸런스 게임</h1>

        <p>일상의 사소한 결정들!</p>
        <p>부먹찍먹부터 시작해서</p>
        <p>참 많은 일에 결정이 갈리곤 하죠.</p>
        <p>저희 밸런스 게임은 모임의 주제를 </p>
        <p>입력받아 모임과 관련된 </p>
        <p>밸런스 주제를 주기도 하고, </p>
        <p>재미있는 주제를 주기도 할 거예요!</p>
        <p>랜덤으로 제공되는 밸런스 게임의 주제를 통해</p>
        <p>치열하게 토론하며 더 친밀해져 보세요.</p>
      </div>
    </div>
  );

  return (
    <div>
      <NavBar />
      <div className="w-[800px] h-[500px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] rounded-[30px] border-[10px] border-[rgba(255,255,255,0.2)] flex flex-col justify-between items-center p-5">
        <div className="w-[700px] h-[60px] bg-[rgba(255,255,255,0.7)] rounded-[15px] shadow-[0_4px_10px_rgba(66,72,81,0.5)] flex items-center justify-center space-x-4">
          <button
            onClick={() => setContent("service")}
            className="bg-white w-[168px] h-[40px] flex items-center justify-center text-[20px] text-[#4D98F7] rounded-[15px]"
          >
            서비스 소개
          </button>
          <button
            onClick={() => setContent("selfIntroduction")}
            className="bg-white w-[168px] h-[40px] flex items-center justify-center text-[20px] text-[#4D98F7] rounded-[15px]"
          >
            한 줄 자기소개
          </button>
          <button
            onClick={() => setContent("guessMe")}
            className="bg-white w-[168px] h-[40px] flex items-center justify-center text-[20px] text-[#4D98F7] rounded-[15px]"
          >
            나를 맞춰봐
          </button>
          <button
            onClick={() => setContent("balanceGame")}
            className="bg-white w-[168px] h-[40px] flex items-center justify-center text-[20px] text-[#4D98F7] rounded-[15px]"
          >
            밸런스 게임
          </button>
        </div>
        <div>
          {content === "service" && service}
          {content === "selfIntroduction" && selfIntroduction}
          {content === "guessMe" && guessMe}
          {content === "balanceGame" && balanceGame}
        </div>
        <div className="w-full flex justify-end">
          <Link to="/play">
            <PlayBtn />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home2;
