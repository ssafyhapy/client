import React from "react";

const LoginAlert = ({ message, setLoginAlert }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={setLoginAlert}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-8 z-50 flex flex-col items-center">
        <h1 className="text-base mb-4">{message}</h1>
        <button
          onClick={setLoginAlert}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginAlert;
