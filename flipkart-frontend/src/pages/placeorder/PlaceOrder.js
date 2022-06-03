import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/actions/orderAction";
import "./placeorder.css";
import CheckoutSteps from "../checkoutsteps/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../../redux/constants/orderConstant";
function PlaceOrder(props) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const toPrice = (num) => Number(num.toFixed(2));
  cart.price = toPrice(cart.cart.reduce((a, c) => a + c.count * c.price, 0));
  cart.totalPrice = cart.price * 0.069 + cart.price;
  const totalPrice = toPrice(cart.totalPrice);

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cart.map((item) => ({
          productId: item.productId,
          count: item.count,
          price: item.price,
          totalPrice: item.totalPrice,
          image: item.image,
          name: item.item_name,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.price,
        totalPrice: cart.price * 0.069 + cart.price,
      })
    );
  };

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, loading, error, order } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, navigate, success]);

  return (
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
          <h1>Place Order</h1>
          <div
            className="shipping"
            style={{
              width: "100%",
              height: "15%",
              boxShadow: "0px 0px 5px #ccc",
              margin: "10px",
              marginBottom: "25px",
              paddingBottom: "30px",
              borderRadius: "10px",
            }}
          >
            <h4 style={{ textAlign: "center" }}>Shipping</h4>
            <p style={{ marginLeft: "15px" }}>
              <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
              <strong>Address: </strong> {cart.shippingAddress.address},
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
              {cart.shippingAddress.country}
            </p>
          </div>
          <div
            className="payment"
            style={{
              width: "100%",
              height: "10%",
              boxShadow: "0px 0px 5px #ccc",
              margin: "10px",
              marginBottom: "25px",
              paddingBottom: "35px",
              borderRadius: "10px",
            }}
          >
            <h4 style={{ textAlign: "center" }}>Payment</h4>
            <p style={{ marginLeft: "15px" }}>
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
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
              {cart.cart.map((item) => (
                <li
                  key={item._id}
                  style={{
                    boxShadow: "1px 1px 1px 2px whitesmoke",
                    margin: "10px",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
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
                    <div className="min-30">{item.title}</div>

                    <div>
                      {item.count} x {item.price}/- = {item.count * item.price}{" "}
                      /-
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right" style={{ width: "27%" }}>
          <h2 style={{ textAlign: "center" }}>order summary</h2>
          <div
            className="shipping"
            style={{
              width: "100%",
              boxShadow: "0px 0px 5px #ccc",
              marginLeft: "20px",
              marginTop: "30px",
              paddingBottom: "20px",
            }}
          >
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items Price</div>
                  <div>{cart.price} /-</div>
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
                    <strong>{totalPrice} /-</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary"
                  style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "#ffc107",
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                    border: "none",
                    cursor: "pointer",
                  }}
                  disabled={cart.cart.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <h2>Loading...</h2>}
              {error && <h2 style={{ color: "red" }}>{error}</h2>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
