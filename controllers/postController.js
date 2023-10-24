const mongoose = require("mongoose");
const Category = require("../models/categoryModel");
const Post = require("../models/postModel");
const Author = require("../models/authorModel");
const slugify = require("slugify");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const cheerio = require("cheerio"); // Import cheerio

cloudinary.config({
  cloud_name: "df690pfy3",
  api_key: "396969221864348",
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.createPost = async (req, res, next) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "Image is not uploaded" });
    }

    const $ = cheerio.load(req.body.detailHtml);

    // Extract image sources
    const imageSources = [];
    const imagePromises = [];
    const thumbnail = cloudinary.uploader.upload(req.file.path, {
      folder: "posts",
      width: 2400,
      height: 1600,
      crop: "limit",
    });

    $("img").each((index, element) => {
      const src = $(element).attr("src");
      if (src) {
        imageSources.push(src);

        // Upload the image to Cloudinary and replace the image tag
        const imageUploadPromise = cloudinary.uploader.upload(src, {
          folder: "posts",
          width: 2400,
          height: 1600,
          crop: "limit",
        });

        imagePromises.push(imageUploadPromise);

        // Replace the image with a placeholder while uploading
        const placeholderImage = "placeholder-image-url"; // Replace with your placeholder image URL
        $(element).attr("src", placeholderImage);
      }
    });

    // Wait for all image uploads to complete
    const imageResults = await Promise.all(imagePromises);

    // Replace the placeholder images with Cloudinary URLs
    imageResults.forEach((result, index) => {
      $("img").eq(index).attr("src", result.secure_url);
    });

    const detailHtmlWithCloudinaryUrls = $.html();
    // Convert categories to an array
    const categoriesArray = req.body.categories.split(",");

    // Create and save the Post document
    const post = new Post({
      ...req.body,
      detailHtml: detailHtmlWithCloudinaryUrls, // Use the HTML with Cloudinary URLs
      slug: slugify(req.body.slug),
      thumbnail: (await thumbnail).secure_url,
      categories: categoriesArray,
    });

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    // Handle the error here, e.g., return an error response
    res
      .status(500)
      .json({ error: "An error occurred while creating the post." });
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
    const pageSize = parseInt(limit) || 300;
    const currentPage = parseInt(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    let query = Post.find()
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
    console.log(results.length);
  } catch (error) {
    next(error);
  }
};
exports.getUnPublished = async (req, res, next) => {
  try {
    const { sort, limit, page } = req.query;
    const pageSize = parseInt(limit) || 10;
    const currentPage = parseInt(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    let query = Post.find()
      .populate("categories")
      .populate("author")
      .select("-detailHtml")
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

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
      pagination: {
        totalResults: totalCount,
        currentPage,
        totalPages,
      },
      data: results,
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
      published: { $ne: false },
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
    const post = await Post.findOne({ slug: slug, published: { $ne: false } })
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
exports.getUnPublishedOne = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Find the post by slug
    const post = await Post.findOne({ slug: slug, published: { $ne: true } })
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

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    let data = await Post.findOneAndDelete({ slug: req.params.slug });
    res.status(200).json({ deleted: true });
  } catch (error) {
    next(error);
  }
};
exports.publishPost = async (req, res, next) => {
  try {
    let data = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      { published: true }
    );
    res.status(200).json({ published: true });
  } catch (error) {
    next(error);
  }
};
exports.updatePost = async (req, res, next) => {
  try {
    const $ = cheerio.load(req.body.detailHtml);

    // Extract image sources
    const imageSources = [];
    const imagePromises = [];

    $("img").each((index, element) => {
      const src = $(element).attr("src");
      if (src && !src.includes("placeholder-image-url")) {
        imageSources.push(src);

        // Upload the image to Cloudinary and replace the image tag
        const imageUploadPromise = cloudinary.uploader.upload(src, {
          folder: "posts",
          width: 2400,
          height: 1600,
          crop: "limit",
        });

        imagePromises.push(imageUploadPromise);

        // Replace the image with a placeholder while uploading
        const placeholderImage = "placeholder-image-url"; // Replace with your placeholder image URL
        $(element).attr("src", placeholderImage);
      }
    });

    // Wait for all image uploads to complete
    const imageResults = await Promise.all(imagePromises);

    // Replace the placeholder images with Cloudinary URLs
    imageResults.forEach((result, index) => {
      $("img").each((i, el) => {
        const src = $(el).attr("src");
        if (src === "placeholder-image-url") {
          $(el).attr("src", result.secure_url);
        }
      });
    });

    const detailHtmlWithCloudinaryUrls = $.html();

    // Find and update the Post document based on the provided slug
    const updatedPost = await Post.findOne({ slug: req.params.slug });
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Update post data
    updatedPost.title = req.body.title;
    updatedPost.content = req.body.content;
    updatedPost.detailHtml = detailHtmlWithCloudinaryUrls; // Use the HTML with Cloudinary URLs

    await updatedPost.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    // Handle the error here, e.g., return an error response
    res
      .status(500)
      .json({ error: "An error occurred while updating the post." });
  }
};
