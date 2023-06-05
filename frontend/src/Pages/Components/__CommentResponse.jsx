import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CommentReply } from "./__CommentReply";
import secureLocalStorage from "react-secure-storage";
import { ModalComment } from "./___ModalComment";

export const CommentResponse = ({ item, getReply, getCommentAPI }) => {
  const [showForm, setShowForm] = useState(false);
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState({
    message: "",
  });

  const handleChange = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadSubmit(true);
    const data = {
      message: formInput.message,
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post(`api/comment/reply/store/${item.id}`, data).then((res) => {
        setLoadSubmit(false);
        if (res.data.status === 201) return toast.warning("Server error");
        getCommentAPI();
        toast.success("Balasan terkirim");
        setFormInput({ message: "" });
      });
    });
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="w-full">
          <div className="flex justify-between items-center border-t border-dashed">
            <div className="flex m-2 justify-start items-center gap-4">
              <i className="fa fa-user-circle scale-150 text-2xl text-gray-400"></i>
              <div>
                <p className="text-gray-300 font-medium">{item.name}</p>
                <span className="text-gray-500 text-sm">{item.created_at}</span>
              </div>
            </div>
            {/* dotted icon */}
            <label
              htmlFor={`modal-detail-comment${item.id}`}
              className="text-gray-500 hover:text-green-500 cursor-pointer w-1/12">
              <i className="fa fa-ellipsis-v font-light" aria-hidden="true"></i>
            </label>
            {/* Modal detail comment */}
            {secureLocalStorage.getItem("auth_role") ===
              "1a42443e0191c3b6dcbbdeadb50490de8c0d204a" && (
              <ModalComment getCommentAPI={getCommentAPI} item={item} />
            )}
          </div>
          <div className="my-3 text-gray-300">
            {item.message}
            {secureLocalStorage.getItem("auth_role") ===
              "1a42443e0191c3b6dcbbdeadb50490de8c0d204a" && (
              <>
                <p
                  onClick={() => setShowForm(showForm ? false : true)}
                  className="pb-2 text-xs text-gray-500 hover:text-gray-600 cursor-pointer">
                  {showForm ? "Tutup" : "Balas"}
                </p>
                {showForm && (
                  <form className="flex justify-center columns-2 pb-2">
                    <input
                      onChange={handleChange}
                      value={formInput.message}
                      type="text"
                      name="message"
                      className="form-control focus:border-green-500 w-full px-2 py-1.5 rounded-l text-sm outline-none border"
                      placeholder="Ketikkan komentar..."
                    />
                    <button
                      disabled={loadSubmit ? true : false}
                      onClick={handleSubmit}
                      type="submit"
                      className="fa fa-paper-plane active:border-green-500 text-green-500 hover:bg-gray-100 duration-300 border border-l-0 rounded-r p-2.5"></button>
                  </form>
                )}
              </>
            )}
          </div>
          {getReply &&
            getReply.map(
              (reply, rKey) =>
                reply.comment_id === item.id && (
                  <CommentReply key={rKey} reply={reply} comment_id={item.id} />
                )
            )}
        </div>
      </div>
    </>
  );
};
