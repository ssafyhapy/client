import React from "react";
import { EditIcon } from "./EditIcon";
import { PublicIcon } from "./PublicIcon";

const Header = ({ isEditMode, handleEditMode, onSubmit }) => {
  return (
    <div className="flex justify-between">
      <div className="w-[33%]"></div>
      <div className="w-[33%">
        <h1 className="text-4xl">My Page</h1>
      </div>
      <div className="flex justify-end items-center gap-5 w-[33%]">
        {isEditMode ? (
          <button onClick={onSubmit} className="btn-save">
            수정 완료
          </button>
        ) : (
          <EditIcon onClick={handleEditMode} />
        )}
        <PublicIcon />
      </div>
    </div>
  );
};
export default Header;
