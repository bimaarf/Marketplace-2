import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ModalUpdateReport } from "./__ModalUpdateReport";

export const ProductReport = () => {
  const componentRef = useRef();
  const [getReport, setReport] = useState("");

  const getReportAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/product-report/get").then((res) => {
        setReport(res.data);
      });
    });
  };
  const numberFormat = (value) =>
    new Intl.NumberFormat("id-IN", {
      style: "currency",
      currency: "IDR",
      maximumSignificantDigits: 10,
    }).format(value);
  useEffect(() => {
    getReportAPI();
  }, []);
  return (
    <>
      <div className="mt-10">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-2xl text-gray-300">
            Laporan Persediaan
          </h1>
          <ReactToPrint
            trigger={() => {
              return (
                <a href="#" className="hover:text-orange-700 duration-300">
                  {" "}
                  <i className="fa fa-download"></i> Cetak Laporan
                </a>
              );
            }}
            content={() => componentRef.current}
          />
        </div>

        <table ref={componentRef} className="w-full table mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Produk</th>
              <th>Stok</th>
              <th>Jumlah Penjualan</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          {getReport &&
            getReport.map((item, key) => (
              <tbody key={key}>
                <tr>
                  <td>{key + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.stock}</td>
                  <td>{item.sales_amount}</td>
                  <td>{numberFormat(item.price)}</td>
                  <td>
                    <div className="flex justify-end items-center gap-2">
                      <ModalUpdateReport
                        item={item}
                        getReportAPI={getReportAPI}
                      />
                      <label
                        htmlFor={`update-modal-report${item.id}`}
                        className="fa fa-pencil bg-cyan-500 hover:bg-cyan-600 px-4 py-1 cursor-pointer text-white rounded"></label>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </>
  );
};
