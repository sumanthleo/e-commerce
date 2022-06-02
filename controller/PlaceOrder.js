import Order from "../model/PlaceOrder.js";
// const Order = require("../models/PlaceOrder");
// const Razorpay = require("razorpay");
import Razorpay from "razorpay";

export const placeOrder = async (req, res) => {
  try {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      // user: req.body.user._id,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: "New Order Created", order: createdOrder });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateOrderPay = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();

      res.status(200).json(updatedOrder);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const orderHistory = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user._id });
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const createdOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount,
      currency: "INR",
    };
    const order = await instance.placeorders.create(options);
    if (!order) return res.status(500).send("Some error occured");
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const payorder = async (req, res) => {
  try {
    const {
      amount,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;
    const newOrder = Order({
      isPaid: true,
      amount: amount,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();
    res.send({
      msg: "Payment was successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
