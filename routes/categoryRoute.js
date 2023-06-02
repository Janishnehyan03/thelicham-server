const { protect, restrictTo } = require("../controllers/authController");
const { createCategory, getAllCategories, createSubCategory, getAllSubCategories } = require("../controllers/categoryController");
const router = require("express").Router();

router.post("/", protect, restrictTo("admin"), createCategory);
router.get("/", getAllCategories);
router.get("/subcategory", getAllSubCategories);
router.post("/subcategory", protect, restrictTo("admin"), createSubCategory);

module.exports=router