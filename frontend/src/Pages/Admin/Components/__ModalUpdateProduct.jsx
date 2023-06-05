import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const ModalUpdateProduct = ({ item, getProductAPI }) => {
  const [getCategory, setCategory] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState({
    title: item.title,
    desc: item.desc,
    price: item.price,
    stock: item.stock,
    category_id: item.category_id,
  });
  const navRedirect = useNavigate();

  const getCategoryAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/category/view").then((res) => {
        setCategory(res.data);
      });
    });
  };

  useEffect(() => {
    getCategoryAPI();
  }, []);

  // image
  const [imageFormat, setImageFormat] = useState([]);
  const handleInputImage = (e) => {
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      toast.warning("Format tidak sesuai");
    } else {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // localStorage.setItem("header-image", reader.result);
        setImageFormat([
          ...imageFormat,
          { url: reader.result, fileName: file },
        ]);
      });
      reader.readAsDataURL(file);
    }
  };
  const handleDelImage = (e, index) => {
    e.preventDefault();
    imageFormat.splice(index, 1);
    setImageFormat(imageFormat);
    navRedirect("/administrator/dashboard");
  };
  const handleChange = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadSubmit(true);
    const pushServer = new FormData();
    pushServer.append("title", formInput.title);
    pushServer.append("desc", formInput.desc);
    pushServer.append("price", formInput.price);
    pushServer.append("stock", formInput.stock);
    // imageFormat.forEach((file) => {
    //   pushServer.append("image[]", file.fileName);
    // });
    pushServer.append("category_id", formInput.category_id);
    const data = pushServer;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post(`api/product/update/${item.slug}`, data).then((res) => {
        setLoadSubmit(false);
        if (res.data.status === 201) return toast.warning("Server error");
        if (res.data.status === 202)
          return toast.warning("Masukkan data dengan benar");
        toast.success("Produk berhasil diupdate");
        getProductAPI();
        document.getElementById(`update-modal-product${item.id}`).click();
        navRedirect("/administrator/produk");
      });
    });
  };
  const handleDelete = (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    axios.get("sanctum/csrf-cookie").then(() => {
      axios.post(`api/product/delete/${item.slug}`).then((res) => {
        setLoadSubmit(false);
        if (res.data.status === 201) return toast.warning("Server error");
        toast.success("Berhasil dihapus");
        getProductAPI();
        document.getElementById(`update-modal-product${item.id}`).click();
      });
    });
  };
  return (
    <>
      <input
        type="checkbox"
        id={`update-modal-product${item.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Tambahkan Produk Baru!</h3>
          <div className="py-4">
            <div className="py-2">
              <label htmlFor="title">Nama Product</label>
              <input
                onChange={handleChange}
                id="title"
                type="text"
                name="title"
                className="w-full outline-none py-2 px-2 focus:border-green-500 border text-sm md:text-md"
                placeholder="e.g. Nama Product"
                value={formInput.title}
              />
            </div>
            <div className="md:flex justify-start items-start gap-2">
              <div className="py-2 md:w-1/2">
                <label htmlFor="desc">Deskripsi Product</label>
                <textarea
                  onChange={handleChange}
                  name="desc"
                  id="desc"
                  cols="30"
                  rows="10"
                  value={formInput.desc}
                  className="form-control w-full border outline-none py-2 px-2 focus:border-green-500 text-sm md:text-md"
                  placeholder="Deskripsi Produk"></textarea>
              </div>
              {/* <div className="py-2 md:w-1/2">
                <div className="m-4">
                  <label className="text-gray-700 text-sm md:text-md font-semibold">
                    Upload Gambar Produk
                  </label>{" "}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <label className="flex cursor-pointer shadow-sm scale-90 flex-col w-full h-32 border border-green-500 border-dashed hover:bg-slate-100 hover:border-green-600 duration-200">
                      <div className="flex flex-col items-center justify-center pt-7">
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="text-orange-400 text-xs mt-5 p-1 text-center scale-75">
                            Format JPG / JPEG / PNG
                          </p>
                        </>
                      </div>
                      <input
                        id="input-image"
                        onChange={handleInputImage}
                        type="file"
                        accept="image/*"
                        name="image[]"
                        className="opacity-0"
                      />
                    </label>
                    {imageFormat.map((item, index) => (
                      <div
                        key={index}
                        onClick={(e) => handleDelImage(e, index)}
                        className="flex items-center shadow-sm justify-around border gap-4 m-1 p-1 hover:bg-slate-100 cursor-pointer">
                        <img
                          id="myImg"
                          src={item.url}
                          className=" text-gray-400 group-hover:text-gray-600 w-36"
                          alt={item.url}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="py-2 w-1/2">
                <label htmlFor="price">Harga</label>
                <div className="flex justify-start gap-2 items-center">
                  <span className="text-gray-500 absolute p-2">Rp</span>
                  <input
                    onChange={handleChange}
                    id="price"
                    type="number"
                    name="price"
                    className="w-full outline-none py-2 pl-8 pr-2 focus:border-green-500 border text-sm md:text-md"
                    placeholder="XXXX"
                    value={formInput.price}
                  />
                </div>
              </div>
              <div className="py-2 w-1/2">
                <label htmlFor="stock">Stok</label>
                <input
                  onChange={handleChange}
                  id="stock"
                  type="number"
                  name="stock"
                  className="w-full outline-none py-2 px-2 focus:border-green-500 border text-sm md:text-md"
                  placeholder="XXXX"
                  value={formInput.stock}
                />
              </div>
            </div>
            <div className="py-2">
              <label htmlFor={`category_id${item.id}`}>Kategori</label>
              <select
                onChange={handleChange}
                name="category_id"
                value={formInput.category_id}
                className="w-full bg-transparent outline-none py-2 px-2 focus:border-green-500 border text-sm md:text-md"
                id={`category_id${item.id}`}>
                {getCategory &&
                  getCategory.map((categ, indexCateg) => (
                    <option key={indexCateg} value={categ.id}>
                      {categ.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="modal-action flex justify-end">
            <label
              htmlFor={`update-modal-product${item.id}`}
              className="bg-gray-500 px-10 py-1.5 cursor-pointer hover:bg-gray-600 text-white duration-300 rounded-sm text-sm md:text-md">
              Tutup
            </label>
            <button
              onClick={handleSubmit}
              disabled={loadSubmit ? true : false}
              type="submit"
              className="bg-green-600 flex justify-center items-center hover:bg-green-700 text-white text-sm md:text-md px-10 py-1.5 rounded-sm">
              {loadSubmit && (
                <svg
                  role="status"
                  className="w-3 h-3 mt-0.5 -ml-4 mr-2 text-white animate-spin mb-0.5"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Update
            </button>
            <button
              onClick={handleDelete}
              disabled={loadSubmit ? true : false}
              type="button"
              className="bg-red-600 flex justify-center items-center hover:bg-red-700 text-white text-sm md:text-md px-10 py-1.5 rounded-sm">
              {loadSubmit && (
                <svg
                  role="status"
                  className="w-3 h-3 mt-0.5 -ml-4 mr-2 text-white animate-spin mb-0.5"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Hapus
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
