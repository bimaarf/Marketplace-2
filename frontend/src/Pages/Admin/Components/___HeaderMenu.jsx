import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const HeaderMenu = () => {
  const location = useLocation();
  const navRedirect = useNavigate();
  return (
    <>
      <div className="flex md:hidden m-2 whitespace-nowrap justify-start items-center gap-2 h-20 overflow-x-auto">
        <div
          onClick={() => navRedirect("/administrator/dashboard")}
          className={`${
            location.pathname === "/administrator/dashboard"
              ? "bg-slate-200"
              : "bg-slate-100"
          } w-40 p-2 gap-2 active:scale-105 duration-300 text-black font-medium rounded flex justify-center items-center`}>
          <i className="fa fa-user"></i>
          <h1>Dashboard</h1>
        </div>
        <div
          onClick={() => navRedirect("/administrator/kategori")}
          className={`${
            location.pathname === "/administrator/kategori"
              ? "bg-slate-200"
              : "bg-slate-100"
          } w-40 p-2 gap-2 active:scale-105 duration-300 text-black font-medium rounded flex justify-center items-center`}>
          <i className="fa fa-file-text"></i>
          <h1>Kategori</h1>
        </div>
        <div
          onClick={() => navRedirect("/administrator/produk")}
          className={`${
            location.pathname === "/administrator/produk"
              ? " bg-slate-200"
              : " bg-slate-100"
          } w-40 p-2 gap-2 active:scale-105 duration-300 text-black font-medium rounded flex justify-center items-center`}>
          <i className="fa fa-file-text"></i>
          <h1>Product</h1>
        </div>
      </div>
    </>
  );
};
