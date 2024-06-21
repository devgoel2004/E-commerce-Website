import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
const secretKey =
  "pk_test_51OcvlQSDrIdm1BliH8fPj5Spfsj1hThmeHMyw9xjNjqeMhrSgNZ2zn9y4HA6RUHzmlqCagiw6HwNmliPyrouc6f000mtBkXjRg";
const stripePromise = loadStripe(secretKey);

const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
);

export default PaymentWrapper;
