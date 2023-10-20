const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");

exports.createCategory = async (req, res, next) => {
  try {
    let data = await Category.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    let data = await Category.find().populate("subCategories").sort("name");
    res.status(200).json({ results: data.length, data });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

exports.getOneCategory = async (req, res, next) => {
  try {
    let data = await Category.findOne({ name: req.params.name }).populate(
      "subCategories"
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
exports.getCategoryById = async (req, res, next) => {
  try {
    let data = await Category.findById(req.params.id).populate("subCategories");
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    // Update the category to set deleted: true
    await Category.findByIdAndUpdate(
      categoryId,
      { $set: { deleted: true } },
      { new: true }
    );

    res.status(200).json({ message: "Category Deleted" });
  } catch (error) {
    next(error);
  }
};

exports.addSubCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const { subcategories } = req.body;

    // Update the category to add new subcategories to the subCategories array
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $addToSet: { subCategories: { $each: subcategories } } },
      { new: true }
    ).populate("subCategories", "name");

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

exports.removeSubCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const { subcategories } = req.body;

    // Update the category to remove the specified subcategories from the subCategories array
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $pull: { subCategories: { $in: subcategories } } },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    res
      .status(200)
      .json({ message: "Subcategories removed from the category." });
  } catch (error) {
    next(error);
  }
};
