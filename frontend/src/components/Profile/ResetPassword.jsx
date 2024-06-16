import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPasswordAction } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/Header/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { token } = useParams();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPasswordAction(token, myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password Updated Successfull");
      navigate("/login");
    }
  }, [error, dispatch, success, alert]);
  return (
    <>
      <MetaData title="Change Password"></MetaData>
      <div className="resetPasswordContainer">
        <div className="resetPasswordBox">
          <h2 className="resetPasswordHeading">Reset Password</h2>
          <form
            action=""
            className="resetPasswordForm"
            onSubmit={resetPasswordSubmit}>
            <div className="resetPassword">
              <LockOpenIcon />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="resetPassword">
              <LockIcon />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Confirm" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
