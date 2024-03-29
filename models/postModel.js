const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: [true, "Title is already used"],
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: [true, "This slug is already used"],
    },
    detailHtml: {
      type: String,
      required: true,
      unique: [true, "This field is already used"],
    },
    categories: [
      {
        type: mongoose.Types.ObjectId,
        required: [true, "Category is required"],
        ref: "Category",
      },
    ],
    author: {
      type: mongoose.Types.ObjectId,
      required: [true, "Category is required"],
      ref: "Author",
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
    slide: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
