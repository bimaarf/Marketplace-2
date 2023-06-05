import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Headers } from "../Components/_Header";
import axios from "axios";
import { toast } from "react-toastify";
import { HorizontalMenu } from "./___HorizontalMenu";
import { CircleMenu } from "./___CircleMenu";
export const Cart = ({ setAuthCheck, authCheck }) => {
  const navRedirect = useNavigate();
  const [getProduct, setProduct] = useState("");
  const [total, setTotal] = useState(0);
  const [stateNote, setStateNote] = useState(false);
  const [loadCost, setLoadCost] = useState(false);
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [loadFetch, setLoadFetch] = useState(false);

  const getProductAPI = async () => {
    setLoadFetch(true);
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/cart/view").then((res) => {
        setProduct(res.data[0]);
        setTotal(res.data[1]);
        setLoadFetch(false);
      });
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

  const handleMinQuantity = async (e) => {
    const data = {
      min: e.target.value,
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post(`api/cart/update/?min${e.target.value}=${e.target.value}`, data)
        .then((res) => {
          getProductAPI();
        });
    });
  };
  const handlePlusQuantity = async (e) => {
    const data = {
      plus: e.target.value,
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post(`api/cart/update/?plus${e.target.value}=${e.target.value}`, data)
        .then((res) => {
          getProductAPI();
        });
    });
  };
  const handleDeleteCart = async (e) => {
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post(`api/cart/delete/${e.target.value}`).then((res) => {
        if (res.data.status === 201) return toast.warning("Server error");
        getProductAPI();
        toast.success("Berhasil dihapus");
      });
    });
  };
  const [getProvince, setProvince] = useState("");
  const [getCity, setCity] = useState("");
  const [formAddress, setFormAddress] = useState({
    province: 12,
    city: 364,
    address: "",
  });
  const handleChangeAddress = (e) => {
    if (e.target.name !== "address") {
      handleCostCheck();
    }
    e.persist();
    setFormAddress({ ...formAddress, [e.target.name]: e.target.value });
  };
  const getProvinceAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .get(`api/province-city/view?province_id=${formAddress.province}`)
        .then((res) => {
          setProvince(res.data[0]);
          setCity(res.data[1]);
        });
    });
  };
  useEffect(() => {
    getProvinceAPI();
    handleCostCheck();
  }, []);

  const [costType, setCostType] = useState("");
  const [costValue, setCostValue] = useState("");
  const [costCourier, setCostCourier] = useState("");
  const [costCourierT, setCostCourierT] = useState("");

  const handleCostCheck = async (e) => {
    setLoadCost(true);
    const data = {
      city: formAddress.city,
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post("api/cek-ongkir/store", data).then((res) => {
        setCostType(res.data.rajaongkir.results[0].costs);
        setCostValue(res.data.rajaongkir.results[0].costs[0].cost[0].value);
        setLoadCost(false);
        if (costType !== "") {
          setTimeout(() => {
            document.getElementById("cost-check" + 0).click();
          }, 1000);
        }
      });
    });
  };
  // checkout
  const handleCheckout = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    const data = {
      total: total + costValue,
      courier: costCourier,
      courier_t: costCourierT,
      province: formAddress.province,
      city: formAddress.city,
      address: formAddress.address,
    };
    await axios.get("sanctum/csrf-cookie").then(
      axios.post("api/checkout/store", data).then((res) => {
        setLoadSubmit(false);
        if (res.data.status === 201)
          return toast.warning("Pilih jenis pengiriman");
        toast.success("Pesanan akan diproses");
        navRedirect("/menunggu-konfirmasi");
      })
    );
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
        <div className="flex-row-reverse md:flex justify-center items-start gap-4">
          {getProduct.length > 0 && (
            <div className="md:w-1/3 md:sticky md:top-40">
              <div className="bg-slate-50 shadow-sm border border-slate-100 rounded-xl p-4">
                <h1 className="text-sm md:text-md lg:text-lg font-bold">
                  Ringkasan Belanja
                </h1>
                {costType &&
                  costType.map((item, key) => (
                    <div
                      id={`cost-check${key}`}
                      onClick={() => {
                        setCostCourier(item.service);
                        setCostCourierT(item.description);
                        setCostValue(item.cost[0].value);
                      }}
                      key={key}
                      className={`${
                        item.cost[0].value === costValue
                          ? "bg-slate-200"
                          : "bg-slate-50"
                      } border p-2 mt-0.5 cursor-pointer hover:bg-slate-100 flex justify-between items-center gap-2`}>
                      <div>
                        <div className="flex justify-start items-center gap-1 text-sm">
                          <img
                            width={40}
                            src="https://jnewsonline.com/wp-content/uploads/2021/11/Foto-2-Naskah-Mengenal-Sosok-Kreator-Logo-%E2%80%98Biru-Tua-Merah-JNE.jpg"
                            alt=""
                          />

                          <h1 className="text-red-600 font-bold">
                            {item.service}
                          </h1>
                        </div>
                        <p className="text-xs text-gray-600">
                          ({item.description}) est: {item.cost[0].etd} hari
                        </p>
                      </div>
                      {loadCost ? (
                        <h1 className="text-right text-gray-700 text-xs">
                          ...menghitung
                        </h1>
                      ) : (
                        <h1 className="text-right text-black">
                          {numberFormat(item.cost[0].value)}
                        </h1>
                      )}
                    </div>
                  ))}
                <div className="text-sm flex justify-between my-4 items-center gap-2">
                  <p className="text-gray-500 font-medium">
                    <span className="text-gray-700">({getProduct.length})</span>{" "}
                    Total :{" "}
                  </p>

                  {loadCost ? (
                    <p className="text-gray-700 text-sm font-bold animate-pulse">
                      ...
                    </p>
                  ) : (
                    <p className="text-black text-lg font-bold">
                      {numberFormat(total + costValue)}
                    </p>
                  )}
                </div>
                <div className="text-sm">
                  <label htmlFor="province" className="text-black">
                    Provinsi
                  </label>
                  <select
                    name="province"
                    id="province"
                    onChange={handleChangeAddress}
                    onBlur={getProvinceAPI}
                    className="form-control w-full py-2 px-1 outline-none border focus:border-sky-500 rounded bg-white">
                    {getProvince &&
                      getProvince.map((province, indexProvince) => (
                        <option
                          key={indexProvince}
                          value={province.province_id}>
                          {province.province}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="text-sm mt-3">
                  <label htmlFor="city" className="text-black">
                    Kota Tujuan
                  </label>
                  <select
                    name="city"
                    id="city"
                    onChange={handleChangeAddress}
                    className="form-control w-full py-2 px-1 outline-none border focus:border-sky-500 rounded bg-white">
                    {getCity &&
                      getCity.map((city, indexCity) => (
                        <option key={indexCity} value={city.city_id}>
                          {city.city_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="text-sm mt-3">
                  <label htmlFor="address" className="text-black">
                    Alamat Lengkap
                  </label>
                  <input
                    required
                    onChange={handleChangeAddress}
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Ketikkan alamat..."
                    className="form-control w-full py-2 px-2 outline-none border focus:border-sky-500 rounded bg-white"
                  />
                </div>
                <button
                  disabled={loadCost ? true : false}
                  onClick={handleCheckout}
                  className="w-full mt-4 md:mt-10 bg-sky-600 hover:bg-sky-700 py-1.5 rounded duration-300 text-white font-medium">
                  Checkout
                  {loadCost && "..."}
                </button>
                <div className="flex text-sm mt-4 border-t pt-4 border-dashed justify-between items-center gap-2">
                  <div className="flex justify-center border-r pr-4 items-center gap-1 cursor-pointer">
                    <i className="fa fa-whatsapp text-sky-600"></i>
                    <p className="text-gray-700 hover:text-sky-600 duration-200">
                      WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className={`bg-slate-50 shadow-sm border border-slate-100 rounded-xl p-4 ${
              getProduct.length > 0 ? "md:w-2/3" : "md:w-full"
            }`}>
            <div className="flex justify-start items-center gap-2">
              <i className="fa fa-shopping-cart"></i>
              <h1 className="font-semibold text-lg">Keranjang</h1>
            </div>
            {getProduct &&
              getProduct.map((item, key) => (
                <div
                  key={key}
                  className="md:flex border-b-2 py-4 border-dashed justify-between items-start gap-2">
                  <div
                    key={key}
                    className="flex justify-start items-start gap-2">
                    <img
                      className="rounded h-20 w-1/4 shadow-sm object-cover"
                      width={100}
                      src={`${process.env.REACT_APP_API}Images/Product/${
                        JSON.parse(item.image)[0]
                      }`}
                      alt=""
                    />
                    <div>
                      <h1 className="text-gray-700">{item.title}</h1>
                      <p className="text-xs text-gray-700">
                        {numberFormat(
                          item.special_price === null
                            ? item.price
                            : item.special_price
                        )}
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
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={handleDeleteCart}
                      value={item.id}
                      className="fa fa-trash text-red-700 hover:text-red-800 cursor-pointer"></button>
                    <div className="flex justify-end">
                      <div className="number-input form-group border-0 mt-4 md:mt-0">
                        <button
                          disabled={item.quantity === "1" ? true : false}
                          type="button"
                          value={item.id}
                          onClick={handleMinQuantity}
                          style={{ width: 30, height: 30 }}
                          className={`${
                            item.quantity === "1"
                              ? "text-gray-600"
                              : "text-sky-600"
                          } text-xl font-semibold border`}>
                          -
                        </button>

                        <input
                          id="quantity"
                          className="text-center border outline-none"
                          min="1"
                          max="12"
                          name="quantity"
                          value={item.quantity}
                          type="number"
                          readOnly
                        />

                        <button
                          value={item.id}
                          onClick={handlePlusQuantity}
                          style={{ width: 30, height: 30 }}
                          className="text-sky-600 text-xl font-semibold border">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <h1 className="font-bold text-xl text-sky-600 mt-2 text-right p-4">
              Total :{" "}
              <span className="text-black ml-4">{numberFormat(total)}</span>
            </h1>
          </div>
        </div>
      </div>
      <CircleMenu />
    </div>
  );
};
