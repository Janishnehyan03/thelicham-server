const mongoose = require("mongoose");

// Define the category schema
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "This name is already in use"],
    uppercase: true,
  },
});

// Create the category model
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
