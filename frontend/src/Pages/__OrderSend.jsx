import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Headers } from "../Components/_Header";
import { HorizontalMenu } from "./___HorizontalMenu";
import { CircleMenu } from "./___CircleMenu";
import ReactToPrint from "react-to-print";
export const OrderSend = ({ setAuthCheck, authCheck }) => {
  const componentRef = useRef();
  const [getTotal, setTotal] = useState("");
  const [getCheckout, setCheckout] = useState("");
  const [getAddress, setAddress] = useState("");
  const [getDateFilter, setDateFilter] = useState("");
  const [getCourier, setCourier] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [loadFetch, setLoadFetch] = useState(false);

  const numberFormat = (value) =>
    new Intl.NumberFormat("id-IN", {
      style: "currency",
      currency: "IDR",
      maximumSignificantDigits: 3,
    }).format(value);

  const getCheckoutAPI = async () => {
    setLoadFetch(true);
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get(`api/checkout/view/?order-send`).then((res) => {
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
  const handleTakeOrders = async (e) => {
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post(`api/checkout/finish/store/${e.target.value}`).then((res) => {
        if (res.data.status === 201) return toast.warning("Server error");
        toast.success("Pesanan diterima");
        getCheckoutAPI();
      });
    });
  };
  const [formRatting, setFormRatting] = useState({
    product_id: "",
    stars: 5,
    message: "",
  });
  const handleChangeRatting = (e) => {
    e.persist();
    setFormRatting({ ...formRatting, [e.target.name]: e.target.value });
  };
  const handleSubmitRatting = async (x) => {
    console.log(formRatting);
    console.log(x);
    const data = {
      product_id: x,
      stars: formRatting.stars,
      message: formRatting.message,
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post(`api/ratting/store/${x}`, data).then((res) => {
        if (res.data.status === 201) return toast.warning("Server error");
        if (res.data.status === 202)
          return toast.warning("Anda sudah memberi ratting");
        toast.success("Ulasan terkirim");
      });
    });
  };

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
                ref={componentRef}
                key={filterKey}
                className="flex-row-reverse md:flex justify-center items-start gap-4 mt-4">
                <div className="bg-slate-50 shadow-sm border border-slate-100 rounded-xl p-4 md:w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center gap-2">
                      <div className=" text-green-700 flex justify-start gap-2 items-center">
                        <i className="fa fa-car"></i>

                        <h1 className="font-semibold text-lg">Sudah Dikirim</h1>
                      </div>
                    </div>
                    <button
                      onClick={handleTakeOrders}
                      value={filter.split("//")[0]}
                      className="bg-orange-600 hover:bg-orange-700 px-10 py-1 rounded duration-200 text-white hover:px-14">
                      Pesanan Diterima
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <ReactToPrint
                      trigger={() => {
                        return (
                          <a
                            href="#"
                            className="hover:text-orange-700 duration-300">
                            {" "}
                            <i className="fa fa-download"></i> Cetak Laporan
                          </a>
                        );
                      }}
                      content={() => componentRef.current}
                    />
                  </div>
                  {getCheckout.length > 0 && (
                    <div className="w-full border p-2 my-4 text-gray-600">
                      <h1>
                        Tujuan Alamat :{" "}
                        {!getAddress[filterKey]
                          ? getAddress[filterKey - filterKey]
                          : getAddress[filterKey]}
                      </h1>
                      <div className="flex justify-start items-center gap-1 text-sm">
                        {getCourier[filterKey].split("//")[1] ===
                        "Gojek (instan)" ? (
                          <>
                            <img
                              width={40}
                              src="https://static-00.iconduck.com/assets.00/gojek-icon-512x512-dyy6mlv4.png"
                              alt=""
                            />
                            <h1 className="text-green-600 font-bold">
                              {getCourier[filterKey].split("//")[1]}
                            </h1>
                          </>
                        ) : (
                          <>
                            <img
                              width={40}
                              src="https://jnewsonline.com/wp-content/uploads/2021/11/Foto-2-Naskah-Mengenal-Sosok-Kreator-Logo-%E2%80%98Biru-Tua-Merah-JNE.jpg"
                              alt=""
                            />
                            <h1 className="text-red-600 font-bold">
                              {getCourier[filterKey].split("//")[1]}
                            </h1>
                          </>
                        )}
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
                            <form>
                              <label htmlFor="message">Nilai</label>
                              <br />
                              <div className="rating">
                                <input
                                  onChange={handleChangeRatting}
                                  type="radio"
                                  name="stars"
                                  value={1}
                                  className="mask mask-star-2 bg-orange-400"
                                />
                                <input
                                  onChange={handleChangeRatting}
                                  type="radio"
                                  name="stars"
                                  value={2}
                                  className="mask mask-star-2 bg-orange-400"
                                />
                                <input
                                  onChange={handleChangeRatting}
                                  type="radio"
                                  name="stars"
                                  value={3}
                                  className="mask mask-star-2 bg-orange-400"
                                />
                                <input
                                  onChange={handleChangeRatting}
                                  type="radio"
                                  name="stars"
                                  value={4}
                                  className="mask mask-star-2 bg-orange-400"
                                />
                                <input
                                  onChange={handleChangeRatting}
                                  type="radio"
                                  name="stars"
                                  value={5}
                                  className="mask mask-star-2 bg-orange-400"
                                />
                              </div>
                              <div className="flex justify-start items-center">
                                <input
                                  className="form-controll px-2 py-1 focus:border-green-500 w-full border outline-none"
                                  type="text"
                                  onChange={handleChangeRatting}
                                  placeholder="Ulasan... (optional)"
                                  name="message"
                                  id="message"
                                />
                                <p
                                  onClick={() =>
                                    handleSubmitRatting(item.product_id)
                                  }
                                  className="bg-orange-500 cursor-pointer flex justify-center items-center gap-1 border-orange-500 hover:border-orange-600 hover:bg-orange-600 duration-200 py-0.5 px-4 text-white">
                                  <i className="fa fa-paper-plane text-lg"></i>
                                </p>
                              </div>
                            </form>
                          </div>
                        )
                    )}
                  <h1 className="font-bold text-xl text-green-600 mt-2 text-right p-4">
                    Total :
                    <span className="text-black ml-4">
                      {numberFormat(getTotal[filterKey])}
                    </span>
                  </h1>
                </div>
              </div>
            );
          })}
      </div>
      <CircleMenu />
    </div>
  );
};
