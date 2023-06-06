// Import the necessary modules
const express = require("express");
const router = express.Router();
const { signUp, login, logout, verifyToken } = require("../controllers/authController");

// Create a route to login a user
router.post("/login", login);
router.post("/signup", signUp);
router.post("/logout", logout);
router.get("/verify-otp", verifyToken);
// Export the router
module.exports = router;
