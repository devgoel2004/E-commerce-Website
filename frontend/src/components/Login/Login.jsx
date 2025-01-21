import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState(
    "https://media-hosting.imagekit.io//d30bc5fe1a5d49c2/Profile.png?Expires=1831452688&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=F0ecf8kvw6nMPABvHg52Honu60IzaA7bL~qy3xEy2mqT8EJ~vxJqGPgNgs6gFF62~uvxCtUkB28XWkFSO~Xl7TeorVkGSptW7wfbctRZkRjSNsgs0Z-1K46o0wqNNg4U3rxxIP9vTcwIBAGHYcY6vgprsTF~IF4a17ftXlp3h3dNU8jg-lUlm9I7ZurBP0j9K74jniAJjjhcLLNwDM-iRJFZfcqciD3To4oZ38GGom6M5ukYnUPP~JoHp6bQIeJOM-AGaIPjq9bFcoKJjinyIA81aQnLK1Fz3S2WtY-Gd46fJtzZpt83rfHEmehISeDTHjHRv215j~m3ppO-CYxt1w__"
  );
  const [avatarPreview, setAvatarPreview] = useState(
    "https://media-hosting.imagekit.io//d30bc5fe1a5d49c2/Profile.png?Expires=1831452688&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=F0ecf8kvw6nMPABvHg52Honu60IzaA7bL~qy3xEy2mqT8EJ~vxJqGPgNgs6gFF62~uvxCtUkB28XWkFSO~Xl7TeorVkGSptW7wfbctRZkRjSNsgs0Z-1K46o0wqNNg4U3rxxIP9vTcwIBAGHYcY6vgprsTF~IF4a17ftXlp3h3dNU8jg-lUlm9I7ZurBP0j9K74jniAJjjhcLLNwDM-iRJFZfcqciD3To4oZ38GGom6M5ukYnUPP~JoHp6bQIeJOM-AGaIPjq9bFcoKJjinyIA81aQnLK1Fz3S2WtY-Gd46fJtzZpt83rfHEmehISeDTHjHRv215j~m3ppO-CYxt1w__"
  );
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    console.log(dispatch(login(loginEmail, loginPassword)));
  };
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert.success("Login Done!");
      navigate(`/shopfusion/${redirect}`);
    }
  }, [dispatch, error, alert, isAuthenticated, redirect]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/shopfusion/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}>
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
