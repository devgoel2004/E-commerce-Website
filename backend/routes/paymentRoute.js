const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
  sendStripeSecretKey,
} = require("../controllers/paymentControllers");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/authentication");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(sendStripeApiKey);
router.route("/stripesecretkey").get(isAuthenticatedUser, sendStripeSecretKey);
module.exports = router;
