const mongoose = require("mongoose");
const Category = require("../models/categoryModel");
const Post = require("../models/postModel");
const Author = require("../models/authorModel");
const slugify = require("slugify");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "df690pfy3",
  api_key: "396969221864348",
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.createPost = async (req, res, next) => {
  try {
    const thumbnail = req.file.path;

    const { title, description, detailHtml, author, categories, slug } =
      req.body;
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
    const uploadResult = await cloudinary.uploader.upload(thumbnail, {
      folder: "posts",
      width: 2400,
      height: 1600,
      crop: "limit",
    });

    const post = new Post({
      title,
      description,
      detailHtml,
      author,
      categories,
      thumbnail: uploadResult.secure_url, // Set the thumbnail URL from Cloudinary
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
    const { sort, limit, page } = req.query;
    const pageSize = parseInt(limit) || 10;
    const currentPage = parseInt(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    let query = Post.find({ deleted: { $ne: true } })
      .populate("categories")
      .populate("author")
      .select("-detailHtml")
      .skip(skip)
      .limit(pageSize);

    if (sort) {
      query = query.sort(sort);
    }

    const [results, totalCount] = await Promise.all([
      query.exec(),
      Post.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      results: results.length,
      data: results,
      pagination: {
        totalResults: totalCount,
        currentPage,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.getPublished = async (req, res, next) => {
  try {
    const { sort, limit, page } = req.query;
    const pageSize = parseInt(limit) || 10;
    const currentPage = parseInt(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    let query = Post.find({ deleted: { $ne: true }, published: { $ne: false } })
      .populate("categories")
      .populate("author")
      .select("-detailHtml")
      .skip(skip)
      .limit(pageSize);

    if (sort) {
      query = query.sort(sort);
    }

    const [results, totalCount] = await Promise.all([
      query.exec(),
      Post.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      results: results.length,
      data: results,
      pagination: {
        totalResults: totalCount,
        currentPage,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getPostsByCategoryName = async (req, res, next) => {
  try {
    // Find the category document that matches the provided category name
    const category = await Category.findOne({
      name: req.params.category.toUpperCase(),
      deleted: { $ne: true },
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
exports.getPost = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Find the post by slug
    const post = await Post.findOne({ slug: slug })
      .populate("author")
      .populate("categories");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Find the related posts based on some criteria (e.g., same category)
    const relatedPosts = await Post.find({
      category: post.category,
      slug: { $ne: post.slug }, // Exclude the current post
    })
      .select("-detailHtml")
      .populate("author")
      .populate("categories");

    res.status(200).json({
      data: {
        post,
        relatedPosts,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    let data = await Post.updateOne(
      { slug: req.params.slug },
      { deleted: true },
      { new: true }
    );
    res.status(200).json({ deleted: true });
  } catch (error) {
    next(error);
  }
};
