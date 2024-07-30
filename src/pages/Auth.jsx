import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useAuthStore from "../store/useAuthStore";

const Auth = () => {
  const location = useLocation();
  // redirect를 위한 navigate
  // const navigate = useNavigate();
  const [code, setcode] = useState(null);

  // zustand 스토어의 매서드 가져오기
  const { setUser, setAccessToken } = useAuthStore();

  // code 파라미터를 가져와서 state에 저장
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const codeParam = params.get("code");
    setcode(codeParam);
  }, [location]);

  // code를 이용해 서버로 요청을 보내는 함수
  const fetchCode = async (code) => {
    const response = await fetch(
      "http://i11c209.p.ssafy.io:8080/member/login",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationId: 'kakao',
          authorization: code,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // 서버로부터 받은 응답을 json으로 변환하여 반환
    return response.json();
  };

  // useQuery를 이용해 서버로 요청을 보내고 결과를 받아오는 hook
  const { data, error, isLoading } = useQuery(
    ["fetchCode", code],
    () => fetchCode(code),
    {
      // code가 있을 때만 쿼리 실행
      enabled: !!code,
      onSuccess: () => {
        // 요청이 성공하면 zustand 스토어에 사용자 정보 저장
        setUser(data.user);
        setAccessToken(data.accessToken);
        // 요청이 성공하면 /play 경로로 리다이렉트
        //   navigate("/play");
      },
    }
  );

  // 로딩 중일 때는 Spinner 컴포넌트를 렌더링
  if (isLoading) return <Spinner />;
  // 에러가 발생하면 에러 메시지 렌더링
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>{code}</div>
      <div>{data ? JSON.stringify(data) : "No data found"}</div>
    </>
  );
};

export default Auth;
