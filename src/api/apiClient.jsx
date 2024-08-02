import axios from "axios";
import { baseUrl } from "./constants";

// getJWTHeader 함수 : JWT 토큰(accessToken)을 받아 Authorization 헤더 객체를 생성
// 파라미터 : jwt토큰(accessToken) 넣어줘야함
// 반환값 : { Authorization: "Bearer 토큰"}
const getJWTHeader = (accessToken) => {
  return { Authorization: `Bearer ${accessToken}` };
};

// config 객체에 baseURL 설정
const config = { baseURL: baseUrl };

// axios.create()로 기본 설정이 적용된 axios 인스턴스 생성
export const axiosInstance = axios.create(config);

// 인증 필요없는 요청
// axios.get(`${baseUrl}/endpoint`, ...);
// axios.post(`${baseUrl}/endpoint`, ...);

// JWT 인증이 필요한 요청
// axiosInstance.get('/endpoint');
// axiosInstance.post('/endpoint');

// refreshToken을 사용하여 새로운 accessToken을 요청하는 함수
const refreshToken = async () => {
  try {
    const response = await axios.post("https://i11c209.p.ssafy.io/api/oauth/reissue-tokens", null, {
      withCredentials: true, // 쿠키를 포함하여 요청
    });
    const accessToken = response.headers.authorization.replace(/^Bearer\s/, "");

    // 새로운 accessToken을 sessionStorage에 저장
    sessionStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    console.error("refreshToken을 사용한 accessToken 갱신 실패", error);
    throw error;
  }
};

// 요청 인터셉터 설정: 모든 요청에 대해 헤더에 accessToken을 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
      config.headers = { ...config.headers, ...getJWTHeader(accessToken) };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 설정: 401 에러 시 refreshToken을 사용하여 새로운 accessToken을 요청
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도하지 않은 요청일 때만
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers = {
          ...originalRequest.headers,
          ...getJWTHeader(newAccessToken),
        };
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("accessToken 갱신 실패 후 재시도 중 에러:", error);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
