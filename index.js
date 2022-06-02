import express from "express";
import dotenv from "dotenv";
import connection from "./db.js";
import cors from "cors";
import router from "./routers.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.use(express.urlencoded({ extended: true }));

//routes

app.use("/", router);

// dataBase
connection();

app.get("/get-razorpay-key", (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

app.listen(process.env.PORT || 8003, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
