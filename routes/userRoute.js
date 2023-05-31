const express = require("express");
const router = express.Router();
const { getAllUsers, getMe } = require("../controllers/userController");
const { protect, restrictTo } = require("../controllers/authController");

router.get("/", protect, restrictTo("admin"), getAllUsers);
router.get("/me", protect, getMe);

module.exports = router;
