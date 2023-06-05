import React, { useEffect, useState } from "react";
import { Headers } from "../../Components/_Header";
import { SidebarAdminDesktop } from "../../Components/_SidebarAdminDesktop";
import axios from "axios";
import { ModalUpdateCategory } from "./Components/__ModalUpdateCategory";
import { ModalDeleteCategory } from "./Components/__ModalDeleteCategory";
import { HeaderMenu } from "./Components/___HeaderMenu";

export const Category = ({ setAuthCheck, authCheck }) => {
  const [getCategory, setCategory] = useState("");

  const getCategoryAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/category/view").then((res) => {
        setCategory(res.data);
      });
    });
  };
  useEffect(() => {
    getCategoryAPI();
  }, []);
  return (
    <div className="overflow-hidden bg-slate-900">
      <Headers setAuthCheck={setAuthCheck} authCheck={authCheck} />
      <div className="md:container md:mx-auto pb-10 md:pt-10">
        <div className="md:flex md:columns-2 md:gap-10">
          <SidebarAdminDesktop setAuthCheck={setAuthCheck} />
          <HeaderMenu />
          <div className="bg-slate-200 bg-opacity-30 rounded-xl w-full p-3 md:p-10 ">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Kategori</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              {getCategory &&
                getCategory.map((item, key) => (
                  <tbody key={key}>
                    <tr>
                      <td>{key + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <ModalUpdateCategory
                          getCategoryAPI={getCategoryAPI}
                          item={item}
                        />
                        <ModalDeleteCategory
                          getCategoryAPI={getCategoryAPI}
                          item={item}
                        />
                        <div className="flex justify-start gap-1 items-center">
                          <label
                            htmlFor={`my-modal-category${item.id}`}
                            className="fa fa-pencil cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-2 rounded"></label>
                          <label
                            htmlFor={`my-category-delete${item.id}`}
                            className="fa fa-trash cursor-pointer bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded"></label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
