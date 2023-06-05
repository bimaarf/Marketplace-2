import React, { useEffect, useState } from "react";
import { Headers } from "../Components/_Header";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "../../src/App.css";
import { RattingResponse } from "./Components/__RattingResponse";
import { CommentResponse } from "./Components/__CommentResponse";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";
import { CircleMenu } from "./___CircleMenu";

export const DetailProduct = ({ setAuthCheck, authCheck }) => {
  const { slug } = useParams();
  const location = useLocation();

  const [getProduct, setProduct] = useState("");
  const [getComment, setComment] = useState("");
  const [getReply, setReply] = useState("");
  const [getRatting, setRatting] = useState("");
  const getProductAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/product/detail/view/" + slug.split(":")[1]).then((res) => {
        setProduct(res.data);
      });
    });
  };
  const getCommentAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get(`api/comment/view/${slug.split(":")[1]}`).then((res) => {
        setComment(res.data[0]);
        setReply(res.data[1]);
      });
    });
  };
  const getRattingAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get(`api/ratting/view/${slug.split(":")[1]}`).then((res) => {
        setRatting(res.data);
      });
    });
  };
  useEffect(() => {
    getProductAPI();
    getCommentAPI();
    getRattingAPI();
  }, []);

  const numberFormat = (value) =>
    new Intl.NumberFormat("id-IN", {
      style: "currency",
      currency: "IDR",
      maximumSignificantDigits: 3,
    }).format(value);

  const [imgIndex, setImgIndex] = useState(0);
  const [stateQuantity, setStateQuantity] = useState(1);
  const [stateNote, setStateNote] = useState(false);
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState({
    comment: "",
  });
  const handleChangeComment = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const handleSubmitComment = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    const data = {
      message: formInput.comment,
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post(`api/comment/store/${slug.split(":")[1]}`, data)
        .then((res) => {
          setLoadSubmit(false);
          if (res.data.status === 201) return toast.warning("Server error");
          getCommentAPI();
          setFormInput({ comment: "" });
          toast.success("Komentar ditambahkan");
        });
    });
  };
  // cart
  const [cartData, setCartData] = useState({
    notes: "",
    quantity: "",
  });
  const handleChangeCart = (e) => {
    e.persist();
    setCartData({ ...cartData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!secureLocalStorage.getItem("auth_token"))
      return toast.warning("Anda belum login");
    if (
      secureLocalStorage.getItem("auth_role") !==
      "78bc4980127963e8c55a379d3f8cdae182dfa543"
    )
      return toast.warning("Admin tidak dapat membuat pesanan");
    setLoadSubmit(true);
    const data = {
      notes: stateNote ? cartData.notes : null,
      quantity: stateQuantity,
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post(`api/cart/store/${slug.split(":")[1]}`, data).then((res) => {
        setLoadSubmit(false);
        if (res.data.status === 201) return toast.warning("server error");
        toast.success("Berhasil dimasukkan ke keranjang");
      });
    });
  };

  return (
    <>
      <Headers
        setAuthCheck={setAuthCheck}
        authCheck={authCheck}
        handleCart={handleSubmit}
      />
      <div className="h-full bg-slate-900">
        {getProduct && (
          <div className="xl:container md:container-lg md:px-4 xl:px-20 mx-4 xl:mx-auto mt-4">
            <div className="md:flex justify-center items-start md:columns-3 gap-4">
              <div className="md:w-1/4 flex justify-center w-full my-4 md:my-0 md:sticky md:top-40">
                <div className="relative w-full overflow-hidden bg-cover bg-no-repeat cursor-pointer">
                  <img
                    className="border hover:scale-110 duration-300 w-full h-60 object-left-top object-cover"
                    src={`${process.env.REACT_APP_API}Images/Product/${
                      JSON.parse(getProduct.image)[imgIndex]
                    }`}
                    alt=""
                  />
                  <div className="grid grid-cols-4 mt-4 gap-1 ">
                    {JSON.parse(getProduct.image).map((item, key) => (
                      <img
                        onClick={() => setImgIndex(key)}
                        key={key}
                        className={`object-cover border-2 ${
                          imgIndex === key && "border-sky-500"
                        } w-full h-14 cursor-pointer rounded-md duration-200`}
                        src={`${process.env.REACT_APP_API}Images/Product/${item}`}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-2/4">
                <div className="flex md:block justify-center text-gray-300">
                  <div className="text-start">
                    <h1 className="font-bold text-sm md:text-lg">
                      {getProduct.title}
                    </h1>
                    <div className="flex justify-start items-center gap-4 text-sm md:text-md">
                      <div className="flex gap-2 justify-start items-center">
                        <p className="text-gray-500">Dilihat</p>
                        <span className="text-gray-300">
                          {getProduct.activity}
                        </span>
                      </div>
                      •
                      <div className="flex justify-start items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 34 28"
                          fill="currentColor"
                          className="h-6 w-6 text-warning">
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-300">
                          ({getProduct.ulasan})
                        </span>
                        <span className="ml-1 text-gray-500">Ratting</span>
                      </div>
                      •
                      <div className="flex justify-center items-center gap-1">
                        <h1 className="text-gray-500">Komentar</h1>
                        <span className="text-gray-300">
                          ({getComment.length})
                        </span>
                      </div>
                    </div>
                    {getProduct.special_price === null ? (
                      <h1 className="text-2xl md:text-4xl flex-none font-medium mt-3">
                        {numberFormat(getProduct.price)}
                      </h1>
                    ) : (
                      <>
                        <h1 className="text-2xl md:text-4xl flex-none font-medium mt-3">
                          {numberFormat(getProduct.special_price)}
                        </h1>

                        <span className="text-gray-500 line-through">
                          {numberFormat(getProduct.price)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="border-t border-b py-3 my-4 border-dashed">
                  <h1 className="underline underline-offset-4 text-white font-medium">
                    Deskripsi
                  </h1>
                </div>
                <div>
                  <pre className="font-normal whitespace-pre-wrap text-gray-300">
                    {getProduct.desc}
                  </pre>
                </div>
                <div className="mb-4">
                  <h1 className="text-white font-medium mt-6">
                    ULASAN DAN RATTING
                  </h1>
                  {getRatting &&
                    getRatting.map((item, key) => (
                      <RattingResponse key={key} item={item} />
                    ))}
                </div>
                <div className="mb-20">
                  <h1 className="text-gray-300 font-medium mt-6">Komentar</h1>
                  {secureLocalStorage.getItem("auth_role") ===
                    "78bc4980127963e8c55a379d3f8cdae182dfa543" && (
                    <>
                      <form className="flex justify-center columns-2 mb-4">
                        <input
                          type="text"
                          name="comment"
                          onChange={handleChangeComment}
                          value={formInput.comment}
                          className="form-control focus:border-gray-700 border-gray-700 bg-gray-700 text-white w-full px-2 py-1.5 rounded-l text-sm outline-none border"
                          placeholder="Ketikkan komentar..."
                        />
                        <button
                          type="submit"
                          onClick={handleSubmitComment}
                          className="">
                          <i className="fa fa-paper-plane active:border-gray-700 border-gray-700 bg-gray-700 text-gray-300 hover:bg-sky-700 duration-300 border border-l-0 rounded-r p-2.5"></i>
                        </button>
                      </form>
                    </>
                  )}
                  {getComment &&
                    getComment.map((item, key) => (
                      <CommentResponse
                        getCommentAPI={getCommentAPI}
                        item={item}
                        key={key}
                        getReply={getReply}
                      />
                    ))}
                </div>
              </div>
              <div className="md:w-1/4 md:sticky md:top-40 mb-32">
                <div className="mx-4 border rounded-md border-gray-700 p-4">
                  <h1 className="text-sm md:text-md lg:text-lg font-medium text-gray-300">
                    Atur jumlah dan catatan
                  </h1>
                  <div className="flex justify-between items-center mt-6">
                    <div className="number-input form-group ml-3 border-0 float-right">
                      <button
                        style={{ width: 30, height: 30 }}
                        onClick={() =>
                          setStateQuantity(
                            stateQuantity === 1 ? 1 : stateQuantity - 1
                          )
                        }
                        className={`${
                          stateQuantity === 1 ? "text-gray-600" : "text-sky-600"
                        } text-xl font-semibold border`}>
                        -
                      </button>

                      <input
                        id="quantity"
                        className="text-center border outline-none"
                        min="1"
                        max="12"
                        name="quantity"
                        value={stateQuantity}
                        type="number"
                        readOnly
                      />

                      <button
                        style={{ width: 30, height: 30 }}
                        onClick={() => setStateQuantity(stateQuantity + 1)}
                        className="text-sky-600 text-xl font-semibold border">
                        +
                      </button>
                    </div>
                    <div className="text-sm flex justify-center items-center gap-2">
                      <p className="text-gray-300">Stok : </p>
                      <p className="text-gray-300 font-semibold">
                        {getProduct.stock}
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() => setStateNote(stateNote ? false : true)}
                    className="flex cursor-pointer text-sm justify-start mt-4 text-sky-600 items-center gap-2">
                    <i className="fa fa-pencil"></i>
                    <p>{stateNote ? "Batalkan" : "Tambah"} catatan</p>
                  </div>
                  {stateNote === true && (
                    <div className="flex text-sm justify-start mt-2 items-center gap-2">
                      <input
                        type="text"
                        name="notes"
                        onChange={handleChangeCart}
                        value={cartData.notes}
                        className="form-control w-full border bg-gray-700 border-gray-700 outline-none focus:border-gray-500 text-gray-300 px-2 py-2"
                        placeholder="Contoh: Warna putih, Size M"
                      />
                    </div>
                  )}
                  <div className="text-sm flex justify-between my-4 items-center gap-2">
                    <p className="text-gray-300 font-medium">Subtotal : </p>
                    <p className="text-sky-600 font-bold text-2xl">
                      {numberFormat(
                        getProduct.special_price === null
                          ? getProduct.price * stateQuantity
                          : getProduct.special_price * stateQuantity
                      )}
                    </p>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-sky-600 mt-6 hover:bg-sky-700 py-1.5 rounded duration-300 text-white font-medium">
                    + Keranjang
                  </button>
                  <div className="flex text-sm mt-8 border-t pt-4 justify-between items-center gap-2">
                    <div className="flex justify-center border-r pr-4 items-center gap-1 cursor-pointer">
                      <i className="fa fa-whatsapp text-green-600"></i>
                      <p className="text-gray-500 hover:text-sky-600 duration-200">
                        WhatsApp
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <CircleMenu />
    </>
  );
};
