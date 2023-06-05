import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
export const HorizontalMenu = () => {
  const navRedirect = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="flex justify-start items-center gap-2 whitespace-nowrap overflow-x-auto z-50 md:overflow-clip h-32 mb-4 -mt-4 md:-mt-10 max-w-full">
        <div
          onClick={() => navRedirect("/keranjang")}
          className={`${
            location.pathname === "/keranjang"
              ? "bg-red-700"
              : "bg-sky-600 hover:bg-sky-700"
          } px-4 w-full md:w-80 py-2 flex justify-center items-center gap-2 hover:scale-105 rounded   cursor-pointer duration-300 text-white`}>
          <i className="fa fa-shopping-cart text-lg md:text-2xl"></i>
          <h1 className="text-sm lg:text-md font-medium">Keranjang</h1>
        </div>
        <div
          onClick={() => navRedirect("/menunggu-konfirmasi")}
          className={`${
            location.pathname === "/menunggu-konfirmasi"
              ? "bg-red-700"
              : "bg-sky-600 hover:bg-sky-700"
          } px-4 w-full md:w-80 py-2 flex justify-center items-center gap-2 hover:scale-105 rounded   cursor-pointer duration-300 text-white`}>
          <i className="fa fa-clock-o text-lg md:text-2xl"></i>
          <h1 className="text-sm lg:text-md font-medium">
            Menunggu Konfirmasi
          </h1>
        </div>
        <div
          onClick={() => navRedirect("/pesanan-dikonfirmasi")}
          className={`${
            location.pathname === "/pesanan-dikonfirmasi"
              ? "bg-red-700"
              : "bg-sky-600 hover:bg-sky-700"
          } px-4 w-full md:w-80 py-2 flex justify-center items-center gap-2 hover:scale-105 rounded   cursor-pointer duration-300 text-white`}>
          <i className="fa fa-houzz text-lg md:text-2xl"></i>
          <h1 className="text-sm lg:text-md font-medium">
            Pesanan Dikonfirmasi
          </h1>
        </div>
        <div
          onClick={() => navRedirect("/pesanan-dikirim")}
          className={`${
            location.pathname === "/pesanan-dikirim"
              ? "bg-red-700"
              : "bg-sky-600 hover:bg-sky-700"
          } px-4 w-full md:w-80 py-2 flex justify-center items-center gap-2 hover:scale-105 rounded   cursor-pointer duration-300 text-white`}>
          <i className="fa fa-car text-lg md:text-2xl"></i>
          <h1 className="text-sm lg:text-md font-medium">Pesanan Dikirim</h1>
        </div>
        <div
          onClick={() => navRedirect("/sampai-tujuan")}
          className={`${
            location.pathname === "/sampai-tujuan"
              ? "bg-red-700"
              : "bg-sky-600 hover:bg-sky-700"
          } px-4 w-full md:w-80 py-2 flex justify-center items-center gap-2 hover:scale-105 rounded   cursor-pointer duration-300 text-white`}>
          <i className="fa fa-map-marker text-lg md:text-2xl"></i>
          <h1 className="text-sm lg:text-md font-medium">Sampai Tujuan</h1>
        </div>
      </div>
    </>
  );
};
