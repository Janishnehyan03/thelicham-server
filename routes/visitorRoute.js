const User = require("../models/userModel");
const VisitorCount = require("../models/visitorModel");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    let token;
    let period = req.query.period;
    if (req.headers.authorization?.split(" ")[1]) {
      token = req.headers.authorization?.split(" ")[1];
    } else if (req.cookies && req.cookies.login_token) {
      token = req.cookies.login_token;
    }
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user = await User.findById(decoded.userId);
      if (!user.role === "admin") {
        let period = req.query.period;

        let visitorCount = await updateCount(period, role);
        res.status(200).json({
          message: `Visitor count for ${period}: ${visitorCount.count}`,
          count: visitorCount.count,
        });
      } else {
        let visitorCount = await updateCount(period, user.role);
        res.status(200).json({
          message: `Visitor count for ${period}: ${visitorCount.count}`,
          count: visitorCount.count,
        });
      }
    } else {

      let visitorCount = await updateCount(period);
      res.status(200).json({
        message: `Visitor count for ${period}: ${visitorCount.count}`,
        count: visitorCount.count,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

async function updateCount(period, role) {
  let startDate, endDate;

  // Calculate the start and end date based on the specified period
  if (period === "day") {
    startDate = new Date().setHours(0, 0, 0, 0);
    endDate = new Date().setHours(23, 59, 59, 999);
  } else if (period === "month") {
    startDate = new Date().setDate(1);
    endDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).setHours(23, 59, 59, 999);
  } else if (period === "year") {
    startDate = new Date(new Date().getFullYear(), 0, 1);
    endDate = new Date(new Date().getFullYear(), 11, 31).setHours(
      23,
      59,
      59,
      999
    );
  } else {
    throw new Error("Invalid period");
  }

  if (role === "admin") {
    let count = await VisitorCount.findOne();
    return count;
  } else {
    // Update the visitor count for the specified period
    const visitorCount = await VisitorCount.findOneAndUpdate(
      { timestamp: { $gte: startDate, $lte: endDate } },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );

    return visitorCount;
  }
}


module.exports = router;
