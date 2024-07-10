import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Header/MetaData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SlideBar from "./SlideBar";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import { Button } from "@material-ui/core";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../Loader/Loader";
import "./ProcessOrder.css";

const ProcessOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const x = {
      status: status,
    };
    dispatch(updateOrder(id, x));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      navigate("/admin/dashboard");
      dispatch({
        type: UPDATE_ORDER_RESET,
      });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateOrder]);
  return (
    <>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SlideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="confirmshippingArea">
                <Typography style={{ fontSize: "1.8rem" }}>
                  Shipping Info
                </Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name: </p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone: </p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address: </p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                  <div>
                    <Typography>Payment</Typography>
                    <span
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }>
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </span>
                  </div>
                  <div>
                    <p>Amount: </p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                  <div>
                    <Typography>Order Status</Typography>
                    <span
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }>
                      {order.orderStatus && order.orderStatus}
                    </span>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography style={{ fontSize: "1.8rem" }}>
                    Your Cart Items:
                  </Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/shopfusion/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          {console.log(item)}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>{" "}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}>
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}>
                  <h1>Process Order</h1>
                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>
                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }>
                    Process
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
