const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const sliderRoute = require("./routes/slider");
const serviceRoute = require("./routes/service");
const cartrouter= require("./routes/cart");
const cors = require("cors");
const MONGO_URL =
  "mongodb+srv://meenalprakash03:meenal2003@cluster0.mqol6db.mongodb.net/";

app.use(cors());
dotenv.config();

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartrouter);
app.use("/api/sliders", sliderRoute);
app.use("/api/services", serviceRoute);

app.listen(5000, () => {
  console.log("Backend server is running");
});
