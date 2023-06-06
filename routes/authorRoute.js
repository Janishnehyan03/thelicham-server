const { protect, restrictTo } = require("../controllers/authController");
const {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  getAuthorByUsername,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const router = require("express").Router();

router.get("/", getAllAuthors);
router.get("/:username", getAuthorByUsername);
router.get("/userId/:id", getAuthorById);

router.use(protect, restrictTo("admin"));

router.post("/", createAuthor);
router.patch("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;
