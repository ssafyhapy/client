import React, { useState } from "react";
import PlayBtn from "../../components/Buttons/PlayBtn";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import ContentSelector from "../../components/Main_page/ContentSelector";
import ContentRenderer from "../../components/Main_page/ContentRenderer";

const Home2 = () => {
  const [content, setContent] = useState("service");

  return (
    <div>
      <NavBar />
      <div className="w-[800px] h-[500px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] rounded-[30px] border-[10px] border-[rgba(255,255,255,0.2)] flex flex-col justify-between items-center p-5">
        {/* // 컨턴츠 선택 */}
        <ContentSelector content={content} setContent={setContent} />
        {/* // 컨텐츠 렌더링 */}
        <ContentRenderer content={content} />
        <div className="w-full flex justify-end">
          {/* // Play now 버튼 */}
          <Link to="/play">
            <PlayBtn />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home2;
