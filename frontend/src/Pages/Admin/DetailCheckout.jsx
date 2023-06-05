import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Headers } from "../../Components/_Header";
import axios from "axios";
import { toast } from "react-toastify";

export const DetailCheckout = ({ setAuthCheck, authCheck }) => {
  const { username } = useParams();
  const [getTotal, setTotal] = useState("");
  const [getCheckout, setCheckout] = useState("");
  const [getAddress, setAddress] = useState("");
  const [getDateFilter, setDateFilter] = useState("");
  const [getCourier, setCourier] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false);
  const numberFormat = (value) =>
    new Intl.NumberFormat("id-IN", {
      style: "currency",
      currency: "IDR",
      maximumSignificantDigits: 3,
    }).format(value);

  const getCheckoutAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .get(`api/checkout/detail/get/${username.split(":")[1]}`)
        .then((res) => {
          setCheckout(res.data[0]);
          setDateFilter(res.data[2]);
          setTotal(res.data[1]);
          setAddress(res.data[3]);
          setCourier(res.data[4]);
        });
    });
  };
  useEffect(() => {
    getCheckoutAPI();
  }, []);

  const handleProcess = async (e) => {
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post(`api/checkout/detail/process/${e.target.value}`)
        .then((res) => {
          if (res.data.status === 201) return toast.warning("Server error");
          toast.success("Berhasil dikonfirmasi");
          getCheckoutAPI();
        });
    });
  };
  const handleConfirm = async (e) => {
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post(`api/checkout/detail/confirm/${e.target.value}`)
        .then((res) => {
          if (res.data.status === 201) return toast.warning("Server error");
          toast.success("Berhasil dikonfirmasi");
          getCheckoutAPI();
        });
    });
  };
  const handleSending = async (e) => {
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post(`api/checkout/detail/sending/${e.target.value}`)
        .then((res) => {
          if (res.data.status === 201) return toast.warning("Server error");
          toast.success("Berhasil dikirim");
          getCheckoutAPI();
        });
    });
  };
  return (
    <>
      <div className="overflow-hidden">
        <Headers setAuthCheck={setAuthCheck} authCheck={authCheck} />
        <div className="xl:container md:container-lg md:px-10 xl:px-44 mx-2 xl:mx-auto mt-4 md:mt-20">
          {getDateFilter &&
            getDateFilter.map((filter, filterKey) => {
              return (
                <div
                  key={filterKey}
                  className="flex-row-reverse md:flex justify-center items-start gap-4 mt-4">
                  <div className="bg-slate-50 shadow-sm border border-slate-100 rounded-xl p-4 md:w-full">
                    <div className="flex justify-between items-center">
                      <div className="flex justify-start items-center gap-2">
                        {filter.split("//")[1] === "unpaid" && (
                          <div className=" text-yello-700 flex justify-start gap-2 items-center">
                            <i className="fa fa-clock-o"></i>
                            <h1 className="font-semibold text-lg">
                              Menunggu Konfirmasi
                            </h1>
                          </div>
                        )}
                        {filter.split("//")[1] === "paid" && (
                          <div className=" text-orange-700 flex justify-start gap-2 items-center">
                            <i className="fa fa-houzz"></i>
                            <h1 className="font-semibold text-lg">
                              Menunggu Dikirim
                            </h1>
                          </div>
                        )}
                        {filter.split("//")[1] === "confirmed" && (
                          <div className=" text-green-700 flex justify-start gap-2 items-center">
                            <i className="fa fa-clock-o"></i>
                            <h1 className="font-semibold text-lg">
                              Menunggu DIkirim
                            </h1>
                          </div>
                        )}
                        {filter.split("//")[1] === "processed" && (
                          <div className=" text-green-700 flex justify-start gap-2 items-center">
                            <i className="fa fa-car"></i>

                            <h1 className="font-semibold text-lg">
                              Sudah Dikirim
                            </h1>
                          </div>
                        )}
                      </div>
                      {getCheckout.length > 0 &&
                        filter.split("//")[1] === "unpaid" && (
                          <button
                            value={filter.split("//")[0]}
                            onClick={handleProcess}
                            disabled={loadSubmit ? true : false}
                            className="bg-green-700 hover:bg-green-800 px-10 py-1 text-white duration-200 hover:px-14 hover:rounded rounded-sm">
                            Konfirmasi Pesanan
                          </button>
                        )}
                     
                      {getCheckout.length > 0 &&
                        filter.split("//")[1] === "paid" && (
                          <button
                            value={filter.split("//")[0]}
                            onClick={handleSending}
                            disabled={loadSubmit ? true : false}
                            className="bg-cyan-700 hover:bg-cyan-800 px-10 py-1 text-white duration-200 hover:px-14 hover:rounded rounded-sm">
                            Kirim Pesanan
                          </button>
                        )}
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
                                  <h1 className="text-gray-700">
                                    {item.title}
                                  </h1>
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
      </div>
    </>
  );
};
