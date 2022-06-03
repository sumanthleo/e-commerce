import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";
import { CART_ADD_ITEM } from "../../redux/constants/cartConstants";
import { deleteFromCart } from "../../redux/actions/cartAction";
function Cart() {
  const cartss = useSelector((state) => state.cart);
  const { cart, error } = cartss;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQtyChange = (e, item) => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    cart.forEach((cartItem) => {
      if (cartItem._id === item._id) {
        cartItem.count = e.target.value;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({ type: CART_ADD_ITEM, payload: cart });
  };
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="mainCartContainer">
      <div
        className="Carttitle"
        style={{ textAlign: "center", fontSize: 30, fontWeight: 700 }}
      >
        YOUR BAG ITEMS
      </div>
      <div
        className="cart_items"
        style={{
          display: "flex",
          fontSize: 30,
          justifyContent: "center",
        }}
      >
        <div className="shoppingbag">SHOPPING BAG({cart.length})</div>
      </div>
      <div className="mainContainer">
        {cart.length <= 0 ? (
          <div
            style={{
              width: "65%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 className="display-4">
              Your cart is empty{" "}
              <Link to={"/"}>
                <button
                  style={{
                    marginLeft: "30%",
                    backgroundColor: "red",
                    color: "blue",
                    padding: "10px",
                    fontWeight: 600,
                  }}
                >
                  Go Back
                </button>
              </Link>
            </h1>
          </div>
        ) : (
          <div className="mainleft">
            {cart.map((item) => (
              <div className="cartleft" key={item._id}>
                <div className="innerleft">
                  <img src={item.image} alt="" className="cartImage" />
                </div>
                <div className="innerright">
                  <div
                    className="producttitle"
                    style={{
                      marginTop: "15px",
                      fontSize: "25px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </div>
                  <div className="resName">category : {item.category}</div>
                  <div className="productID" style={{ marginTop: "5px" }}>
                    {item.description}
                  </div>
                  <div
                    className="btnsandcolor"
                    style={{ display: "flex", marginTop: "35px" }}
                  >
                    <div className="quantity_btns">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={item.count}
                        onChange={(e) => handleQtyChange(e, item)}
                      />
                    </div>
                    <button
                      className="removecartBtn"
                      onClick={() => dispatch(deleteFromCart(item))}
                    >
                      Remove Item
                    </button>
                  </div>
                  <div
                    className="pricetag"
                    style={{ fontWeight: 700, marginLeft: "20px" }}
                  >
                    Total: {item.price * item.count}/-{" "}
                  </div>
                  <div className="pricetag">Item Price: {item.price}/- </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="cartright">
          <div className="cartright_items" style={{ marginTop: "10%" }}>
            <div
              className="cartright_items_title"
              style={{ margin: "5px", fontSize: "25px", textAlign: "center" }}
            >
              ORDER SUMMARY
            </div>
            <div
              className="cartright_items_subtitle"
              style={{ margin: "25px", textAlign: "center" }}
            >
              <div
                className="cartright_items_subtitle_title"
                style={{ margin: "5px" }}
              >
                SUBTOTAL:{" "}
                {cart
                  .reduce(
                    (currentSum, currentCartItem) =>
                      currentSum +
                      currentCartItem.count * currentCartItem.price,
                    0
                  )
                  .toFixed(1)}{" "}
                /-
              </div>
              <div
                className="cartright_items_subtitle_title"
                style={{ margin: "5px" }}
              >
                ESTIMATED SHIPPING: 0/-
              </div>
              <div
                className="cartright_items_subtitle_title"
                style={{ margin: "5px" }}
              >
                DISCOUNT: 0/-
              </div>
              <div
                className="cartright_items_subtitle_title"
                style={{ marginTop: "5px" }}
              >
                TOTAL :
                {cart
                  .reduce(
                    (currentSum, currentCartItem) =>
                      currentSum +
                      currentCartItem.count * currentCartItem.price * 1.069,
                    0
                  )
                  .toFixed(1)}
                /-
              </div>
              <button
                className="cartbtn"
                style={{ marginTop: "10%" }}
                disabled={cart.length === 0}
                onClick={checkoutHandler}
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
