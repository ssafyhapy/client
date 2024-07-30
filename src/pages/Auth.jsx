import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import useAuthStore from "../store/useAuthStore";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // zustand store
  const { setUser, setAccessToken } = useAuthStore();

  // URLSearchParams를 사용하여 인가코드를 가져옴
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const codeParam = params.get("code");
    setCode(codeParam);
  }, [location]);

  // 인가코드가 있을 경우 서버로 요청을 보내어 토큰을 받아옴
  useEffect(() => {
    if (!code) {
      // code가 없을 경우 로딩 상태를 false로 설정
      setIsLoading(false);
      return;
    }

    // 서버로 인가코드를 보내어 토큰을 받아오는 함수
    const fetchCode = async () => {
      try {
        const response = await axios.post(
          "http://i11c209.p.ssafy.io:8080/member/login",
          {
            registrationId: "kakao",
            authorization: code,
          },
          // headers 생략 가능(default 값임), 특정 API 요구 사항이나 커스텀 헤더 필요할 때 헤더 설정
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        // 서버로부터 받은 데이터를 result에 저장
        const result = response.data;
        setUser(result.user);
        setAccessToken(result.accessToken);
        // play로 리다이렉트
        navigate("/play");
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCode();
  }, [code, setUser, setAccessToken, navigate]);

  // 로딩 중일 때 Spinner 컴포넌트를 렌더링
  if (isLoading) return <Spinner />;
  // 에러 발생 시 에러 메시지를 렌더링
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      // 인가코드가 있을 경우 해당 코드를 렌더링
      {code && <div>{code}</div>}
      // 로딩 중이 아니고 에러가 없을 경우 로그인 성공 메시지를 렌더링
      {!isLoading && !error && <div>Login successful, redirecting...</div>}
    </div>
  );
};

export default Auth;
