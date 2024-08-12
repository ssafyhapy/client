import React, { useEffect, useState } from "react";
import SubFrame from "../../components/SubFrame";
import NavBar from "../../components/NavBar";
import Profile from "../../components/Report/Profile";
import Step1 from "../../components/Report/Step1";
import Step2 from "../../components/Report/Step2";
import Step3 from "../../components/Report/Step3";
import Picture from "../../components/Report/Picture";
import bgImage from "../../assets/bg/bgImage.jpg";
// import axios from "axios";
import Spinner from "../../components/Spinner";
import { axiosInstance } from "../../api/apiClient";

const Report = ({roomId}) => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/room/${roomId}/report`,
        );
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
          <div className="w-[80%] flex flex-col items-center py-10 gap-5 ">
            {/* // 네비게이션 바 */}
            <NavBar />

            <div className="">
              {/* // 제목 */}
              <h1 className="text-4xl font-bold text-center">Report</h1>
            </div>

            <div className="flex gap-5">
              {/* // 프로필 */}
              <Profile members={reportData?.memberReportResponseDtos} />
            </div>

            <div className="w-full flex gap-5 mt-5">
              {/* // 스텝 1, 2 */}
              <Step1 Intro={reportData?.introReportResponseDtos} />
              <Step2 Ox={reportData?.oxReportResponseDtos} />
            </div>

            <div className="w-full">
              {/* // 스텝 3 */}
              <Step3 Balance={reportData?.balanceReportResponseDtos} />
            </div>

            <div className="w-full">
              {/* // 활동 전후 사진 */}
              <Picture
                before={reportData?.roomBeforeImageUrl}
                after={reportData?.roomAfterImageUrl}
              />
            </div>
          </div>
        )}
      </SubFrame>
    </div>
  );
};

export default Report;


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://i11c209.p.ssafy.io/api/room/86/report",
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