// Import the necessary modules
const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/authController");

// Create a route to login a user
router.post("/login", login);
router.post("/signup", signUp);
// Export the router
module.exports = router;
