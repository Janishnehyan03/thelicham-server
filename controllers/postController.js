const mongoose = require("mongoose");
const Category = require("../models/categoryModel");
const Post = require("../models/postModel");
const Author = require("../models/authorModel");
const slugify = require("slugify");

exports.createPost = async (req, res, next) => {
  try {

    const {
      title,
      description,
      detailHtml,
      author,
      categories,
      thumbnail,
      slug,
    } = req.body;
    if (
      !title ||
      !description ||
      !detailHtml ||
      !author ||
      !categories ||
      !slug ||
      !thumbnail
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const post = new Post({
      title,
      description,
      detailHtml,
      author,
      categories,
      thumbnail: "image",
      slug: slugify(slug),
    });
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const { sort, limit } = req.query;
    let query = Post.find().populate("categories").populate("author");

    if (sort) {
      query = query.sort(sort);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const data = await query.exec();

    res.status(200).json({ results: data.length, data });
  } catch (error) {
    next(error);
  }
};

exports.getPostsByCategoryName = async (req, res, next) => {
  try {
    // Find the category document that matches the provided category name
    const category = await Category.findOne({
      name: req.params.category.toUpperCase(),
    }).exec();

    if (!category) {
      res.status(404).json({ error: "Category not found" });
    } else {
      // Find posts that have the matching category ObjectId
      const posts = await Post.find({
        categories: new mongoose.Types.ObjectId(category._id),
      })
        .populate("categories")
        .populate("author")
        .exec();
      res.status(200).json({ results: posts.length, posts });
    }
  } catch (error) {
    next(error);
  }
};
exports.getPostsByAuthorName = async (req, res, next) => {
  try {
    // Find the category document that matches the provided category name
    const author = await Author.findOne({
      name: req.params.author,
    }).exec();

    if (!author) {
      // Category not found, handle the error accordingly
      throw new Error("Category not found");
    }

    // Find posts that have the matching category ObjectId
    const posts = await Post.find({
      author: new mongoose.Types.ObjectId(author._id),
    })
      .populate("category")
      .populate("author")
      .exec();
    res.status(200).json({ results: posts.length, posts });
  } catch (error) {
    next(error);
  }
};
