import React, { useEffect, useState } from "react";
import SubFrame from "../../components/SubFrame";
import NavBar from "../../components/NavBar";
import Profile from "../../components/Report/Profile";
import Step1 from "../../components/Report/Step1";
import Step2 from "../../components/Report/Step2";
import Step3 from "../../components/Report/Step3";
import Picture from "../../components/Report/Picture";
import bgImage from "../../assets/bg/bgImage.jpg";
import { axiosInstance } from "../../api/apiClient";
import axios from "axios";

const Report = () => {
  // const fetchData = async () => {
  //   try {
  //     // const response = await axiosInstance.get(`/room/${roomId}/report`);
  //     const response = await axiosInstance.get("/room/86/report");
  //     console.log("fetchData", response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://i11c209.p.ssafy.io/api/room/86/report",
          {
            headers: {
              authorization:
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjQ0OTYzMjM4Iiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo3LCJpYXQiOjE3MjMzNTgyMjQsImV4cCI6MTcyNTk1MDIyNH0.J9_nmImreR9eiiDwpuQpIq-c8290UgkCq45lCn9ePVcTWFIMmvYQ9QMcuBtmArzTrLrZBUhkmM3vAeE2AUa3Ug",
            },
          }
        );
        console.log("fetchData", response);
        setReportData(response.data.data);
      } catch (error) {
        console.error(error);
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
        <div className="w-[80%] flex flex-col items-center py-10 gap-5 ">
          {/* // 네비게이션 바 */}
          <NavBar />

          <div className="">
            {/* // 제목 */}
            <h1 className="text-4xl font-bold text-center">Report</h1>
          </div>

          <div className="flex gap-5">
            {/* // 프로필 */}
            <Profile members={reportData?.memberReportResponseDtos}/>
          </div>

          <div className="w-full flex gap-5 mt-5">
            {/* // 스텝 1, 2 */}
            <Step1 Intro={reportData?.introReportResponseDtos}/>
            <Step2 Ox={reportData?.oxReportResponseDtos}/>
          </div>

          <div className="w-full">
            {/* // 스텝 3 */}
            <Step3 Balance={reportData?.balanceReportResponseDtos}/>
          </div>

          <div className="w-full">
            {/* // 활동 전후 사진 */}
            <Picture before={reportData?.roomBeforeImageUrl} after={reportData?.roomAfterImageUrl}/>
          </div>
        </div>
      </SubFrame>
    </div>
  );
};

export default Report;
