const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
const errorMiddleware = require("./middleware/error");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.get("/api/getKey", (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_KEY_ID,
  });
});
//middleware for errors
app.use(errorMiddleware);
module.exports = app;
