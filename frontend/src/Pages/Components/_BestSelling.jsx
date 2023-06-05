import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const BestSelling = () => {
  const navRedirect = useNavigate();
  const [loadFetch, setLoadFetch] = useState(false);

  const [getPopuler, setPopuler] = useState("");
  const getPopulerAPI = async () => {
    setLoadFetch(true);
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/product/populer/view").then((res) => {
        setPopuler(res.data);
        setLoadFetch(false);
      });
    });
  };
  useEffect(() => {
    getPopulerAPI();
  }, []);
  const numberFormat = (value) =>
    new Intl.NumberFormat("id-IN", {
      style: "currency",
      currency: "IDR",
      maximumSignificantDigits: 3,
    }).format(value);
  return (
    <>
      {loadFetch && (
        <>
          {(function (rows, i, len) {
            while (++i <= len) {
              rows.push(
                <div
                  key={i}
                  className="p-2 animate-pulse w-full text-neutral-400 border rounded hover:bg-gray-100 cursor-pointer">
                  <div>
                    <div className="flex justify-center">
                      <span className="inline-block min-h-[1em] w-4/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
                    </div>
                    <p className="text-start text-sm md:text-md font-light mt-2">
                      <span className="inline-block min-h-[1em] w-4/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
                    </p>
                    <span className="inline-block min-h-[1em] w-4/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>

                    <div className="flex justify-start gap-1 items-center">
                      <span className="inline-block min-h-[1em] w-4/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>

                      <span className="inline-block min-h-[1em] w-4/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
                    </div>
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
                      <span className="inline-block min-h-[1em] w-4/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
                    </ul>
                  </div>
                </div>
              );
            }
            return rows;
          })([], 0, 5)}
        </>
      )}
      {getPopuler &&
        getPopuler.map((item, key) => (
          <div
            key={key}
            onClick={() => navRedirect(`/v/:${item.slug}`)}
            className="p-2 border border-gray-700 w-48 h-80 rounded hover:bg-slate-7000 bg-slate-800 hover:bg-slate-700 cursor-pointer">
            <div className="flex justify-center items-center">
              <img
                src={`${process.env.REACT_APP_API}Images/Product/${
                  JSON.parse(item.image)[0]
                }`}
                className="w-full h-32 object-cover"
                alt=""
              />
            </div>
            <p className="text-start text-sm md:text-md font-light text-gray-300 mt-2">
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
          </div>
        ))}
    </>
  );
};
