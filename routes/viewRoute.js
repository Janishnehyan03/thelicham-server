const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    let data = await Post.find({ published: true })
      .populate("author")
      .populate("categories");
    let posts = data.map((post) => {
      return {
        title: `${post.title}`,
        description: `${post.description.substring(0, 200)}...`,
        author: post.author.name,
        createdAt: post.createdAt,
        thumbnail: post.thumbnail,
        slug: post.slug,
        authorImage: post.author.image,
      };
    });

    let user = null;
    if (req.cookies.jwt) {
      const decodedToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
      user = await User.findById(decodedToken.userId);
    }
    res.render("home", {
      posts,
      title: "Thelicham",
      pageDescription: "Thelicham",
      user,
    });
  } catch (error) {
    console.log(error);
    res.render("error");
  }
});
router.get("/post/:slug", async (req, res) => {
  try {
    let post = await Post.findOne({ slug: req.params.slug })
      .lean()
      .populate("author")
      .populate("categories");
    if (post) {
      res.render("post-details", {
        post,
        title: `${post?.title} | Thelicham`,
        pageDescription: post?.description,
      });
    }
  } catch (error) {
    console.log(error);
    res.render("error");
  }
});

module.exports = router;
