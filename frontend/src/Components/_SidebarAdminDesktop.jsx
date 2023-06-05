import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
export const SidebarAdminDesktop = ({ setAuthCheck }) => {
  const location = useLocation();
  const navRedirect = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleLogout = async (e) => {
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post("api/logout")
        .then((res) => {
          toast.success("Anda telah logout");
          removeCookie("auth_token");
          secureLocalStorage.clear();
          navRedirect("/");
        })
        .catch((err) => {
          toast.success("Anda telah logout");
          removeCookie("auth_token");
          secureLocalStorage.clear();
          navRedirect("/");
        });
    });
  };
  return (
    <>
      <div className="bg-slate-900 w-2/4 h-2/4 rounded-xl hidden md:block md:pb-10">
        <div
          className="bg-slate-700 bg-opacity-30 rounded-3xl p-10"
          style={{ height: "80vh" }}>
          <div className="flex justify-start items-center gap-3 border-b pb-4">
            <i className="fa fa-user-circle text-5xl text-sky-500"></i>
            <h1 className="text-gray-300 font-normal text-2xl">
              Adm: {secureLocalStorage.getItem("auth_name")}
            </h1>
          </div>
          <div
            onClick={() => navRedirect("/administrator/dashboard")}
            className={`${
              location.pathname === "/administrator/dashboard"
                ? "bg-sky-600 text-white"
                : "hover:bg-sky-700 text-gray-300 hover:text-white"
            } flex gap-3 p-3 cursor-pointer text-xl  duration-200 ease-in-out rounded-xl mt-4 justify-start items-center`}>
            <i className="fa fa-user"></i>
            <h1 className="font-normal">Dashboard</h1>
          </div>
          <div
            onClick={() => navRedirect("/administrator/kategori")}
            className={`${
              location.pathname === "/administrator/kategori"
                ? "bg-sky-600 text-white"
                : "hover:bg-sky-700 text-gray-300 hover:text-white"
            } flex gap-3 p-3 cursor-pointer text-xl  duration-200 ease-in-out rounded-xl mt-4 justify-start items-center`}>
            <i className="fa fa-file-text"></i>
            <h1 className="font-normal">Kategori</h1>
          </div>
          <div
            onClick={() => navRedirect("/administrator/produk")}
            className={`${
              location.pathname === "/administrator/produk"
                ? "bg-sky-600 text-white"
                : "hover:bg-sky-700 text-gray-300 hover:text-white"
            } flex gap-3 p-3 cursor-pointer text-xl  duration-200 ease-in-out rounded-xl mt-4 justify-start items-center`}>
            <i className="fa fa-file-text"></i>
            <h1 className="font-normal">Produk</h1>
          </div>
          <div
            onClick={() => navRedirect("/administrator/pesanan")}
            className={`${
              location.pathname === "/administrator/pesanan"
                ? "bg-sky-600 text-white"
                : "hover:bg-sky-700 text-gray-300 hover:text-white"
            } flex gap-3 p-3 cursor-pointer text-xl  duration-200 ease-in-out rounded-xl mt-4 justify-start items-center`}>
            <i className="fa fa-file-text"></i>
            <h1 className="font-normal">Pesanan</h1>
          </div>

          <div
            onClick={handleLogout}
            className="flex gap-3 p-3 cursor-pointer text-xl mt-40 bg-red-600 hover:bg-red-700 text-white hover:text-white duration-200 ease-in-out rounded-xl justify-start items-center">
            <i className="fa fa-power-off"></i>
            <h1 className="font-normal -ml-1">Logout</h1>
          </div>
        </div>
      </div>
    </>
  );
};
