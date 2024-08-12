import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-4">{children}</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;