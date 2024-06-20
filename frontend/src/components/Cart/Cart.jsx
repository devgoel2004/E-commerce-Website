import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
import { Link } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addItemToCart(id, newQty));
  };
  const descreseQuantity = (id, quantity) => {
    const newQty = quantity + 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };
  const deleteCartItem = (id) => {
    dispatch(removeItemFromCart(id));
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <>
          <div className="emptyCart">
            <RemoveShoppingCartIcon />
            <Typography>No Product In Your Cart</Typography>
            <Link to="/products">View Products</Link>
          </div>
        </>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>SubTotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <>
                  {console.log(item.quantity)}
                  <div className="cartContainer" key={item.product}>
                    <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                    <div className="cartInput">
                      <button
                        onClick={() =>
                          descreseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }>
                        -
                      </button>
                      <input type="number" value={item.stock} readOnly />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }>
                        +
                      </button>
                    </div>
                    <p className="cartSubtotal">${item.price * item.stock}</p>
                  </div>
                  <div className="cartGrossProfit">
                    <div></div>
                    <div className="cartGrossProfitBox">
                      <p>Gross Total</p>
                      <p>{`$600`}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                      <button>Check Out</button>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Cart;