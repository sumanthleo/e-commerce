import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        item_name: { type: String },
        count: { type: Number },
        image: { type: String },
        price: { type: Number },
      },
    ],

    shippingAddress: {
      fullName: { type: String },
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    paymentMethod: { type: String },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number },
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    amount: Number,
    razorpay: {
      orderId: String,
      paymentId: String,
      signature: String,
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("PlaceOrder", orderSchema);
export default Order;
