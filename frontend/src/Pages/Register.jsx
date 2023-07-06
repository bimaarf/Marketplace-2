import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { Headers } from "../Components/_Header";
import logoImg from "../Images/logo.jpg";

import axios from "axios";
import { useCookies } from "react-cookie";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
export const Register = ({ setAuthCheck }) => {
  const navRedirect = useNavigate();
  const [emailValidator, setEmailValidator] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [cookies, setCookie] = useCookies(["auth_token"]);
  const [formInput, setFormInput] = useState({
    name: "",
    no_telp: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const validateEmail = (e) => {
    const email = e.target.value;
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
    if (validator.isEmail(email)) {
      e.persist();
      setEmailValidator("valid");
    } else {
      e.persist();
      setEmailValidator("invalid");
    }
  };
  const handleChange = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    const data = {
      name: formInput.name,
      no_telp: formInput.no_telp,
      email: formInput.email,
      password: formInput.password,
      password_confirmation: formInput.password_confirmation,
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post("api/register", data).then((res) => {
        setLoadSubmit(false);
        if (res.data.status === 201)
        return toast.error("Username min:4 huruf");
        if (res.data.status === 202)
          return toast.error("Masukkan data dengan benar");
        if (res.data.status === 101)
          return toast.warning("Password anda salah");
        if (res.data.status === 102) return toast.error("Akun belum terdaftar");
        toast.success("Berhasil masuk");
        setCookie("auth_token", res.data.token, {
          path: "/",
        });
        secureLocalStorage.setItem("auth_token", res.data.token);
        secureLocalStorage.setItem("auth_name", res.data.username);
        secureLocalStorage.setItem("auth_email", res.data.email);
        secureLocalStorage.setItem("auth_role", res.data.role);

        setAuthCheck(true);
        if (res.data.role === "1a42443e0191c3b6dcbbdeadb50490de8c0d204a")
          return navRedirect("/administrator/dashboard");
        if (res.data.role === "78bc4980127963e8c55a379d3f8cdae182dfa543")
          return navRedirect("/");
      });
    });
  };

  return (
    <div className="bg-slate-900 h-screen">
      <Headers />
      <div className="xl:container md:container-lg md:px-10 xl:px-44 mx-2 xl:mx-auto mt-4 md:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="justify-center hidden md:flex">
            <img
              src={logoImg}
              width={450}
              alt=""
              className="image-full rounded h-96"
            />
          </div>
          <div className="border p-4 rounded">
            <h1 className="text-center text-2xl font-semibold text-green-600 mt-4 md:mt-10">
              Register
            </h1>
            <div className="flex text-sm justify-center gap-1 mb-6 md:mb-10 border-b pb-1 border-dashed">
              <p className="text-gray-500">Sudah punya akun?</p>{" "}
              <span
                onClick={() => navRedirect("/login")}
                className="text-green-600 hover:text-green-700 cursor-pointer">
                Masuk
              </span>
            </div>
            <form action="">
              <div className="my-2">
                <label
                  htmlFor="name"
                  className="text-gray-500 text-sm md:text-md font-medium">
                  Nama Lengkap
                </label>
                <input
                  onChange={handleChange}
                  id="name"
                  type="text"
                  name="name"
                  className="w-full border p-2 text-sm outline-none focus:border-green-500 active:scale-110 active:rounded duration-300"
                  placeholder="Nama Lengkap"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="no_telp"
                  className="text-gray-500 text-sm md:text-md font-medium">
                  Nomor Handphone
                </label>
                <input
                  onChange={handleChange}
                  name="no_telp"
                  id="no_telp"
                  type="number"
                  className="w-full border p-2 text-sm outline-none focus:border-green-500 active:scale-110 active:rounded duration-300"
                  placeholder="08XXXXXX"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="email"
                  className="text-gray-500 text-sm md:text-md font-medium">
                  Alamat Email
                </label>
                <input
                  onChange={validateEmail}
                  name="email"
                  id="email"
                  type="email"
                  className={`w-full border p-2 text-sm outline-none focus:border-green-500 active:scale-110 active:rounded duration-300`}
                  placeholder="example@gmail.com"
                />
                <span className="text-xs text-red-500">
                  {emailValidator === "" && emailValidator !== "invalid"
                    ? ""
                    : "" || emailValidator === "invalid"
                    ? "*email tidak valid!"
                    : ""}
                </span>
              </div>
              <div className="my-2">
                <label
                  htmlFor="password"
                  className="text-gray-500 text-sm md:text-md font-medium">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  name="password"
                  id="password"
                  type="password"
                  className="w-full border p-2 text-sm outline-none focus:border-green-500 active:scale-110 active:rounded duration-300"
                  placeholder="**********"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="password"
                  className="text-gray-500 text-sm md:text-md font-medium">
                  Konfirmasi Password
                </label>
                <input
                  onChange={handleChange}
                  id="password"
                  name="password_confirmation"
                  type="password"
                  className="w-full border p-2 text-sm outline-none focus:border-green-500 active:scale-110 active:rounded duration-300"
                  placeholder="**********"
                />
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                disabled={loadSubmit ? true : false}
                className={`bg-green-600 ${
                  loadSubmit && "bg-green-700 rounded-lg"
                } flex py-1.5 rounded justify-center items-center active:scale-110 hover:bg-green-700 duration-300 hover:rounded-lg mt-10 text-white w-full p-2"`}>
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
                Daftar Sekarang
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
