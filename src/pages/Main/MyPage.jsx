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

  const { isEditMode, setEditMode } = useUpdateStore();

  const methodReset = () => {
    methods.reset({
      memberName,
      memberProviderEmail,
      memberProfileImageUrl,
      memberIntroduction,
      memberHistoryList,
      memberMemoryboxList,
      deletedHistoryList: [],
    });
  };

  const handleEditMode = async () => {
    setIsLoading(true);
    await methodReset();
    await setEditMode();
    setIsLoading(false);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchData("/member/mypage");
      methodReset();
      setIsLoading(false);
    };

    loadData();
  }, [fetchData]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await updateData("/member/mypage", data);
      await fetchData("/member/mypage");
    } catch (error) {
      console.error(error);
    } finally {
    setIsLoading(false);
    setEditMode(false);
    }
  };

  if (isLoading) {
    return <Spinner />; // 로딩 중일 때 표시할 컴포넌트
  }

  return (
    <FormProvider {...methods}>
      <MainGradientBackground>
        <MyPageFrame>
          <div className="flex flex-col items-center gap-6">
            <div className="w-[800px] flex flex-col">
              <NavBar />
              <Header
                isEditMode={isEditMode}
                handleEditMode={handleEditMode}
                onSubmit={methods.handleSubmit(onSubmit)}
              />
            </div>
            <form className="flex flex-col items-center gap-5">
              <div className="flex gap-5">
                <Profile
                />
                <History
                  isEditMode={isEditMode}
                />
              </div>
              <div className="flex gap-5">
                <Introduction
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
