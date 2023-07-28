const mongoose = require("mongoose");

// Define the category schema
const issueSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    unique: [true, "This title is already in use"],
    uppercase: true,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },

  deleted: {
    type: Boolean,
    default: false,
  },
  articles: [
    {
      title: {
        type: String,
        required: [true, "Article title is required"],
      },
      details: {
        type: String,
        required: [true, "Article details is required"],
      },
      author: {
        type: mongoose.Types.ObjectId,
        // required: [true, "Article details is required"],
        ref: "Author",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
issueSchema.pre(/^find/, function (next) {
  this.where("deleted").equals(false);
  next();
});
// Create the category model
const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue;
