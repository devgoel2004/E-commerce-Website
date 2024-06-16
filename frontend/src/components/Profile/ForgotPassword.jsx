import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import MetaData from "../layout/Header/MetaData";
import MailOutlineForm from "@material-ui/icons/MailOutline";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import { clearErrors, forgotPasswordAction } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPasswordAction(myForm));
  };
  useEffect(() => {
    if (message) {
      alert.success(message);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert, message]);
  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <>
            <MetaData title="Forgot Password" />
            <div className="forgotPasswordContainer">
              <div className="forgotPasswordBox">
                <h2 className="forgotPasswordHeading">Forgot Password</h2>
                <form
                  className="forgotPasswordForm"
                  onSubmit={forgotPasswordSubmit}>
                  <div className="forgotPasswordEmail">
                    <MailOutlineForm />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="submit"
                      value="Send"
                      className="forgotPasswordBtn"
                    />
                  </div>
                </form>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
