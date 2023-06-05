import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Category } from "./Pages/Admin/Category";
import { Dashboard } from "./Pages/Admin/Dashboard";
import { DetailCheckout } from "./Pages/Admin/DetailCheckout";
import { OrderProcess } from "./Pages/Admin/OrderProcess";
import { Product } from "./Pages/Admin/Product";
import { Cart } from "./Pages/Cart";
import { DetailProduct } from "./Pages/DetailProduct";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { OrderConfirmed } from "./Pages/__OrderConfirmed";
import { OrderSend } from "./Pages/__OrderSend";
import { OrderUnpaid } from "./Pages/__OrderUnpaid";
import { OrderFinish } from "./Pages/__OrderFinish";
axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] =
  "application/json/x-www-form-urlencoded; charset=UTF-8; multipart/form-data";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = secureLocalStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
function App() {
  const [authCheck, setAuthCheck] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  useEffect(() => {
    if (!cookies.auth_token || !secureLocalStorage.getItem("auth_token")) {
      secureLocalStorage.clear();
      removeCookie(["auth_token"]);
      setAuthCheck(false);
    } else {
      setAuthCheck(true);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home setAuthCheck={setAuthCheck} authCheck={authCheck} />}
          />
          <Route
            path="/v/:slug"
            element={
              <DetailProduct
                setAuthCheck={setAuthCheck}
                authCheck={authCheck}
              />
            }
          />
          <Route
            path="/login"
            element={<Login setAuthCheck={setAuthCheck} />}
          />
          <Route
            path="/register"
            element={<Register setAuthCheck={setAuthCheck} />}
          />
          <Route
            path="/keranjang"
            element={<Cart setAuthCheck={setAuthCheck} authCheck={authCheck} />}
          />
          <Route
            path="/menunggu-konfirmasi"
            element={
              <OrderUnpaid setAuthCheck={setAuthCheck} authCheck={authCheck} />
            }
          />
          <Route
            path="/pesanan-dikonfirmasi"
            element={
              <OrderConfirmed
                setAuthCheck={setAuthCheck}
                authCheck={authCheck}
              />
            }
          />
          <Route
            path="/sampai-tujuan"
            element={
              <OrderFinish setAuthCheck={setAuthCheck} authCheck={authCheck} />
            }
          />
          <Route
            path="/pesanan-dikirim"
            element={
              <OrderSend setAuthCheck={setAuthCheck} authCheck={authCheck} />
            }
          />
          <Route
            path="/administrator/dashboard"
            element={
              <Dashboard setAuthCheck={setAuthCheck} authCheck={authCheck} />
            }
          />
          <Route
            path="/administrator/kategori"
            element={
              <Category setAuthCheck={setAuthCheck} authCheck={authCheck} />
            }
          />
          <Route
            path="/administrator/produk"
            element={
              <Product setAuthCheck={setAuthCheck} authCheck={authCheck} />
            }
          />
          <Route
            path="/administrator/pesanan"
            element={
              <OrderProcess setAuthCheck={setAuthCheck} authCheck={authCheck} />
            }
          />
          <Route
            path="/administrator/:username"
            element={
              <DetailCheckout
                setAuthCheck={setAuthCheck}
                authCheck={authCheck}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
