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

router.get("/", (req, res) => {
  res.send("Welcome to the backend");
});
//user routes
router.post("/signup", Signup);
router.post("/login", Login);
router.get("/product/:id", getProducts);
router.get("/product", getAllProducts);
router.post("/products", createProduct);

// router.get('/', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.setHeader('Content-Type', 'text/html');
// });
//admin routes
router.put("/user/:id", UpdateAdmin);
router.delete("/user/:id", DeleteAdmin);
router.get("/user/:id", GetUserAdmin);
router.get("/user", GetAllUsers);

router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

router.post("/cart", CartCreate);
router.put("/cart/:id", UpdatedCart);
router.delete("/cart/:id", deleteCart);
router.get("/cart/find/:userId", GetuserCart);
router.get("/cart/", GetallUserCart);

router.post("/order", OrderCreate);
router.put("/order/:id", UpdatedCart);
router.delete("/order/:id", deleteOrder);
router.get("/order/find/:userId", Getuserorders);
router.get("/order/", GetallUserorders);

router.post("/placeorder", placeOrder);
router.get("/placeorder/:id", getOrders);
router.put("/placeorder/:id/pay", updateOrderPay);

router.post("/create-order", createdOrder);
router.post("/pay-order", payorder);

router.get("/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

export default router;
