import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Headers } from "../Components/_Header";
import { HorizontalMenu } from "./___HorizontalMenu";
import { CircleMenu } from "./___CircleMenu";
export const OrderUnpaid = ({ setAuthCheck, authCheck }) => {
  const [getTotal, setTotal] = useState("");
  const [getCheckout, setCheckout] = useState("");
  const [getAddress, setAddress] = useState("");
  const [getDateFilter, setDateFilter] = useState("");
  const [getCourier, setCourier] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [loadFetch, setLoadFetch] = useState(false);

  const getCheckoutAPI = async () => {
    setLoadFetch(true);
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get(`api/checkout/view/?unpaid`).then((res) => {
        setCheckout(res.data[0]);
        setDateFilter(res.data[2]);
        setTotal(res.data[1]);
        setAddress(res.data[3]);
        setCourier(res.data[4]);
        setLoadFetch(false);
      });
    });
  };
  useEffect(() => {
    getCheckoutAPI();
  }, []);
  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post(`api/checkout/delete/${e.target.value}`).then((res) => {
        if (res.data.status === 201) return toast.warning("Server error");
        toast.success("Pesanan dibatalkan");
        getCheckoutAPI();
      });
    });
  };
  const numberFormat = (value) =>
    new Intl.NumberFormat("id-IN", {
      style: "currency",
      currency: "IDR",
      maximumSignificantDigits: 10,
    }).format(value);

  return (
    <div className="overflow-hidden">
      <Headers setAuthCheck={setAuthCheck} authCheck={authCheck} />
      <div className="xl:container md:container-lg md:px-10 xl:px-44 mx-2 xl:mx-auto mt-4 md:mt-20">
        <HorizontalMenu />
        {loadFetch && (
          <div className="p-6">
            <h5 className="mb-2 animate-pulse text-xl font-medium text-neutral-900 dark:text-white">
              <span className="inline-block min-h-[1em] w-6/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
            </h5>
            <p className="mb-4 animate-pulse text-base text-neutral-700 dark:text-white">
              <span className="inline-block min-h-[1em] w-7/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
              <span className="inline-block min-h-[1em] w-4/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
              <span className="inline-block min-h-[1em] w-4/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
              <span className="inline-block min-h-[1em] w-6/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
              <span className="inline-block min-h-[1em] w-8/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
            </p>
          </div>
        )}
        {getDateFilter &&
          getDateFilter.map((filter, filterKey) => {
            return (
              <div
                key={filterKey}
                className="flex-row-reverse md:flex justify-center items-start gap-4 mt-4">
                <div className="bg-slate-50 shadow-sm border border-slate-100 rounded-xl p-4 md:w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center gap-2">
                      <div className=" text-yello-700 flex justify-start gap-2 items-center">
                        <i className="fa fa-clock-o"></i>
                        <h1 className="font-semibold text-lg">
                          Menunggu Konfirmasi
                        </h1>
                      </div>
                    </div>
                    <button
                      onClick={handleDelete}
                      value={filter.split("//")[0]}
                      className="bg-red-600 hover:bg-red-700 px-10 py-1 rounded duration-200 text-white hover:px-14">
                      Batalkan Pesanan
                    </button>
                  </div>
                  {getCheckout.length > 0 && (
                    <div className="w-full border p-2 my-4 text-gray-600">
                      <h1>Tujuan Alamat : {getAddress[filterKey]}</h1>
                      <div className="flex justify-start items-center gap-1 text-sm">
                        <img
                          width={40}
                          src="https://jnewsonline.com/wp-content/uploads/2021/11/Foto-2-Naskah-Mengenal-Sosok-Kreator-Logo-%E2%80%98Biru-Tua-Merah-JNE.jpg"
                          alt=""
                        />
                        <h1 className="text-red-600 font-bold">
                          {getCourier[filterKey].split("//")[1]}
                        </h1>
                      </div>
                    </div>
                  )}
                  {getCheckout.length > 0 &&
                    getCheckout.map(
                      (item, key, arr) =>
                        item.created_at.split("T").join(" ").split(".")[0] ===
                          filter.split("//")[0] && (
                          <div
                            key={key}
                            className="md:flex border-b-2 py-4 border-dashed justify-between items-start gap-2">
                            <div className="flex justify-start items-start gap-2">
                              <img
                                className="rounded h-20 w-1/4 shadow-sm object-cover"
                                width={100}
                                src={`${
                                  process.env.REACT_APP_API
                                }Images/Product/${JSON.parse(item.image)[0]}`}
                                alt=""
                              />
                              <div>
                                <h1 className="text-gray-700">{item.title}</h1>
                                <p className="text-xs text-gray-700">
                                  Harga Produk :{" "}
                                  {numberFormat(
                                    item.special_price === null
                                      ? item.price
                                      : item.special_price
                                  )}
                                </p>
                                <p className="text-xs text-gray-700">
                                  Jumlah : {item.quantity}
                                </p>
                                <p className="text-md text-black font-medium">
                                  {numberFormat(item.subtotal)}
                                </p>
                                {item.notes && (
                                  <>
                                    <div className="chat chat-start">
                                      <div className="chat-bubble italic bg-slate-200 text-gray-800">
                                        {item.notes}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                    )}

                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="font-medium">Pembayaran : </h1>
                      <h1 className="font-medium text-orange-700">
                        BCA : 6045089654825336 a/n Calvin Arya Buntara
                      </h1>
                      <p className="text-xs text-red-600">
                        *Setelah melakukan pembayaran harap untuk mengonfirmasi
                        pesanan!
                      </p>
                      <a
                        href="https://wa.me/6289587827495"
                        target="__blank"
                        className="text-green-600 flex justify-start items-center gap-1 hover:text-green-700 text-md">
                        {" "}
                        <i className="fa fa-whatsapp"></i>{" "}
                        <p>Konfirmasi Pesanan</p>
                      </a>
                    </div>

                    <h1 className="font-bold text-xl text-green-600 mt-2 text-right p-4">
                      Total :
                      <span className="text-black ml-4">
                        {numberFormat(getTotal[filterKey])}
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <CircleMenu />
    </div>
  );
};
