const { protect, restrictTo } = require("../controllers/authController");
const { createCategory, getAllCategories } = require("../controllers/categoryController");
const router = require("express").Router();

router.post("/", protect, restrictTo("admin"), createCategory);
router.get("/", getAllCategories);

module.exports=router