const app = require("./app");
const dotenv = require("dotenv");
const mongoo = require("./config/db");
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});
dotenv.config();
mongoo();
const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log("Server is working");
});
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
