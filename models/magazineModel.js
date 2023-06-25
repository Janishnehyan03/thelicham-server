const mongoose = require("mongoose");

// Define the category schema
const magazineSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "This name is already in use"],
    uppercase: true,
  },
  link: {
    type: String,
    required: [true, "URL is required"],
    unique: [true, "This URL is already in use"],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
},);
magazineSchema.pre(/^find/, function (next) {
  this.where("deleted").equals(false);
  next();
});
// Create the category model
const Magazine = mongoose.model("Magazine", magazineSchema);
module.exports = Magazine;
