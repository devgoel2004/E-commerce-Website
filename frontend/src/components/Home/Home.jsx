import React, { useEffect } from "react";
import "./Home.css";
import { FaMouse } from "react-icons/fa";
import ProductCard from "./ProductCard";
import MetaData from "../layout/Header/MetaData";
import { getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error]);
  return (
    <>
      <MetaData title="SHOPFUSION" />
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="Home-section">
            <h1>Welcome to ShopFusion</h1>
            <h2>Find Amazing Product Below</h2>
            <button>
              Scroll <FaMouse />{" "}
            </button>
          </div>
          <div className="homeHeading">Featured Products</div>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
