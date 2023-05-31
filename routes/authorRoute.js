const { protect, restrictTo } = require("../controllers/authController");
const { createAuthor, getAllAuthors } = require("../controllers/authorController");
const router = require("express").Router();

router.post("/", protect, restrictTo("admin"), createAuthor);
router.get("/", getAllAuthors);

module.exports = router;
