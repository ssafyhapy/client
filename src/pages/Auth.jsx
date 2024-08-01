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
  const { setMemberName, setAccessToken } = useAuthStore();

  // URLSearchParams를 사용하여 인가코드를 가져옴
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const codeParam = params.get("code");
    console.log("codeParam", codeParam);
    setCode(codeParam);
  }, [location]);

  // 인가코드가 있을 경우 서버로 요청을 보내어 토큰을 받아옴
  useEffect(() => {
    setIsLoading(true);
    // 서버로 인가코드를 보내어 토큰을 받아오는 함수
    const fetchCode = async () => {
      try {
        const response = await axios.post(
          "https://i11c209.p.ssafy.io:8080/oauth/login",
          {
            registrationId: "kakao",
            authorization: code,
          },
          // headers 생략 가능(default 값임), 특정 API 요구 사항이나 커스텀 헤더 필요할 때 헤더 설정
          {
            headers: {
              "Content-Type": "application/json",
            },
            // 쿠키를 포함하는 옵션
            withCredentials: true,
          }
        );
        const result = response.data;

        // zustand store에 사용자 이름 저장
        console.log("memberName", result.data.memberName);
        setMemberName(result.data.memberName);
        
        const headerData = response.headers;
        console.log("accessToken", headerData["authorization"].replace(/^Bearer\s/, ''));
        const accessToken = headerData["authorization"].replace(/^Bearer\s/, '');
        // 토큰을 cessionStorage에 저장
        sessionStorage.setItem("accessToken", accessToken);
        // zustand store에  accessToken 저장
        setAccessToken(accessToken)

        // play로 리다이렉트
        navigate("/play");

      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCode();
  }, [code, setMemberName, navigate]);

  return (
    <div>
      {/* 로딩 중일 때 Spinner 컴포넌트를 렌더링 */}
      {isLoading && <Spinner />}

      {/* 로딩이 끝나고 에러 발생 시 에러 메시지를 렌더링 */}
      {!isLoading && error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default Auth;
