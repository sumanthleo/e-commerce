import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_ITEM_FAIL,
} from "../constants/cartConstants";

const INITIAL_STATE = {
  cart: [],
};

if (localStorage.getItem("cart")) {
  INITIAL_STATE.cart = JSON.parse(localStorage.getItem("cart"));
} else {
  INITIAL_STATE.cart = [];
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return {
        cart: [...action.payload],
      };
    case CART_REMOVE_ITEM:
      return {
        cart: [...action.payload],
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
