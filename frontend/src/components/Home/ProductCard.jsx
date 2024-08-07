import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./Home.css";
const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: "small",
  };
  return (
    <>
      <Link className="productCard" to={`/shopfusion/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <Rating {...options} />
          <br />
          <span className="productCardSpan">
            {" "}
            ( {product.numOfReviews === 0 ? "No" : product.numOfReviews}{" "}
            {product.numOfReviews <= 1 ? "Review" : "Reviews"} )
          </span>
        </div>
        <span>{`₹${product.price}`}</span>
      </Link>
    </>
  );
};

export default ProductCard;
