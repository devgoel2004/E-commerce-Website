import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Product from "./components/Product/Product";
import Search from "./components/Product/Search";
import Error from "./components/Error/Error";
import Login from "./components/Login/Login";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/Profile/UpdateProfile";
import UpdatePassword from "./components/Profile/UpdatePassword";
import ForgotPassword from "./components/Profile/ForgotPassword";
import ResetPassword from "./components/Profile/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import PaymentWrapper from "./components/Cart/PaymentWrapper";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import { useAlert } from "react-alert";
import OrderDetails from "./components/Order/OrderDetails";
import DashBoard from "./components/Admin/DashBoard";
import ProductList from "./components/Admin/ProductList";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import NewProduct from "./components/Admin/NewProduct";
function App() {
  const alert = useAlert();
  const { isAuthenticated, user, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/" element={<Home></Home>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products/:keyword" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="*" element={<Error />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/process/payment" element={<PaymentWrapper />} />
          <Route path="/payment/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/product"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
