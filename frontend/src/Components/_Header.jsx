import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import LogoImg from "../Images/logo.jpg";
export const Headers = ({
  setAuthCheck,
  authCheck,
  handleCart,
  handleChangeSearch,
  formSearch,
}) => {
  const location = useLocation();
  const navRedirect = useNavigate();
  const [getCategory, setCategory] = useState("");
  const [getCart, setCart] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();

  const getCategoryAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/category/view").then((res) => {
        setCategory(res.data);
      });
    });
  };
  const getCartAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/cart/view").then((res) => {
        setCart(res.data[0]);
      });
    });
  };
  useEffect(() => {
    getCategoryAPI();
    if (
      secureLocalStorage.getItem("auth_role") ===
      "78bc4980127963e8c55a379d3f8cdae182dfa543"
    ) {
      getCartAPI();
    }
    if (
      secureLocalStorage.getItem("auth_role") ===
      "1a42443e0191c3b6dcbbdeadb50490de8c0d204a"
    ) {
      getNotifAPI();
    }
  }, [handleCart]);

  const [getNotif, setNotif] = useState("");
  const getNotifAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/notif-report/get").then((res) => {
        setNotif(res.data);
      });
    });
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post("api/logout")
        .then((res) => {
          navRedirect("/");
          toast.success("Anda telah logout");
          removeCookie("auth_token");
          secureLocalStorage.clear();
        })
        .catch((err) => {
          navRedirect("/");
          toast.success("Anda telah logout");
          removeCookie("auth_token");
          secureLocalStorage.clear();
        });
    });
  };
  return (
    <div className="sticky top-0 bg-slate-900 z-30 border-b border-gray-700">
      <div className="bg-gray-l100 flex justify-between md:px-10 px-4 py-1">
        <a
          href="https://www.instagram.com/aceesoris.id"
          target="__blank"
          className="flex items-center text-gray-500 hover:text-orange-700 duration-300 text-xs py-1 gap-1">
          <i className="fa fa-instagram"></i>
          <p>@aceesoris.id</p>
        </a>
      </div>
      <div className="flex md:gap-4 justify-between items-start shadow  md:px-4 px-4 py-6 md:py-5">
        <div className="md:flex justify-start items-start gap-1 pr-4 w-2/3 md:w-5/6">
          <img src={LogoImg} width={100} alt="" />
          <div
            onClick={() => navRedirect("/")}
            className="text-gray-300 md:text-3xl font-medium mb-4 cursor-pointer"
            style={{ fontFamily: "'Marko One', sans-serif" }}>
            <span>Aceesoris.</span>
            <span>id</span>
          </div>
          {location.pathname === "/" && (
            <div className="w-full">
              <div className="flex items-center gap-2">
                <div className="w-full">
                  <i className="fa fa-search text-gray-400 absolute p-1.5"></i>
                  <input
                    type="search"
                    name="search"
                    value={formSearch.search}
                    onChange={handleChangeSearch}
                    className="border rounded text-gray-300 bg-gray-600 border-gray-600 focus:border-gray-500 w-fitt md:w-full outline-none px-8 py-1 text-sm"
                    placeholder="Cari di marketplace"
                  />
                </div>
              </div>
              <div className="text-xs mt-4 flex gap-4 overflow-x-auto py-2">
                {getCategory &&
                  getCategory.map((item, key) => (
                    <button
                      name="search"
                      value={item.name}
                      onClick={handleChangeSearch}
                      key={key}
                      className={`${
                        formSearch.search === item.name
                          ? "text-cyan-600"
                          : "text-gray-500"
                      } whitespace-nowrap hover:text-gray-600 duration-300`}>
                      {item.name}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
        {authCheck === true && secureLocalStorage.getItem("auth_token") ? (
          <div className="flex justify-center items-center gap-6">
            {secureLocalStorage.getItem("auth_role") ===
            "78bc4980127963e8c55a379d3f8cdae182dfa543" ? (
              <div
                onClick={() => navRedirect("/keranjang")}
                className="relative -mt-4 -ml-20 md:ml-0 cursor-pointer hover:text-gray-500 text-gray-300 duration-150">
                {getCart.length > 0 && (
                  <div className="t-0 absolute left-3">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                      {getCart.length}
                    </p>
                  </div>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="file: mt-4 h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
            ) : (
              <>
                {getNotif.length > 0 && (
                  <div className="relative dropdown dropdown-left -mt-4 -ml-20 md:ml-0 cursor-pointer hover:text-gray-500 text-gray-300 duration-150">
                    <label tabIndex="0" className="btn m-1">
                      <div className="t-0 absolute right-0 top-1">
                        <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                          {getNotif.length}
                        </p>
                      </div>
                      <i className="fa fa-bell text-xl mt-2"></i>
                    </label>
                    <ul
                      tabIndex="0"
                      className="dropdown-content menu shadow bg-base-100 rounded-box w-96">
                      <li>
                        <div
                          className="alert bg-yellow-500 hover:bg-yellow-600"
                          onClick={() => navRedirect("/administrator/pesanan")}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="stroke-black shrink-0 w-6 h-6">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <p className="text-black">
                            Ada {getNotif.length} pesanan yg belum diproses
                          </p>
                          <p className="text-white font-medium">Lihat</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}

            <div className="dropdown">
              <label
                tabIndex={0}
                className="bg-slate-800 cursor-pointer outline-none hover:bg-opacity-100 bg-opacity-70 duration-300 font-medium text-gray-300 text-sm lg:text-md px-4 md:px-10 py-1.5 rounded-sm border border-slate-300">
                {secureLocalStorage.getItem("auth_token") &&
                  secureLocalStorage.getItem("auth_name").split(" ")[0]}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content mt-4 -ml-10 menu p-2 shadow bg-base-100 rounded-box">
                {secureLocalStorage.getItem("auth_token") &&
                  secureLocalStorage.getItem("auth_role") ===
                    "1a42443e0191c3b6dcbbdeadb50490de8c0d204a" && (
                    <li onClick={() => navRedirect("/administrator/dashboard")}>
                      <a>Dashboard</a>
                    </li>
                  )}
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 justify-end items-center md:border-l border-gray-700 w-1/3 md:w-1/6">
            <Link
              to={"/login"}
              className="px-4 py-1 text-sm md:text-md border-gray-700 hover:bg-slate-800 border rounded-lg font-medium text-gray-300">
              Masuk
            </Link>
            <Link
              to={"/register"}
              className="px-4 py-1 text-sm md:text-md bg-slate-800 hover:bg-opacity-80 rounded-lg border border-gray-700 font-medium text-gray-300">
              Daftar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
