import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import SubFrame from "../../components/SubFrame";
import UserProfile from "../../components/MemberProfile/UserProfile";
import UserHistory from "../../components/MemberProfile/UserHistory";
import UserIntroduction from "../../components/MemberProfile/UserIntroduction";
import UserMemoryBox from "../../components/MemberProfile/UserMemoryBox";
import Spinner from "../../components/Spinner";
import bgImage from "../../assets/bg/bgImage.jpg";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { axiosInstance } from "../../api/apiClient";
import Modal from "../../components/Modal";

const MemberProfile = () => {
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  const [memberData, setMemberData] = useState({});
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.errorMessage) {
      setIsModalOpen(true);
    }
  }, [location]);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  // 유저 프로필 데이터 불러오기
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axiosInstance.get(`member/${memberId}`);
        console.log("loadData", response);
        setMemberData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        if (
          error.response &&
          error.response.data.errorMsg === "프로필 비공개 멤버입니다."
        ) {
          setErrorMessage("프로필 비공개 멤버입니다.");
          setIsModalOpen(true);
        } else {
          setErrorMessage("프로필을 불러오는데 실패했습니다.");
          setIsModalOpen(true);
        }
        setIsLoading(false);
      }
    };
    loadData();
  }, [memberId, navigate]);

  console.log("memberData", memberData);
  // 로딩 중일 때 스피너 표시
  if (isLoading) {
    return <Spinner />; // 로딩 중일 때 표시할 컴포넌트
  }

  return (
    <div
      className="h-screen overflow-y-scroll flex justify-center items-center bg-fixed bg-cover bg-center scrollbar-hide"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <SubFrame>
        <div className="flex flex-col items-center w-[80%] py-10 gap-5">
          <NavBar />
          <div className="w-full flex justify-center">
            <h1 className="text-4xl">Profile</h1>
          </div>
          <div className="w-full flex flex-col items-center gap-5">
            <div className="w-full flex gap-5">
              <UserProfile
                memberName={memberData?.memberName}
                memberProviderEmail={memberData?.memberProviderEmail}
                memberProfileImageUrl={memberData?.memberProfileImageUrl}
              />
              <UserHistory memberHistoryList={memberData?.memberHistoryList} />
            </div>
            <div className="w-full flex gap-5">
              <UserIntroduction
                memberIntroduction={memberData?.memberIntroduction}
              />
            </div>
            <div className="w-full flex">
              <UserMemoryBox
                memberMemoryboxList={memberData?.memberMemoryboxList}
              />
            </div>
          </div>
        </div>
      </SubFrame>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Error">
        <p>{errorMessage}</p>
      </Modal>
    </div>
  );
};

export default MemberProfile;

// // 유저 프로필 데이터 불러오기
// useEffect(() => {
//   const loadData = async () => {
//     try {
//       const response = await axios.get(
//         "https://i11c209.p.ssafy.io/api/member/11",
//         {
//           headers: {
//             authorization:
//               "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDkwMDQ0MjM3MDk5MTkxOTQxMDQiLCJyb2xlIjoiUk9MRV9VU0VSIiwibWVtYmVySWQiOjgsImlhdCI6MTcyMzM3Mjk0MSwiZXhwIjoxNzI1OTY0OTQxfQ.7SPnaQ2ARdN4qhBg7HBBwnvZZ8cD-xLM1rkM3cs0Mv8RtUTHHCfS37N4JNkvrwUXY_PsVE7lkeNY9K2DQZVj7Q",
//           },
//         }
//       );
//       console.log("loadData", response);
//       setMemberData(response.data.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error(error);
//       if (
//         error.response &&
//         error.response.data.errorMsg === "프로필 비공개 멤버입니다."
//       ) {
//         alert("프로필 비공개 멤버입니다.");
//         navigate("/report");
//         // report 페이지 연결 후 뒤로 가기 주석 해제하기
//         // window.history.back();
//       } else {
//         alert("프로필을 불러오는데 실패했습니다.");
//         window.history.back();
//         setIsLoading(false);
//       }
//     }
//   };
//   loadData();
// }, []);
