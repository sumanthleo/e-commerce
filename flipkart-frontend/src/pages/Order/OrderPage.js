import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import CheckoutSteps from "../checkoutsteps/CheckoutSteps";
import { detailsOrder, payOrder } from "../../redux/actions/orderAction";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../../redux/constants/orderConstant";
import "./order.css";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import Modal from "react-modal";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    color: "black",
  },
};

function OrderPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const { id: orderId } = params;

  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.users);
  const { users } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get(
        "https://zomato-backend-api.herokuapp.com/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const paypalDetails = localStorage.getItem("__paypal_storage__")
    ? JSON.parse(localStorage.getItem("__paypal_storage__"))
    : [];

  return loading ? (
    <h1
      style={{
        color: "blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "250px 0%",
      }}
    >
      {" "}
      Loading ....
    </h1>
  ) : error ? (
    <h2
      variant="danger"
      style={{
        color: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "200px 0%",
      }}
    >
      Something went Wrong .....
    </h2>
  ) : (
    <div>
      <div className="placeorder">
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

        <div
          className="mainContainersssss"
          style={{
            display: "flex",
            width: "98%",
            // height: "100vh",
            marginTop: "3%",
          }}
        >
          <div className="left" style={{ width: "70%" }}>
            <h1>Order {order._id}</h1>
            <div
              className="shipping"
              style={{
                width: "100%",
                boxShadow: "0px 0px 5px #ccc",
                margin: "10px",
                marginBottom: "20px",
                paddingBottom: "20px",
              }}
            >
              <h4 style={{ textAlign: "center" }}>Shipping</h4>
              <p>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <div variant="success" style={{ color: "blue" }}>
                  Delivered at {order.deliveredAt}
                </div>
              ) : (
                <div
                  style={{
                    color: "red",
                    textAlign: "center",
                    backgroundColor: "black",
                    padding: "7px",
                    width: "50%",
                    margin: "auto",
                    marginTop: "10px",
                  }}
                >
                  Not Delivered
                </div>
              )}
            </div>
            <div
              className="payment"
              style={{
                width: "100%",
                boxShadow: "0px 0px 5px #ccc",
                margin: "10px",
                marginBottom: "20px",
                paddingBottom: "20px",
              }}
            >
              <h4 style={{ textAlign: "center" }}>Payment</h4>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <div
                  variant="success"
                  style={{
                    color: "lightgreen",
                    textAlign: "center",
                    backgroundColor: "black",
                    padding: "7px",
                    width: "50%",
                    margin: "auto",
                    marginTop: "10px",
                  }}
                >
                  Paid at {order.paidAt}
                </div>
              ) : (
                <div
                  style={{
                    color: "red",
                    textAlign: "center",
                    backgroundColor: "black",
                    padding: "7px",
                    width: "50%",
                    margin: "auto",
                    marginTop: "10px",
                  }}
                >
                  Not Paid
                </div>
              )}
            </div>
            <div
              className="orderitems"
              style={{
                width: "100%",
                height: "auto",
                boxShadow: "0px 0px 5px #ccc",
                margin: "10px",
              }}
            >
              <h4 style={{ textAlign: "center" }}>Order Items</h4>
              <ul>
                {order.orderItems.map((item) => (
                  <li
                    key={item._id}
                    style={{ boxShadow: "2px 2px 2px 2px lightgreen" }}
                  >
                    <div className="row">
                      <div>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="small"
                          style={{
                            width: "100px",
                            height: "100px",
                            margin: "10px",
                            borderRadius: "10px",
                          }}
                        ></img>
                      </div>
                      <div className="min-30">{item.item_name}</div>

                      <div>
                        {item.count} x {item.price}/- ={" "}
                        {item.count * item.price} /-
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right">
            <h2 style={{ textAlign: "center" }}>order summary</h2>
            <div className="shipping">
              <ul>
                <li>
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div className="row">
                    <div>Items Price</div>
                    <div>{order.itemsPrice} /-</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Shipping</div>
                    <div>15.5 /-</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Tax</div>
                    <div>4.5 /-</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>
                      <strong> Order Total</strong>
                    </div>
                    <div>
                      {" "}
                      <strong>{order.totalPrice} /-</strong>{" "}
                    </div>
                  </div>
                </li>
                {!order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <h2>Loading...</h2>
                    ) : (
                      <>
                        {errorPay && (
                          <h1 variant="danger" style={{ color: "red" }}>
                            {errorPay}
                          </h1>
                        )}{" "}
                        {loadingPay && <h2>Loading...</h2>}
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        ></PayPalButton>
                        <span style={{ color: "red" }}>
                          *Note:
                          <p> email: sb-jufma16091502@personal.example.com</p>
                          <span style={{ color: "blue" }}>
                            password: suManth@123
                          </span>
                        </span>
                      </>
                    )}
                  </li>
                )}
                {order.isPaid === true ? (
                  <Modal isOpen={true} style={customStyles}>
                    <h1 style={{ textAlign: "center", marginBottom: "10%" }}>
                      Order success Details
                    </h1>
                    <div>orderId : {order._id}</div>
                    <div>paymentId : {paypalDetails.id}</div>
                    <Link to={"/"}>
                      <button
                        style={{
                          marginLeft: "25%",
                          marginTop: "15%",
                          backgroundColor: "lightGreen",
                        }}
                      >
                        Continue shopping
                      </button>
                    </Link>
                  </Modal>
                ) : (
                  ""
                )}
                {loading && <h2>Loading...</h2>}
                {error && <h2 style={{ color: "red" }}>{error}</h2>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
