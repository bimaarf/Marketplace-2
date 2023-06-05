import React, { useState } from "react";

export const ModalDetailCheckout = ({ user, getOrderProcess }) => {
  const [imgIndex, setImgIndex] = useState(0);
 
  return (
    <div>
      <input
        type="checkbox"
        id={`my-detail-checkout-${user.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={`my-detail-checkout-${user.id}`}
            className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <div className="text-lg font-bold flex justify-start items-center gap-1">
            <i className="fa fa-shopping-cart"></i>
            <p>Pesanan : {user.name}</p>
            </div>
          {/* <div className="text-lg font-bold flex justify-start items-center gap-1">
            <i className="fa fa-shopping-cart"></i>
            <p>Pesanan : {item.name}</p>
          </div>
          <div className="py-4 whitespace-normal">
            <div className="relative w-full overflow-hidden bg-cover bg-no-repeat cursor-pointer">
              <img
                className="border hover:scale-110 duration-300 w-full h-60 object-left-top object-cover"
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
          </div>
          <div className="flex whitespace-pre-wrap mt-2 gap-1 justify-start items-start columns-3">
            <p className="text-red-600 font-medium w-2/1">Alamat</p>
            <p className="w-1/12 text-right">:</p>
            <p className="font-medium w-full">
              {item.city}, {item.province}. {item.address}
            </p>
          </div>
          <div className="flex whitespace-pre-wrap mt-2 gap-1 justify-start items-start columns-3">
            <p className="text-red-600 font-medium w-2/1">Jumlah</p>
            <p className="w-1/12 text-right">:</p>
            <p className="font-medium w-full">
              {item.quantity}
            </p>
          </div>
      
          <div className="flex whitespace-pre-wrap mt-2 gap-1 justify-start items-start columns-3">
            <p className="text-red-600 font-medium w-2/1">Harga </p>
            <p className="w-1/12 text-right">:</p>
            <p className="font-medium w-full">
              {item.city}, {item.province}. {item.address}
            </p>
          </div> */}
      
        </div>
      </div>
    </div>
  );
};
