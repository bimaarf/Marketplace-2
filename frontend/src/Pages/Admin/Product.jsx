import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Headers } from "../../Components/_Header";
import { SidebarAdminDesktop } from "../../Components/_SidebarAdminDesktop";
import { ModalUpdateProduct } from "./Components/__ModalUpdateProduct";
import { HeaderMenu } from "./Components/___HeaderMenu";

export const Product = ({ setAuthCheck, authCheck }) => {
  const [getProduct, setProduct] = useState("");
  const navRedirect = useNavigate();

  const getProductAPI = () => {
    axios.get("api/product/view").then((res) => {
      setProduct(res.data);
    });
  };
  useEffect(() => {
    getProductAPI();
  }, []);
  const numberFormat = (value) =>
    new Intl.NumberFormat("id-IN", {
      style: "currency",
      currency: "IDR",
      maximumSignificantDigits: 10,
    }).format(value);
  return (
    <div className="overflow-hidden bg-slate-900">
      <Headers setAuthCheck={setAuthCheck} authCheck={authCheck} />
      <div className="md:container md:mx-auto pb-10 md:pt-10">
        <div className="md:flex md:columns-2 md:gap-10">
          <HeaderMenu />
          <SidebarAdminDesktop setAuthCheck={setAuthCheck} />
          <div className="bg-slate-700 bg-opacity-30 rounded-xl w-full p-3 md:p-10 ">
            <div className="grid gap-2 my-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {/* <label htmlFor={`update-modal-product${item.id}`}> */}
              {getProduct &&
                getProduct.map((item, key) => (
                  <div key={key}>
                    <ModalUpdateProduct
                      item={item}
                      getProductAPI={getProductAPI}
                    />
                    <label
                      htmlFor={`update-modal-product${item.id}`}
                      className="p-2 w-52 h-80 mt-2 rounded cursor-pointer">
                      <div className="flex justify-center items-start">
                        <img
                          src={`${process.env.REACT_APP_API}Images/Product/${
                            JSON.parse(item.image)[0]
                          }`}
                          className="w-full h-44 object-cover hover:scale-95 duration-300"
                          alt=""
                        />
                      </div>
                      <p className="text-start text-sm md:text-md font-light mt-2 text-gray-300">
                        {item.title}
                      </p>
                      {item.special_price === null ? (
                        <>
                          <h1 className="text-start text-sm md:text-md my-1 text-gray-300 font-medium">
                            {numberFormat(item.price)}
                          </h1>
                        </>
                      ) : (
                        <>
                          <h1 className="text-start text-sm md:text-md my-1 text-gray-300 font-medium">
                            {numberFormat(item.special_price)}
                          </h1>
                          <div className="flex justify-start gap-1 items-center">
                            <p className="bg-green-300 rounded p-1 text-xs font-medium text-green-800">
                              Promo
                            </p>
                            <p className="text-xs text-gray-500 line-through">
                              {numberFormat(item.price)}
                            </p>
                          </div>
                        </>
                      )}
                      <ul className="flex justify-start mt-2">
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 34 34"
                            fill="currentColor"
                            className="h-5 w-5 text-warning">
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </li>
                        <p className="text-gray-500 text-xs">
                          {item.ulasan} | Dilihat {item.activity}
                        </p>
                      </ul>
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
