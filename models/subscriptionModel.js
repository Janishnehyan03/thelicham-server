const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: String,
    enum: ["one-month", "three-months", "six-months"],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  paymentStatus: {
    type: String,
    default: "pending",
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
