import React, { useState } from "react";
import "./Header.css";
import Backdrop from "@material-ui/core/Backdrop";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [open, setOpen] = useState(true);

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  const dashboard = () => {
    navigate("/dashboard");
  };
  const orders = () => {
    navigate("/orders");
  };
  const account = () => {
    navigate("/account");
  };
  const logoutUser = () => {
    dispatch(logout());
    alert.success("Logout successfully");
  };
  const options = [
    { icon: <ListAltIcon></ListAltIcon>, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

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
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
