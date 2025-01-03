import { Copy, ExternalLink, KeyIcon, LoaderIcon, Trash } from "lucide-react";
import { type IApp } from "../types";
import { memo } from "react";

interface IListItemProps extends IApp {
  loading: string;
  onDelete: (id: string) => void;
  onCopy: (password: string) => void;
}

const ListItem = ({
  _id,
  name,
  username,
  loading,
  website,
  onCopy,
  onDelete
}: IListItemProps) => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 bg-primary border-b border-b-gray-900">
        <div className="flex items-center gap-4 w-full">
          <div>
            <KeyIcon />
          </div>
          <div>
            <h4 className="text-md text-xl font-semibold">{name}</h4>
            <p className="text-sm text-zinc-300">{username}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {loading === _id ? (
            <LoaderIcon size={16} className="animate-spin"></LoaderIcon>
          ) : (
            <Copy
              size={16}
              onClick={() => onCopy(_id ?? "")}
              className="cursor-pointer"
            />
          )}

          <a href={website} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} className="cursor-pointer" />
          </a>
          <Trash
            size={16}
            color="red"
            onClick={() => onDelete(_id ?? "")}
            className="cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default memo(ListItem);
