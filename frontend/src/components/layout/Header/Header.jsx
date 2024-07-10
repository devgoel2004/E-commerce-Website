import React from "react";
import "./Header.css";
import { useState, useEffect } from "react";
import image from "../../../images/ecommerce.png";
import { Link, useNavigate } from "react-router-dom";
const Header = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  const [isActive, setIsActive] = useState(false);
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };
  const removeActive = () => {
    setIsActive(true);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 780) {
        removeActive();
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="Header-section-1">
        <div className="heading">
          <i
            onClick={toggleActiveClass}
            className="fa-solid fa-bars"
            id="bar-icon"></i>
          <Link href="/shopfusion/">
            <img src={image} alt="Shop" />
            <b>Shop</b>
            <span>Fusion</span>
          </Link>
        </div>
        <div className="searchbox">
          <form action="searchForm" onSubmit={searchSubmitHandler}>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <div className="list">
          <ul>
            <li>About Us</li>
            <li>Blog</li>
            <li>Contact Us</li>
            <li>Help & Support</li>
          </ul>
        </div>
        <div className="icons">
          <a href="https://www.instagram.com/__dev__goel__/">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.instagram.com/__dev__goel__/">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://x.com/devgoel12072004">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
      </div>
      <div className={isActive ? `Header-section-2` : `Header-section-3`}>
        <div className="Categories">
          <span style={{ fontSize: "large" }}>
            <Link to="/shopfusion/products">
              <i class="fa-solid fa-list" style={{ padding: "4px" }}></i>
              Products
            </Link>
          </span>
          <span id="hide">
            <i className="fa-solid fa-arrow-down"></i>
            Rs
          </span>
          <span id="hide">
            <i className="fa-solid fa-arrow-down"></i>
            English
          </span>
        </div>
        <div className="Categories">
          <span>
            <Link
              to={
                isAuthenticated ? "/shopfusion/account" : "/shopfusion/login"
              }>
              <i className="fa-solid fa-user"></i>
              {isAuthenticated ? " Account" : " Sign In"}
            </Link>
          </span>
          <span>
            <i className="fa-solid fa-bag-shopping"></i> Favourite
          </span>
          <span>
            <Link to="/shopfusion/cart">
              <i className="fa-solid fa-bag-shopping"></i> Cart
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
