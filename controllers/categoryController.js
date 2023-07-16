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
    let data = await Category.find().populate("subCategories");
    res.status(200).json({ results: data.length, data });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const subcategoryIds = req.body.subcategoryIds; // Assuming an array of subcategory IDs is passed in the request body

    if (subcategoryIds && subcategoryIds.includes(categoryId)) {
      res
        .status(400)
        .json({ error: "Category ID cannot be added as a subcategory." });
      return;
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404).json({ error: "Category not found." });
      return;
    }

    const updatedSubcategories = category.subCategories.filter((subcategory) =>
      subcategoryIds.includes(subcategory._id.toString())
    );

     category.subCategories = updatedSubcategories;

    if (req.body.name) {
      category.name = req.body.name;
    }

    const updatedCategory = await category.save();

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
