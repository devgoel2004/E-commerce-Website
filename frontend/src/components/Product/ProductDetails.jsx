import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import { useParams } from "react-router-dom";
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const x = useSelector((state) => state.productDetails);
  console.log(x);
  //   console.log(product);
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  return (
    <>
      <div className="ProductDetails">
        <div>
          {/* <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img className="CarouselImage" />
              ))}
          </Carousel> */}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
