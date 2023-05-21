import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
  ORDER_SUMMARY_FAIL,
} from "../constants/orderConstant";
import { CART_EMPTY } from "../constants/cartConstants";
import Axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
      payload: order,
    });
    const {
      userSignin: { users },
    } = getState();
    const { data } = await Axios.post(
      "https://zomato-backend-api.herokuapp.com/placeorder",
      order,
      {
        headers: {
          Authorization: " Bearer " + users.token,
        },
      }
    );
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.order,
    });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cart");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      userSignin: { users },
    } = getState();
    const { data } = await Axios.get(
      `https://e-commerce-u66b.onrender.com/placeorder/${orderId}`,
      {
        headers: { Authorization: "Bearer " + users.token },
      }
    );
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    const {
      userSignin: { users },
    } = getState();
    const { data } = Axios.put(
      `https://e-commerce-u66b.onrender.com/placeorder/${order._id}/pay`,
      paymentResult,
      {
        headers: { Authorization: "Bearer " + users.token },
      }
    );
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};

export const listOrderMine = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_MINE_LIST_REQUEST });
    const {
      userSignin: { users },
    } = getState();

    const { data } = await Axios.get(
      "https://e-commerce-u66b.onrender.com/placeorder/mine",
      {
        headers: { Authorization: "Bearer " + users.token },
      }
    );
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
  }
};
