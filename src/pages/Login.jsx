import React from "react";

const Login = ({ closeLogin }) => {
  const client_id = import.meta.env.VITE_CLIENT_ID;
  const client_secret = import.meta.env.VITE_CLIENT_SECRET;
  const REDIRECT_URI = "http://localhost:5173/auth/kakao/callback";

  return (
    
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeLogin}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-8 z-50">
        <h2 className="text-base mb-4">로그인이 필요한 서비스 입니다.</h2>

        <form>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="bg-yellow-400 text-black py-2 px-4 rounded w-full"
            >
              <a
                href={`https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${REDIRECT_URI}&response_type=code`}
              >
                Kakao Login
              </a>
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="bg-green-500 text-white py-2 px-4 rounded w-full"
            >
              네이버 로그인
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded"
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
