import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import MainGradientBackground from "../../components/Common/MainGradientBackground";
import MyPageFrame from "../../components/My_page/MyPageFrame";
import { useMypageStore, useUpdateStore } from "../../store/useMypageStore";
import Header from "../../components/My_page/Header";
import Profile from "../../components/My_page/Profile";
import History from "../../components/My_page/History";
import Introduction from "../../components/My_page/Introduction";
import Memory from "../../components/My_page/Memory";
import MemoryBox from "../../components/My_page/MemoryBox";
import { FormProvider, useForm } from "react-hook-form";
import Spinner from "../../components/Spinner";

const MyPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    memberName,
    memberProviderEmail,
    memberProfileImageUrl,
    memberIntroduction,
    memberHistoryList,
    memberMemoryboxList,
    fetchData,
    updateData,
  } = useMypageStore();

  const { isEditMode, setEditMode } = useUpdateStore();

  const methods = useForm({
    defaultValues: {
      memberName: memberName || "",
      memberProviderEmail: memberProviderEmail || "",
      memberProfileImageUrl: memberProfileImageUrl || "",
      memberIntroduction: memberIntroduction || "",
      memberHistoryList: memberHistoryList || [],
      memberMemoryboxList: memberMemoryboxList || [],
      deletedHistoryList: [],
    },
  });

  useEffect(() => {
    const loadData = async () => {
      await fetchData("/member/mypage");

      methods.reset({
        memberName,
        memberProviderEmail,
        memberProfileImageUrl,
        memberIntroduction,
        memberHistoryList,
        memberMemoryboxList,
        deletedHistoryList: [],
      });

      setIsLoading(false);
    };

    loadData();
  }, [fetchData]);

  if (isLoading) {
    return <Spinner />; // 로딩 중일 때 표시할 컴포넌트
  }

  const onSubmit = async (data) => {
    console.log("Form data before submit:", data);
    // 데이터 업데이트 시도
    // TODO :여기 update 성공하면 fetch 데이터 되도록 수정해야 할 듯요(update반환값이 204이면 => fetchdata가 실행되도록?)
    await updateData("/member/mypage", data);

    // 업데이트 성공 시 최신 데이터 다시 불러오기
    await fetchData("/member/mypage");
    // 데이터가 업데이트되면 수정 모드 해제
    setEditMode(false);

  };

  return (
    <FormProvider {...methods}>
      <MainGradientBackground>
        <MyPageFrame>
          <div className="flex flex-col items-center gap-6">
            <div className="w-[800px] flex flex-col">
              <NavBar />
              <Header
                isEditMode={isEditMode}
                setEditMode={setEditMode}
                onSubmit={methods.handleSubmit(onSubmit)}
              />
            </div>
            <form className="flex flex-col items-center gap-5">
              <div className="flex gap-5">
                <Profile
                  memberName={memberName}
                  memberProfileImageUrl={memberProfileImageUrl}
                  memberProviderEmail={memberProviderEmail}
                />
                <History
                  memberHistoryList={memberHistoryList}
                  isEditMode={isEditMode}
                />
              </div>
              <div className="flex gap-5">
                <Introduction
                  memberIntroduction={memberIntroduction}
                  isEditMode={isEditMode}
                />
              </div>
              <div className="flex">
                <Memory memberMemoryboxList={memberMemoryboxList}>
                  <MemoryBox />
                </Memory>
              </div>
            </form>
          </div>
        </MyPageFrame>
      </MainGradientBackground>
    </FormProvider>
  );
};

export default MyPage;
