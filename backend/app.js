const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const errorMiddleware = require("./middleware/error");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
app.use(express.json());
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
//middleware for errors
app.use(errorMiddleware);
module.exports = app;
