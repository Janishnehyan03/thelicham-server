const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { protect, restrictTo } = require("../controllers/authController");
const {
  createPost,
  getAllPosts,
  getPostsByCategoryName,
  getPost,
} = require("../controllers/postController");

router.post(
  "/",
  protect,
  restrictTo("admin"),
  upload.single("thumbnail"),
  createPost
);
router.get("/", getAllPosts);
router.get("/category/:category", getPostsByCategoryName);
router.get("/:slug", getPost);

module.exports = router;
