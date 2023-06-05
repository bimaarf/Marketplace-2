import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const OrderReportModal = ({ item }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const numberFormat = (value) =>
    new Intl.NumberFormat("id-IN", {
      style: "currency",
      currency: "IDR",
      maximumSignificantDigits: 3,
    }).format(value);
  const navRedirect = useNavigate();
  return (
    <>
      <input
        type="checkbox"
        id={`order-report-modal${item.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Pesanan : {item.name}</h3>

          <div className="p-2">
            <div className="relative w-full overflow-hidden bg-cover bg-no-repeat cursor-pointer">
              <img
                className="border w-full max-h-96 object-left-top object-cover"
                src={`${process.env.REACT_APP_API}Images/Product/${
                  JSON.parse(item.image)[imgIndex]
                }`}
                alt=""
              />
              <div className="grid grid-cols-4 mt-4 gap-1 ">
                {JSON.parse(item.image).map((item, key) => (
                  <img
                    onClick={() => setImgIndex(key)}
                    key={key}
                    className={`object-cover border-2 ${
                      imgIndex === key && "border-green-500"
                    } w-full h-14 cursor-pointer rounded-md duration-200`}
                    src={`${process.env.REACT_APP_API}Images/Product/${item}`}
                    alt=""
                  />
                ))}
              </div>
            </div>
            <h1 className="font-bold text-sm md:text-lg">{item.title}</h1>
            <p>Jumlah : {item.quantity}</p>
            <p>Total : {numberFormat(item.total)}</p>
            <div className=" border p-1 my-4 whitespace-pre-wrap text-sm">
              <h1>
                Tujuan Alamat : {item.city}, {item.province}. {item.address}
              </h1>
              <div className="flex justify-start items-center gap-1 text-sm">
                <img
                  width={40}
                  src="https://jnewsonline.com/wp-content/uploads/2021/11/Foto-2-Naskah-Mengenal-Sosok-Kreator-Logo-%E2%80%98Biru-Tua-Merah-JNE.jpg"
                  alt=""
                />
                <h1 className="text-red-600 font-bold">
                  {item.courier} ({item.courier_t})
                </h1>
              </div>
            </div>
            {item.special_price === null ? (
              <>
                <h1 className="text-start text-sm md:text-md my-1 text-gray-900 font-medium">
                  {numberFormat(item.price)}
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-start text-sm md:text-md my-1 text-gray-900 font-medium">
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
          </div>
          <div className="flex justify-end gap-2 items-center">
            <button
              onClick={() => navRedirect(`../../v/:${item.slug}`)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-10 py-1.5 rounded">
              Detail Produk
            </button>
            <label
              htmlFor={`order-report-modal${item.id}`}
              className="px-10 py-1.5 bg-gray-400 hover:bg-gray-500 rounded text-gray-100 hover:text-white cursor-pointer">
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
