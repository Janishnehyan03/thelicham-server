const mongoose = require("mongoose");

// Define the category schema
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "This name is already in use"],
    uppercase: true,
  },
  subCategories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
});
categorySchema.pre(/^find/, function (next) {
  this.where("deleted").equals(false);
  next();
});
// Create the category model
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
