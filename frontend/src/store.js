import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
} from "./reducers/productReducer";
import {
  userReducer,
  updateReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  myOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./reducers/orderReducer";
const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: updateReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
