import express from "express";
import dotenv from "dotenv";
import connection from "./db.js";
import cors from "cors";
import router from "./routers.js";

dotenv.config();

const app = express();
app.use(express.json());

const whitelist = ["https://fantastic-bienenstitch-15b741.netlify.app"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

//routes

app.use("/", router);

app.use(express.static(path.join(__dirname, "/flipkart-frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/flipkart-frontend/build", "index.html"));
});

// dataBase
connection();

app.get("/get-razorpay-key", (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

app.listen(process.env.PORT || 8003, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
