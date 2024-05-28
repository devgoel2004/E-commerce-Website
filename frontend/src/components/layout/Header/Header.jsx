import React from "react";
import "./Header.css";
import { useState, useEffect } from "react";
const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleActiveClass = () => {
    console.log("toggleActiveClass");
    console.log(isActive);
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
          <img src="./images/ecommerce.png" alt="" />
          <b>Shop</b>
          <span>Fusion</span>
        </div>
        <div className="searchbox">
          <input type="text" placeholder="Search" />
          <button>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="list">
          <ul>
            <li>About us</li>
            <li>Blog</li>
            <li>Contact us</li>
            <li>Help & Support</li>
          </ul>
        </div>
        <div className="icons">
          <a href="https://www.instagram.com/__dev__goel__/">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.instagram.com/__dev__goel__/">
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a href="https://x.com/devgoel12072004">
            <i class="fa-brands fa-twitter"></i>
          </a>
        </div>
      </div>
      <div className={isActive ? `Header-section-2` : `Header-section-3`}>
        <div className="Categories">
          <span style={{ fontSize: "large" }}>
            <i class="fa-solid fa-list" style={{ padding: "4px" }}></i>
            Categories
          </span>
          <span id="hide">
            <i class="fa-solid fa-arrow-down"></i>
            Rs
          </span>
          <span id="hide">
            <i class="fa-solid fa-arrow-down"></i>
            English
          </span>
        </div>
        <div className="Categories">
          <span>
            <i class="fa-solid fa-user"></i>Sign In
          </span>
          <span>
            <i class="fa-solid fa-bag-shopping"></i>Favourite
          </span>
          <span>
            <i class="fa-solid fa-bag-shopping"></i>Card
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
