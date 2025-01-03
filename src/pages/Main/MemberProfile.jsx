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
import { FaArrowLeft } from "react-icons/fa";
import useAuthStore from "../../store/useAuthStore";

const MemberProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [memberData, setMemberData] = useState(null);
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const { isLogin } = useAuthStore();

  // 로그인 여부 확인
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
      return;
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    if (location.state?.errorMessage) {
      setError(location.state.errorMessage);
    }
  }, [location.state]);

  useEffect(() => {
    if (error) {
      setIsModalOpen(true);
    }
  }, [error]);

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
    navigate(-1);
  };

  // 유저 프로필 데이터 불러오기
  useEffect(() => {
    if (!isLogin) {
      return;
    }
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
          setError("프로필 비공개 멤버입니다.");
        } else {
          setError("프로필을 불러오는데 실패했습니다.");
        }
        setIsLoading(false);
      }
    };
    loadData();
  }, [memberId]);

  // 로딩 중일 때 스피너 표시
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div
      className="h-screen overflow-y-scroll flex justify-center items-center bg-fixed bg-cover bg-center scrollbar-hide"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <SubFrame>
        {memberData ? (
          <div className="flex flex-col items-center w-[80%] py-10 gap-5">
            <NavBar />
            <div className="w-full flex justify-between items-center">
              <div className="flex-1 flex justify-start">
                <FaArrowLeft
                  className="h-6 w-6 text-[#9400d3b0] cursor-pointer"
                  onClick={() => navigate(-1)}
                />
              </div>
              <div className="flex-1 flex justify-center">
                <h1 className="text-4xl font-bold text-center text-[#9400d3b0]">
                  Profile
                </h1>
              </div>
              <div className="flex-1"></div>
            </div>
            <div className="w-full flex flex-col items-center gap-5">
              <div className="w-full flex gap-5">
                <UserProfile
                  memberName={memberData.memberName}
                  memberProviderEmail={memberData.memberProviderEmail}
                  memberProfileImageUrl={memberData.memberProfileImageUrl}
                />
                <UserHistory memberHistoryList={memberData.memberHistoryList} />
              </div>
              <div className="w-full flex gap-5">
                <UserIntroduction
                  memberIntroduction={memberData.memberIntroduction}
                />
              </div>
              <div className="w-full flex">
                <UserMemoryBox
                  memberMemoryboxList={memberData.memberMemoryboxList}
                />
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </SubFrame>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Alert">
        <p>{error}</p>
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
