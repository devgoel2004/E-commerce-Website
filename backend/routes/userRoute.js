const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/userControllers");
const {
  isAuthenticatedUser,
  authorizeRoles,
  authorizeRole,
} = require("../middleware/authentication");
// const authorizeRoles = require("../middleware/authentication");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/reset").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

// Admin Routes
router.route("/admin/users").get(authorizeRole,getAllUser);
router.route("/admin/user/:id").get(authorizeRole, getSingleUser);
router.route("/admin/user/:id").delete(authorizeRole, deleteUser);
router.route("/admin/user/:id").put(authorizeRole, updateUserRole);
module.exports = router;
