import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

export const ModalComment = ({ item, getCommentAPI }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post(`api/comment/delete/${item.id}`).then((res) => {
        if (res.data.status === 201) return toast.warning("server error");
        document.getElementById("modal-detail-comment" + item.id).click();
        getCommentAPI();
        toast.success("Komentar berhasil dihapus");
      });
    });
  };
  return (
    <>
      <input
        type="checkbox"
        id={`modal-detail-comment${item.id}`}
        className="modal-toggle"
      />
      <label
        htmlFor={`modal-detail-comment${item.id}`}
        className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold text-center">Hapus komentar ini?</h3>
          <p className="my-3 text-gray-600 bg-gray-100 py-2 px-1">
            {item.message}
          </p>
          <div className="flex justify-center mt-10">
            <button
              onClick={handleDelete}
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white py-2 rounded px-20">
              Hapus
            </button>
          </div>
        </label>
      </label>
    </>
  );
};
