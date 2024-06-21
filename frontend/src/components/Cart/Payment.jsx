import React, { useEffect, useRef, useState } from "react";
import CheckOutSteps from "./CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Header/MetaData";
import "./Payment.css";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();
  async function getStripeApiKey() {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/stripesecretkey",
      {
        withCredentials: true,
      }
    );
    console.log(data);
    setStripeApiKey(data.stripeApiKey);
  }
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    const stripeSecretKey =
      "sk_test_51OcvlQSDrIdm1BliK1mrIfp8qsG45ZbIYKGHJJhGAUuF4CECNOTmIvyMnmZ2vNg3iHV6HX2NSjFRlNqZEXGsc1eB00cBYJ6p5X";
    try {
      const config = {
        headers: {
          Authorization: `Bearer${stripeSecretKey}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      console.log(`Bearer ${stripeSecretKey}`);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/payment/process",
        paymentData,
        config
      );
      console.log(data);
      const client_secret = data.client_secret;
      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        console.log(result.error.message);
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error.response.data.message);

      alert.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getStripeApiKey();
  }, []);
  return (
    <>
      <MetaData title={"Payment"} />
      <CheckOutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - ${orderInfo && orderInfo.totalPrice} `}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
