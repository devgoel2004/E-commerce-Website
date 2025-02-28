import React, { useEffect } from "react";
import MetaData from "../layout/Header/MetaData";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/shopfusion/login");
    }
  }, [isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user && user.name}'s Profile`} />
          <div className="profileContainer">
            <div className="">
              <h1>My Profile</h1>
              <img
                src={
                  user && user.avatar
                    ? user && user.avatar.url
                    : "./Profile.png"
                }
                alt={user && user.name}
              />
              <Link to="/shopfusion/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user && user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user && user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user && user.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <h4>Role</h4>
                <p style={{ textTransform: "capitalize" }}>
                  {user && user.role}
                </p>
              </div>
              <div>
                <Link to="/shopfusion/orders">My Orders</Link>
                <Link to="/shopfusion/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
