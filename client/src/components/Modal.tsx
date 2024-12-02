import React from "react";

type ModalProps = {
  show: boolean;
  title: string;
  confirm?: boolean;
  children: React.ReactNode;
};

const Modal = ({ show, title, children }: ModalProps) => {
  return (
    <div className={`${show ? "block" : "hidden"}`}>
      <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] h-full w-full">
        <div className="card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/6 sm:w-5/6 xl:w-3/6 xs:w-11/12">
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
