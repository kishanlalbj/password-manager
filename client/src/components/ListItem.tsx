import { Folder, FolderOpen } from "lucide-react";
import { type IApp } from "../types";
import { memo } from "react";

interface IListItemProps extends IApp {
  onClick: (name: string) => void;
  current: boolean;
}

const ListItem = ({
  _id,
  name,
  username,
  onClick,
  current
}: IListItemProps) => {
  return (
    <>
      <div
        className="flex items-center gap-4 px-4 py-2 bg-[#1c1c1c] border-b border-b-gray-900 cursor-pointer hover:bg-[#3c3c3c]"
        onClick={() => onClick(_id ?? "")}
      >
        <div>{current ? <FolderOpen /> : <Folder />}</div>
        <div>
          <h4 className="text-md font-semibold">{name}</h4>
          <p className="text-sm">{username}</p>
        </div>
      </div>
    </>
  );
};

export default memo(ListItem);
