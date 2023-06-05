import React, { useState } from "react";
import { Headers } from "../Components/_Header";
import label from "../Images/label.png";
import { BestSelling } from "./Components/_BestSelling";
import { Products } from "./Components/_Products";
import { CircleMenu } from "./___CircleMenu";
export const Home = ({ setAuthCheck, authCheck }) => {
  const [formSearch, setFormSearch] = useState({ search: "" });
  const handleChangeSearch = (e) => {
    e.persist();
    setFormSearch({ ...formSearch, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Headers
        formSearch={formSearch}
        handleChangeSearch={handleChangeSearch}
        setAuthCheck={setAuthCheck}
        authCheck={authCheck}
      />
      <div className="bg-slate-900 pb-20">
        <div className="xl:container md:container-lg md:px-10 xl:px-44 mx-2 xl:mx-auto pt-4">
          <div className="flex justify-center items-center">
            <img src={label} alt="label" className="w-screen rounded" />
          </div>
          {formSearch.search === "" && (
            <div className="border border-gray-700 mt-4 p-2 rounded-xl">
              <h1 className="my-2 text-gray-300 font-semibold">
                Produk Terlaris
              </h1>
              <div className="flex gap-2 justify-start  items-start overflow-x-auto md:pt-0 md:py-2">
                <BestSelling />
              </div>
            </div>
          )}
          <Products setFormSearch={setFormSearch} formSearch={formSearch} />
        </div>
        <CircleMenu />
      </div>
    </>
  );
};
