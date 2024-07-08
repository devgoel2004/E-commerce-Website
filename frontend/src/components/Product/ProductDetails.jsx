import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productActions";
import { useParams } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import ReviewCard from "./ReviewCard";
import image from "../../images/ecommerce.png";
import { addItemToCart } from "../../actions/cartAction";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import MetaData from "../layout/Header/MetaData";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const x = useSelector((state) => state.productDetails);

  const { user } = useSelector((state) => state.user);
  const { success, review: reviewError } = useSelector(
    (state) => state.newReview
  );
  const [rating, setRating] = useState(0);
  const productDetail = product.product;
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth === 600 ? "small" : "",
    value: productDetail.ratings,
    readOnly: true,
  };
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const submitReviewToggle = () => {
    setOpen(!open);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    const data = {
      rating: rating,
      comment: comment,
      productId: id,
      user,
    };
    dispatch(newReview(data));
    setOpen(false);
  };
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    alert.success("Item Added To Cart");
  };
  console.log(product);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({
        type: NEW_REVIEW_RESET,
      });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={productDetail.name} />
          <div className="ProductDetails">
            <div>
              <img
                height={"50vh"}
                clasName="CarouselImage"
                src={productDetail.images[0].url}
                alt={productDetail.name}
                width={"50vw"}
              />
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{productDetail.name}</h2>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({productDetail.numOfReviews}{" "}
                  {productDetail.numOfReviews <= 1 ? "Review" : "Reviews"} )
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${productDetail.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={productDetail.Stock < 1 ? true : false}
                    onClick={addToCartHandler}>
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b
                    className={
                      productDetail.Stock < 1 ? "redColor" : "greenColor"
                    }>
                    {productDetail.Stock < 1 ? "Out Of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{productDetail.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols={"30"}
                rows={"5"}
                value={comment}
                onChange={(e) => setComment(e.target.value)}></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} className="redColor">
                Cancel
              </Button>
              <Button className="greenColor" onClick={reviewSubmitHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {productDetail.reviews && productDetail.reviews[0] ? (
            <div className="reviews">
              {productDetail.reviews &&
                productDetail.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
