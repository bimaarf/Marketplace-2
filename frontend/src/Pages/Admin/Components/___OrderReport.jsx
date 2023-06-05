import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { OrderReportModal } from "./___OrderReportModal";
import ReactToPrint from "react-to-print";

export const OrderReport = () => {
  const componentRef = useRef();
  const [getReport, setReport] = useState("");
  const getReportAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/order-report/get").then((res) => {
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
          <h1 className="font-medium text-2xl text-gray-300">Laporan Penjualan</h1>
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
              <th>Nama Pelanggan</th>
              <th>Produk</th>
              <th>Tanggal Transaksi</th>
              <th>Jumlah</th>
              <th>Total</th>
              <th>Aksi</th>
            </tr>
          </thead>
          {getReport &&
            getReport.map((item, key) => (
              <tbody key={key}>
                <tr>
                  <td>{key + 1}.</td>
                  <td>Yoseph</td>
                  <td><p className="whitespace-pre-wrap">{item.title}</p></td>
                  <td>10-09-2022</td>
                  <td>{item.quantity}</td>
                  <td>{numberFormat(item.total)}</td>
                  <td>
                    <OrderReportModal item={item} />
                    <label
                      htmlFor={`order-report-modal${item.id}`}
                      className="fa fa-eye bg-yellow-500 hover:bg-yellow-600 px-4 py-1 cursor-pointer text-white rounded"></label>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </>
  );
};
