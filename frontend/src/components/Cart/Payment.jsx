import React, { useEffect } from "react";
import CheckOutSteps from "./CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/Header/MetaData";
import "./Payment.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderAction";
import { useAlert } from "react-alert";
const Payment = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  console.log(cartItems);
  const orders = {
    shippingInfo: shippingInfo,
    orderItems: cartItems,
    itemPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    var amount = Math.round(orderInfo.totalPrice * 100);
    const {
      data: { key },
    } = await axios.get("https://shopfusion-jivc.onrender.com/api/v1/productsapi/getKey");
    const {
      data: { order },
    } = await axios.post(
      "https://shopfusion-jivc.onrender.com/api/v1/productsapi/v1/checkOut",
      {
        amount,
      },
      {
        withCredentials: true,
      }
    );

    const options = {
      key,
      amount: amount,
      currency: "INR",
      name: "ShopFusion",
      description: "E commerce Website Transaction",
      image:
        "data:image/jpeg;base64,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",
      order_id: order.id,
      callback_url: "https://shopfusion-jivc.onrender.com/api/v1/productsapi/v1/paymentVerification",
      profile: {
        name: "Dev Goel",
        email: "devgoel901@gmail.com",
        contact: "9690011021",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    orders.paymentInfo = {
      id: order.id,
      status: "succeeded",
    };
    dispatch(createOrder(orders));
    var razor = new window.Razorpay(options);
    razor.open();
  };
  const cartHandler = () => {
    navigate("/cart");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);
  return (
    <>
      <MetaData title={"Payment"} />
      <CheckOutSteps activeStep={2} />
      <div className="paymentContainer">
        <div>
          <div className="paymentQuestion-1">Confirm Order?</div>
          <div className="payment-button">
            <button onClick={cartHandler()}>Cart</button>
            <button onClick={(e) => submitHandler(e)}>
              {" "}
              {`Pay ₹${orderInfo && orderInfo.totalPrice}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
