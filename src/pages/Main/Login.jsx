import React from "react";
import kakaoLogin from "../../assets/Login/kakaoLogin.png";
import googleLogin from "../../assets/Login/googleLogin.png";

const Login = ({ closeLogin }) => {
  const kakao_client_id = import.meta.env.VITE_CLIENT_ID;
  const kakao_client_secret = import.meta.env.VITE_CLIENT_SECRET;
  const KAKAO_REDIRECT_URI = "https://i11c209.p.ssafy.io/oauth2/code/kakao";
  const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = "https://i11c209.p.ssafy.io/oauth2/code/google";
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeLogin}
      ></div>
      <div className="bg-white rounded-lg shadow-lg py-5 px-6 z-50">
        <h2 className="text-base mb-4 text-center">로그인이 필요한 서비스 입니다.</h2>

        <form>
          <div className="flex justify-center mt-4">
            <button type="button" className="drop-shadow-lg">
              <a
                href={`https://kauth.kakao.com/oauth/authorize?client_id=${kakao_client_id}&client_secret=${kakao_client_secret}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`}
              >
                <img className="w-[250px]" src={kakaoLogin} alt="" />
              </a>
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button type="button" className="drop-shadow-lg">
              <a
                href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${google_client_id}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`}
              >
                <img className="w-[250px]" src={googleLogin} alt="" />
              </a>
            </button>
          </div>

          <div className="flex justify-center mt-4 ">
            <button
              type="button"
              className="bg-[#C2ACF4] font-bold text-white bold py-2 px-4 rounded-full drop-shadow-lg"
              onClick={closeLogin}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
