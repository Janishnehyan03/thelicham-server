const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");
const { createPost, getAllPosts, getPostsByCategoryName } = require("../controllers/postController");

router.post("/", protect, restrictTo("admin"), createPost);
router.get("/", getAllPosts);
router.get("/category/:category",getPostsByCategoryName);

module.exports = router;
