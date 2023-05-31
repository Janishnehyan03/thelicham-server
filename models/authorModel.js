const mongoose = require("mongoose");

// Define the author schema
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
