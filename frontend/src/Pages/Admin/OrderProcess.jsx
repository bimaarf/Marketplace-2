import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Headers } from "../../Components/_Header";
import { SidebarAdminDesktop } from "../../Components/_SidebarAdminDesktop";
import { HeaderMenu } from "./Components/___HeaderMenu";
export const OrderProcess = ({ setAuthCheck, authCheck }) => {
  const [getOrderProcess, setOrderProcess] = useState("");
  const [getUserOrder, setUserOrder] = useState("");
  const getOrderProcessAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/order-process/get").then((res) => {
        setUserOrder(res.data[0]);
        setOrderProcess(res.data[1]);
      });
    });
  };
  useEffect(() => {
    getOrderProcessAPI();
  }, []);
  return (
    <>
      <div className="overflow-hidden bg-slate-900">
        <Headers setAuthCheck={setAuthCheck} authCheck={authCheck} />
        <div className="md:container md:mx-auto pb-10 md:pt-10">
          <div className="md:flex md:columns-2 md:gap-10">
            <HeaderMenu />
            <SidebarAdminDesktop setAuthCheck={setAuthCheck} />
            <div className="bg-slate-700 bg-opacity-30 rounded-xl w-full p-3 md:p-10 ">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Atas Nama</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                {getUserOrder &&
                  getUserOrder.map((user, indexUser) => (
                    <tbody key={indexUser}>
                      <tr>
                        <td>{indexUser + 1}</td>
                        <td>{user.name}</td>
                        <td>
                          <Link
                            to={`/administrator/:${user.name}`}
                            className="px-2 py-1 fa fa-eye bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white rounded"></Link>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
