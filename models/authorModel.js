const mongoose = require("mongoose");

// Define the author schema
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  username: {
    required: [true, "Username is required"],
    type: String,
    unique: [true, "Username is already in use"],
  },
  image: {
    type: String,
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

  deleted: {
    default: false,
    type: Boolean,
  },
});

authorSchema.pre(/^find/, function (next) {
  this.where("deleted").ne(true);
  next();
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
