const crypto = require("crypto");
const Razorpay = require("razorpay");
const { Payment } = require("../models/paymentModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
exports.checkOut = catchAsyncErrors(async (req, res) => {
  const options = {
    amount: Number(req.body.amount),
    currency: "INR",
    receipt: "order_rcptid_l1",
  };
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });
  const order = await instance.orders.create(options);
  
  res.status(200).json({
    success: true,
    order,
  });
});
exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");
  await Payment.create({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });
  res.redirect(
    `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
  );
};
