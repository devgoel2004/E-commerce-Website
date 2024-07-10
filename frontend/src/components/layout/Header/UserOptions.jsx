import React, { useState, useEffect } from "react";
import "./Header.css";
import Backdrop from "@material-ui/core/Backdrop";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { logout } from "../../../actions/userAction";
import { getProductDetails } from "../../../actions/productActions";
const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [open, setOpen] = useState(true);
  const dashboard = () => {
    if (user.role === "admin") {
      navigate("/shopfusion/admin/dashboard");
    } else {
      navigate("/shopfusion/dashboard");
    }
  };
  const orders = () => {
    navigate("/shopfusion/orders");
  };
  const account = () => {
    navigate("/shopfusion/account");
  };
  const cart = () => {
    navigate("/shopfusion/cart");
  };
  const logoutUser = () => {
    dispatch(logout());
    alert.success("Logout successfully");
  };
  const options = [
    { icon: <ListAltIcon></ListAltIcon>, name: "Orders", func: orders },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  useEffect(() => {
    dispatch(getProductDetails("66581f43affcbac4484f6b6f"));
  }, [dispatch]);

  return (
    <>
      <Backdrop />
      <SpeedDial
        className="speed-dial-class speedDial"
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar ? user.avatar.url : "./Profile.png"}
            alt="Profile"
          />
        }>
        {options.map((item) => (
          <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            key={item.name}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
