import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  USER_DETAILS_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from "../constants/userConstants";
import axios from "axios";
//Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/login",
      {
        email,
        password,
      },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Register Action
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/register",
      userData,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    const { data } = await axios.get("http://localhost:8000/api/v1/me", {
      withCredentials: true,
    });
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get("http://localhost:8000/api/v1/logout", {
      withCredentials: true,
    });
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response,
    });
  }
};
//Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "mutipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/me/update`,
      userData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response,
    });
  }
};
//Update Password
export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PASSWORD_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const data = await axios.put(
      "http://localhost:8000/api/v1/password/update",
      password,
      config
    );
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Forgot Password
export const forgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/password/reset",
      email,
      config
    );
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Reset Password
export const resetPasswordAction = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `http://localhost:8000/api/v1/password/reset/${token}`,
      password,
      config
    );
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Admin actions
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/admin/users`,
      config
    );
    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Get User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/admin/user/${id}`,
      config
    );
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/admin/user/${id}`,
      userData,
      config
    );
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/admin/user/${id}`,
      config
    );
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
//handle errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
