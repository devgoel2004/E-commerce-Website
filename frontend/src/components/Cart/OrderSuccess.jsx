import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";
const orderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order has been placed successfully</Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default orderSuccess;
