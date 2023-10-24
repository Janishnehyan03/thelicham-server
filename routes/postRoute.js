const router = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "/tmp",
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
  getPublished,
  updatePost,
  getUnPublished,
  getUnPublishedOne,
  publishPost
} = require("../controllers/postController");

router.post(
  "/",
  protect,
  restrictTo("admin"),
  upload.single("thumbnail"),
  createPost
);
router.get("/type/unpublished", getUnPublished);
router.get("/", getPublished);
router.get("/category/:category", getPostsByCategoryName);
router.get("/:slug", getPost);
router.get("/unpublished/:slug", getUnPublishedOne);
router.patch(
  "/:slug",
  protect,
  restrictTo("admin"),
  updatePost
);
router.delete("/:slug", deletePost);
router.put("/publish/:slug", publishPost);

module.exports = router;
