import React, { useEffect, useState } from "react";
import SubFrame from "../../components/SubFrame";
import NavBar from "../../components/NavBar";
import Profile from "../../components/Report/Profile";
import Step1 from "../../components/Report/Step1";
import Step2 from "../../components/Report/Step2";
import Step3 from "../../components/Report/Step3";
import Picture from "../../components/Report/Picture";
import bgImage from "../../assets/bg/bgImage.jpg";
import Spinner from "../../components/Spinner";
import { axiosInstance } from "../../api/apiClient";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { FaArrowLeft } from "react-icons/fa";

const Report = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogin } = useAuthStore();
  // 뒤로가기 버튼 표시 여부
  const isFromMypage =
    new URLSearchParams(location.search).get("from") === "mypage";

  // 로그인 여부 확인
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
      return;
    }
  }, [isLogin, navigate]);

  // 배포 확인용
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/room/${roomId}/report`);
        console.log("fetchData", response);
        setReportData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="h-screen overflow-y-scroll flex justify-center items-center bg-fixed bg-cover bg-center scrollbar-hide"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <SubFrame>
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-[80%] flex flex-col items-center py-10 gap-10 ">
            {/* // 네비게이션 바 */}
            <NavBar />

            {/* // 제목 */}
            <div className="w-full flex justify-between items-center">
              <div className="flex-1 flex justify-start">
                {isFromMypage && (
                  <FaArrowLeft
                    className="h-6 w-6 text-[#9400d3b0] cursor-pointer"
                    onClick={() => navigate(-1)}
                  />
                )}
              </div>
              <div className="flex-1 flex justify-center">
                <h1 className="text-4xl font-bold text-center text-[#9400d3b0] flex-1">
                  Report
                </h1>
              </div>
              <div className="flex-1"></div>
            </div>
            <Profile members={reportData?.memberReportResponseDtos} />

            {/* // 스텝 1, 2, 3 */}
            <Step1 Intro={reportData?.introReportResponseDtos} />
            <Step2 Ox={reportData?.oxReportResponseDtos} />
            <Step3 Balance={reportData?.balanceReportResponseDtos} />

            {/* // 활동 전후 사진 */}
            <Picture
              before={reportData?.roomBeforeImageUrl}
              after={reportData?.roomAfterImageUrl}
            />
          </div>
        )}
      </SubFrame>
    </div>
  );
};

export default Report;

//   // 로컬 확인용
//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         // "https://i11c209.p.ssafy.io/api/room/86/report",
//         "https://i11c209.p.ssafy.io/api/room/1364/report",
//         {
//           headers: {
//             authorization:
//               "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDkwMDQ0MjM3MDk5MTkxOTQxMDQiLCJyb2xlIjoiUk9MRV9VU0VSIiwibWVtYmVySWQiOjgsImlhdCI6MTcyMzM3Mjk0MSwiZXhwIjoxNzI1OTY0OTQxfQ.7SPnaQ2ARdN4qhBg7HBBwnvZZ8cD-xLM1rkM3cs0Mv8RtUTHHCfS37N4JNkvrwUXY_PsVE7lkeNY9K2DQZVj7Q",
//           },
//         }
//       );
//       console.log("fetchData", response);
//       setReportData(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);
