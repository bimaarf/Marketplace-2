import React from "react";
import { CircleMenuModal } from "./___CircleMenuModal";

export const CircleMenu = () => {
  return (
    <>
      <CircleMenuModal />
      <label
        htmlFor="my-modal-help"
        className="fixed bottom-24 right-5 cursor-pointer inline-block rounded-full bg-slate-700 hover:bg-slate-800 duration-200 bg-danger px-4 py-1.5 text-3xl leading-normal text-white">
        <i className="fa fa-commenting-o"></i>
      </label>
      <a
        href="https://wa.me/6289587827495"
        target="__blank"
        className="fixed bottom-5 right-5 inline-block rounded-full bg-slate-700 hover:bg-slate-800 duration-200 bg-danger px-4 py-1.5 text-3xl leading-normal text-white">
        <i className="fa fa-whatsapp"></i>
      </a>
    </>
  );
};
