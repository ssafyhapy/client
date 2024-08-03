import { useNavigate } from "react-router-dom";
import { EditIcon } from "./EditIcon";
import { PublicIcon } from "./PublicIcon";
import { axiosInstance } from "../../api/apiClient";

const Header = ({ isEditMode, setEditMode, onSubmit }) => {
  const handlePublic = async () => {
    try {
      const response = await axiosInstance.put("/member/mypage/visibility");
      console.log("공개 설정 성공", response);
    } catch (error) {
      console.error("공개 설정 실패", error);
    }
  };
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
          <EditIcon onClick={setEditMode} />
        )}
        <PublicIcon onClick={handlePublic} />
      </div>
    </div>
  );
};
export default Header;
