const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const product = require("./routes/productRoute");
app.use(express.json());
app.use("/api/v1", product);
//middleware for errors
app.use(errorMiddleware);
module.exports = app;
