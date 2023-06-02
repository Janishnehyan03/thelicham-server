const mongoose = require("mongoose");

// Define the category schema
const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "This name is already in use"],
    uppercase: true,
  },
});

// Create the category model
const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;