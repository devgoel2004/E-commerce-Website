import React, { useEffect } from "react";
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
function App() {
  const { isAuthenticated, user, loading, error } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
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
          <Route path="/" element={<Home></Home>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products/:keyword" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;