const { protect, restrictTo } = require("../controllers/authController");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  getOneCategory,
  deleteCategory,
  getCategoryById,
  addSubCategory,
  removeSubCategory
} = require("../controllers/categoryController");
const router = require("express").Router();

router.post("/", protect, restrictTo("admin"), createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.get("/name/:name", getOneCategory);
router
  .route("/:id", protect, restrictTo("admin"))
  .patch(updateCategory)
  .delete(deleteCategory);
  router.patch('/:id/add',protect,restrictTo('admin'),addSubCategory)
  router.delete('/:id/remove',protect,restrictTo('admin'),removeSubCategory)

module.exports = router;
