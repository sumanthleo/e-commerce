import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_ITEM_FAIL,
} from "../constants/cartConstants";

export const addToCart = (item) => async (dispatch) => {
  // if cart already exists in local storage, use it, otherwise set to empty array
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  // check if duplicates
  const duplicates = cart.filter((cartItem) => cartItem._id === item._id);
  if (duplicates.length === 0) {
    // prep product data
    const productToAdd = {
      ...item,
      count: 1,
    };

    // add product data to cart
    cart.push(productToAdd);

    // add cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // add cart to redux
    dispatch({
      type: CART_ADD_ITEM,
      payload: cart,
    });
  }
};

export const deleteFromCart = (item) => async (dispatch) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const updatedCart = cart.filter((cartItem) => cartItem._id !== item._id);

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: updatedCart,
  });
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
