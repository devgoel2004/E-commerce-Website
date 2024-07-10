import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shopfusion/products/${keyword}`);
    } else {
      navigate("/shopfusion/products");
    }
  };
  return (
    <>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          className="searchBoxInput"
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
