import React from "react";

type ModalProps = {
  show: boolean;
  title: string;
  confirm?: boolean;
  children: React.ReactNode;
  onClose: (value: React.SetStateAction<boolean>) => void;
};

const Modal = ({ show, title, children, onClose }: ModalProps) => {
  return (
    <div
      className={`${show ? "block" : "hidden"}`}
      role="button"
      tabIndex={0}
      onClick={() => onClose(false)}
    >
      <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] h-full w-full">
        <div
          className="card absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/6 sm:w-5/6 xl:w-3/6 xs:w-11/12"
          role="button"
          tabIndex={0}
          onClick={(e) => e.stopPropagation()}
        >
          <header>
            <h1 className="text-3xl mb-6">{title}</h1>
          </header>

          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Modal;
