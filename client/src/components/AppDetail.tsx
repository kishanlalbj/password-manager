import {
  CopyIcon,
  Edit2,
  GlobeIcon,
  LockIcon,
  TrashIcon,
  UserIcon
} from "lucide-react";
import { IApp } from "../types";
import MaskedText from "./MaskedText";
import Button from "./Button";
import moment from "moment";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ApplicationForm from "./ApplicationForm";
import { api } from "../utils";

type AppDetailProps = {
  app: IApp | undefined | null;
  onDelete: (arg0: string) => void;
  onSave: (app: IApp) => void;
  onViewPassword: (id: string) => void;
  passwordLoading: boolean;
};

const AppDetail = ({
  app,
  onDelete,
  onSave,
  onViewPassword,
  passwordLoading
}: AppDetailProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleConfirmDelete = () => {
    setShowConfirm((prev) => !prev);
  };

  const handleDelete = async () => {
    onDelete(app?._id ?? "");
    handleConfirmDelete();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(app?.password ?? "");
    setShowCopied(true);
  };

  const handleEditToggle = () => {
    setShowEdit((prev) => !prev);
  };

  const handleEditSave = async (formData: IApp) => {
    const res = await api.put(`/api/${formData._id}`, formData);
    onSave(res.data);
    handleEditToggle();
  };

  useEffect(() => {
    let timer: number | undefined;
    if (showCopied) {
      timer = setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [showCopied]);

  if (!app) return <p>No App selected</p>;

  return (
    <div className="my-3">
      <div className="bg-[#1c1c1c] p-4 rounded-md">
        <div className="flex items-center gap-2 mb-3">
          <h1 className="text-2xl">{app?.name} </h1>

          <Button variant="primary" onClick={handleEditToggle}>
            <Edit2 size={12} className="cursor-pointer" />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4 xs:grid-cols-1">
          <div>
            <p className="text-gray-400 inline-flex gap-1">
              <UserIcon />
              Username
            </p>
            <p>{app?.username}</p>
          </div>

          <div>
            <p className="text-gray-400 inline-flex gap-1">
              <LockIcon />
              Password
            </p>

            <div className="flex items-center gap-2 relative">
              <CopyIcon
                size={"16"}
                className="cursor-pointer"
                onClick={handleCopy}
              />

              <MaskedText
                text={app?.password}
                loading={passwordLoading}
                onView={() => onViewPassword(app?._id)}
              ></MaskedText>
              {showCopied && (
                <div className="absolute top-full left-0 w-fit px-2 py-1 bg-[#c1c1c1] text-xs text-black rounded-md">
                  Copied
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-gray-400 inline-flex gap-1">
              <GlobeIcon />
              Website
            </p>
            <a
              href={app?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {app?.website}
            </a>
          </div>
        </div>
      </div>

      <div className="my-5 float-right">
        <p className="text-sm text-gray-400 text-right">
          Created,{" "}
          {moment(app?.createdAt?.toString()).format("MMM Do YYYY, hh:mm A")}
        </p>

        <p className="text-sm text-gray-400 text-right">
          Modified,{" "}
          {moment(app?.updatedAt?.toString()).format("MMM Do YYYY, hh:mm A")}
        </p>
      </div>

      <div className="clear-left my-5">
        <Button variant="primary" onClick={handleConfirmDelete}>
          <TrashIcon size={16} />
        </Button>
      </div>

      <Modal show={showConfirm} title="Delete Application" confirm={true}>
        <h1>
          Are you sure want to delete the application {app?.name} permanently ?
          This cannot be reversed
        </h1>
        <footer className="inline-flex gap-4 mt-12">
          <Button onClick={handleDelete}>Yes</Button>
          <Button variant="outline" onClick={handleConfirmDelete}>
            No
          </Button>
        </footer>
      </Modal>

      <Modal show={showEdit} title="Edit Application">
        <ApplicationForm
          onSave={handleEditSave}
          onCancel={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setShowEdit(false);
          }}
          editMode={true}
          data={app}
        />
      </Modal>
    </div>
  );
};

export default AppDetail;
