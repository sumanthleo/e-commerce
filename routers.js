import { Login, Signup } from "./controller/User-controller.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProducts,
  updateProduct,
} from "./controller/product-controller.js";

import express from "express";
const router = express.Router();
import {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} from "./verifyTokens/Tokens.js";
import {
  DeleteAdmin,
  GetAllUsers,
  GetUserAdmin,
  UpdateAdmin,
} from "./controller/AdminController.js";
import {
  CartCreate,
  deleteCart,
  GetallUserCart,
  GetuserCart,
  UpdatedCart,
} from "./controller/cart-controller.js";
import {
  deleteOrder,
  GetallUserorders,
  Getuserorders,
  OrderCreate,
} from "./controller/OrdersController.js";
import {
  placeOrder,
  getOrders,
  updateOrderPay,
  createdOrder,
  payorder,
} from "./controller/PlaceOrder.js";

//user routes
router.get("/", (req, res) => {
  res.send("<h1>Welcome to the API</h1>");
});
router.post("/signup", Signup);
router.post("/login", Login);
router.get("/product/:id", getProducts);
router.get("/product", getAllProducts);
router.post("/product", createProduct);

//admin routes
router.put("/user/:id", verifyTokenAndAuthorization, UpdateAdmin);
router.delete("/user/:id", verifyTokenAndAuthorization, DeleteAdmin);
router.get("/user/:id", verifyTokenAndAdmin, GetUserAdmin);
router.get("/user", verifyTokenAndAdmin, GetAllUsers);

router.post("/product", verifyTokenAndAdmin, createProduct);
router.put("/product/:id", verifyTokenAndAdmin, updateProduct);
router.delete("/product/:id", verifyTokenAndAdmin, deleteProduct);

router.post("/cart", verifyToken, CartCreate);
router.put("/cart/:id", verifyTokenAndAuthorization, UpdatedCart);
router.delete("/cart/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/cart/find/:userId", verifyTokenAndAuthorization, GetuserCart);
router.get("/cart/", verifyTokenAndAdmin, GetallUserCart);

router.post("/order", verifyToken, OrderCreate);
router.put("/order/:id", verifyTokenAndAuthorization, UpdatedCart);
router.delete("/order/:id", verifyTokenAndAuthorization, deleteOrder);
router.get("/order/find/:userId", verifyTokenAndAuthorization, Getuserorders);
router.get("/order/", verifyTokenAndAdmin, GetallUserorders);

router.post("/placeorder", placeOrder);
router.get("/placeorder/:id", getOrders);
router.put("/placeorder/:id/pay", updateOrderPay);

router.post("/create-order", createdOrder);
router.post("/pay-order", payorder);

router.get("/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

export default router;
