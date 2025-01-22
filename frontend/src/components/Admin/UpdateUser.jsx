import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SlideBar from "./SlideBar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

import "./UpdateUser.css";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { id } = useParams();
  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails(id));
    }
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/shopfusion/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, id, navigate]);
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = {
      name,
      email,
      role,
    };
    dispatch(updateUser(id, myForm));
    navigate("/shopfusion/admin/users");
  };
  return (
    <>
      <MetaData title="Update User"></MetaData>
      <div className="dashboard">
        <SlideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <>
              <form
                className="newProductContainer"
                onSubmit={updateUserSubmitHandler}>
                <h1>Update User</h1>
                <div>
                  <PersonIcon />
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <MailOutlineIcon />
                  <input
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <VerifiedUserIcon />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}>
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    updateLoading ? true : false || role === "" ? true : false
                  }>
                  Update
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
