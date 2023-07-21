const router = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: '/tmp',
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const { protect, restrictTo } = require("../controllers/authController");
const {
  createPost,
  getAllPosts,
  getPostsByCategoryName,
  getPost,
  deletePost,
  getPublished
} = require("../controllers/postController");

router.post(
  "/",
  protect,
  restrictTo("admin"),
  upload.single("thumbnail"),
  createPost
);
router.post("/", getAllPosts);
router.get("/", getPublished);
router.get("/category/:category", getPostsByCategoryName);
router.get("/:slug", getPost);
router.delete("/:slug", deletePost);

module.exports = router;
