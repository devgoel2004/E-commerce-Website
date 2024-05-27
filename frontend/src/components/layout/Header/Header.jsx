import React from "react";
import "./Header.css";
import { useState } from "react";
const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };
  const removeActive = () => {
    setIsActive(false);
  };
  return (
    <>
      <div className="Header-section-1">
        <div className="heading">
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
        <div>
          <ul>
            <li>About us</li>
            <li>Blog</li>
            <li>Contact us</li>
            <li>Help & Support</li>
          </ul>
        </div>
        <div className="icons">
          <a href="https://www.instagram.com/__dev__goel__/" target="_blank">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.instagram.com/__dev__goel__/" target="_blank">
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a href="https://x.com/devgoel12072004" target="_blank">
            <i class="fa-brands fa-twitter"></i>
          </a>
        </div>
      </div>
      <div className="Header-section-2">
        <div className="Categories">
          <i class="fa-solid fa-list" style={{ padding: "4px" }}></i>
          <span style={{ fontSize: "large" }}>Categories</span>
          <span>
            <i class="fa-solid fa-arrow-down"></i>
            Rs
          </span>
          <span>
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
