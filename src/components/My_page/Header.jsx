import { EditIcon } from "./EditIcon";
import { PublicIcon } from "./PublicIcon";

const Header = () => {
  return (
    <div className="flex justify-between">
    <div className="w-[33%]"></div>
    <div className="w-[33%">
      <h1 className="text-4xl">My Page</h1>
    </div>
    <div className="flex justify-end items-center gap-5 w-[33%]">
      <EditIcon />
      <PublicIcon />
    </div>
  </div>
  );
}
export default Header;