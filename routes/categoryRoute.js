const { protect, restrictTo } = require("../controllers/authController");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  getOneCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = require("express").Router();

router.post("/", protect, restrictTo("admin"), createCategory);
router.get("/", getAllCategories);
router.get("/:id", getOneCategory);
router.get("/name/:name", getOneCategory);
router
  .route("/:id", protect, restrictTo("admin"))
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
