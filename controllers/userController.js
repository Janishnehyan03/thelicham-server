const User = require("../models/userModel");
const jwt=require('jsonwebtoken')

exports.getAllUsers = async (req, res, next) => {
  try {
    let data = await User.find({ role: { $ne: "admin" } });
    res.status(200).json({ results: data.length, data });
  } catch (error) {
    next(error);
  }
};
exports.getMe = async (req, res, next) => {
  try {
    const token = req.cookies.login_token
      ? req.cookies.login_token
      : req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
