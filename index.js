import express from "express";
import dotenv from "dotenv";
import connection from "./db.js";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routers.js";

dotenv.config();

const app = express();
app.use(bodyParser.json({ extented: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
//routes

app.use("/", router);

// dataBase
connection();

app.get("/get-razorpay-key", (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
