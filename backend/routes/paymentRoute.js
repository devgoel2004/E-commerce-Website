const express = require("express");
const {
  checkOut,
  paymentVerification,
} = require("../controllers/paymentControllers");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/authentication");

router.route("/checkOut").post(checkOut);
router
  .route("/paymentVerification")
  .post(isAuthenticatedUser, paymentVerification);
module.exports = router;
