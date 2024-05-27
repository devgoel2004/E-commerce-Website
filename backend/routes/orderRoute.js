const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizationRoles,
} = require("../middleware/authentication");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
router.route("/order/new").post(isAuthenticatedUser, newOrder);
router
  .route("/order/:id")
  .get(isAuthenticatedUser, authorizationRoles("admin"), getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizationRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizationRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizationRoles("admin"), deleteOrder);
module.exports = router;
