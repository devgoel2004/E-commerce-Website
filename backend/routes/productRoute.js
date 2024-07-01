const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productControllers");
const {
  isAuthenticatedUser,
  authorizationRoles,
} = require("../middleware/authentication");
const router = express.Router();
router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizationRoles("admin"), getAdminProducts);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizationRoles("admin"), createProduct);
router.route("/product/:id").put(isAuthenticatedUser, updateProduct);
router
  .route("/product/:id")
  .delete(isAuthenticatedUser, authorizationRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);
module.exports = router;
