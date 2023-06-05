import React from "react";
import secureLocalStorage from "react-secure-storage";
import { Headers } from "../../Components/_Header";
import { SidebarAdminDesktop } from "../../Components/_SidebarAdminDesktop";
import { ModalAddProduct } from "./Components/__ModalAddProduct";
import { ModalAddCategory } from "./Components/__ModalAddCategory";
import { HeaderMenu } from "./Components/___HeaderMenu";
import { OrderReport } from "./Components/___OrderReport";

export const Dashboard = ({ setAuthCheck, authCheck }) => {
  return (
    <div className="overflow-hidden bg-slate-900">
      <Headers setAuthCheck={setAuthCheck} authCheck={authCheck} />
      <div className="md:container md:mx-auto pb-10 md:pt-10">
        <div className="md:flex md:columns-2 md:gap-10">
          <HeaderMenu />
          <SidebarAdminDesktop setAuthCheck={setAuthCheck} />
          <div className="bg-slate-700 bg-opacity-30 rounded-xl w-full p-3 md:p-10 ">
            <h1 className="md:text-2xl text-xl font-bold text-gray-300">
              SELAMAT DATANG,{" "}
            </h1>
            <h1 className="text-xl font-bold text-gray-300">
              Adm: {secureLocalStorage.getItem("auth_name")}
            </h1>
            <div className="flex justify-center items-center gap-2 md:gap-10 mt-4">
              <ModalAddCategory />

              <label htmlFor="my-modal-category" className="md:w-1/3 w-1/2">
                <div className="bg-cyan-600 p-5 rounded-md flex items-center justify-between hover:-mt-2 hover:mb-2 hover:bg-cyan-700 hover:shadow-xl shadow-black duration-500 ease-in-out cursor-pointer">
                  <div className="flex justify-start items-center gap-2">
                    <i className="text-white fa fa-file-text bg-white bg-opacity-20 p-2 rounded"></i>
                    <h1 className="text-white text-md">Kategori</h1>
                  </div>
                </div>
              </label>

              <ModalAddProduct />
              <label htmlFor="my-modal-product" className="md:w-1/3 w-1/2">
                <div className="bg-cyan-600 p-5 rounded-md flex items-center justify-between hover:-mt-2 hover:mb-2 hover:bg-cyan-700 hover:shadow-xl shadow-black duration-500 ease-in-out cursor-pointer">
                  <div className="flex justify-start items-center gap-2">
                    <i className="text-white fa fa-file-text bg-white bg-opacity-20 p-2 rounded"></i>
                    <h1 className="text-white text-md">Produk</h1>
                  </div>
                </div>
              </label>
            </div>
            <OrderReport />
          </div>
        </div>
      </div>
    </div>
  );
};
