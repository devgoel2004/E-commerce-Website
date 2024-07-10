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
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
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
          <Route
            path="/shopfusion/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopfusion/password/update"
            element={<UpdatePassword />}
          />
          <Route
            path="/shopfusion/password/forgot"
            element={<ForgotPassword />}
          />
          <Route path="/shopfusion/" element={<Home />} />
          <Route path="/shopfusion/product/:id" element={<ProductDetails />} />
          <Route path="/shopfusion/products" element={<Product />} />
          <Route path="/shopfusion/search" element={<Search />} />
          <Route path="/shopfusion/products/:keyword" element={<Product />} />
          <Route path="/shopfusion/login" element={<Login />} />
          <Route
            path="/shopfusion/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopfusion/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route path="/shopfusion/*" element={<Error />} />
          <Route path="/shopfusion/cart" element={<Cart />} />
          <Route
            path="/shopfusion/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopfusion/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopfusion/process/payment"
            element={
              <ProtectedRoute>
                <PaymentWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopfusion/payment/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopfusion/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopfusion/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopfusion/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopfusion/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/shopfusion/admin/product"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/shopfusion/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/shopfusion/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopfusion/admin/order/:id"
            element={
              <ProtectedRoute>
                <ProcessOrder />
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
