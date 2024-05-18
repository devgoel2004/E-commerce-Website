const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoo = () => {
  mongoose.connect(process.env.DB_URL);
};

module.exports = mongoo;
