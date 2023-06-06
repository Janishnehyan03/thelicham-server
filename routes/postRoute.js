const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");
const { createPost, getAllPosts, getPostsByCategoryName, getPost } = require("../controllers/postController");

router.post("/", protect, restrictTo("admin"), createPost);
router.get("/", getAllPosts);
router.get("/category/:category",getPostsByCategoryName);
router.get("/:slug",getPost);

module.exports = router;
