const Author = require("../models/authorModel");
const Post = require("../models/postModel");
const cloudinary = require("cloudinary").v2;

const { promisify } = require("util");
const fs = require("fs");

cloudinary.config({
  cloud_name: "df690pfy3",
  api_key: "396969221864348",
  api_secret: process.env.CLOUDINARY_SECRET,
});
const uploadToCloudinary = async (file) => {
  try {
    // Read the file buffer using fs

    // Upload the file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file, {
      folder: "images", // Optional folder name in Cloudinary
    });
    return uploadResult.secure_url;
  } catch (error) {
    console.log(error);
  }
};

exports.createAuthor = async (req, res, next) => {
  try {
    let image = await uploadToCloudinary(req.body.image);
    let data = await Author.create({
      ...req.body,
      image,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.getAllAuthors = async (req, res, next) => {
  try {
    let data = await Author.find();
    res.status(200).json({
      results: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};
exports.getAuthorById = async (req, res, next) => {
  try {
    let author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({ message: "User not found" });
    }
    let posts = await Post.find({ author: author._id })
      .select("-detailHtml")
      .populate("categories");

    res.status(200).json({
      data: {
        author: author,
        posts: posts,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.getAuthorByUsername = async (req, res, next) => {
  try {
    let author = await Author.findOne({ username: req.params.username });

    if (!author) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the posts related to the author
    let posts = await Post.find({ author: author._id })
      .select("-detailHtml")
      .populate("categories");

    res.status(200).json({
      data: {
        author: author,
        posts: posts,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    let image = await uploadToCloudinary(req.body.image);

    const { username } = req.params;

    const updatedAuthor = await Author.findOneAndUpdate(
      { username: username },
      { ...req.body, image },
      { new: true }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({
      data: updatedAuthor,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedAuthor = await Author.findByIdAndDelete(
      id,
      { deleted: true },
      { new: true } // Return the updated document
    );

    if (!updatedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({
      data: updatedAuthor,
    });
  } catch (error) {
    next(error);
  }
};
