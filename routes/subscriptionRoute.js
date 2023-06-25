const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const crypto = require("crypto");
const Subscription = require("../models/subscriptionModel");
const moment = require("moment");
const { protect, restrictTo } = require("../controllers/authController");
const Magazine = require("../models/magazineModel");

dotenv.config();

const router = express.Router();

// Create a subscription order
router.post("/", protect, async (req, res) => {
  try {
    // Generate a unique order ID
    const orderId = uuidv4();

    // Create a Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create the Razorpay order
    const options = {
      amount: req.body.price * 100, // Replace with the actual amount
      currency: "INR", // Replace with the actual currency code
      receipt: orderId,
      payment_capture: 1,
    };

    razorpay.orders.create(options, async (error, order) => {
      if (error) {
        console.error("Razorpay order creation error:", error);
        return res.status(500).json({ error: "An error occurred" });
      }
      await Subscription.create({
        userId: req.user._id,
        duration: 30,
        plan: req.body.plan,
      });
      res.json({ orderId: order.id });
    });
  } catch (error) {
    console.error("Subscription creation error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Verify the payment
router.post("/verify-payment", protect, async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const subscription = await Subscription.findOne({ userId: req.user._id });

    // Verify the payment signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature === razorpaySignature) {
      let planDuration;

      if (subscription.plan === "one-month") {
        planDuration = 30;
      } else if (subscription.plan === "three-months") {
        planDuration = 90; // 6 months * 30 days = 180 days
      } else if (subscription.plan === "six-months") {
        planDuration = 180; // 1 year * 365 days = 365 days
      } else {
        // Default value if the plan is not recognized
        planDuration = 0;
      }
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + planDuration);

      // Update the subscription payment status and end date
      subscription.endDate = endDate;
      subscription.duration = planDuration;
      subscription.paymentStatus = "success";

      let updated = await subscription.save();
      res.json({ success: true });
    } else {
      // Payment verification failed
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.get("/", protect, async (req, res) => {
  try {
    const user = req.user._id;

    // Check if user has an active subscription
    const subscription = await Subscription.findOne({ userId: user });

    let hasSubscription = false;
    let expiryDate = null;
    const magazines = await Magazine.find();

    if (
      subscription &&
      subscription.endDate > Date.now() &&
      subscription.paymentStatus === "success"
    ) {
      hasSubscription = true;
      expiryDate = moment(subscription.endDate).format("MMMM Do YYYY");
      res.json({ magazines, user: { hasSubscription, expiryDate } });
    } else {
      res.json({ user: { hasSubscription, expiryDate } });
    }
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.post(
  "/magazine",
  protect,
  restrictTo("admin"),
  async (req, res, next) => {
    try {
      let data = await Magazine.create(req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
