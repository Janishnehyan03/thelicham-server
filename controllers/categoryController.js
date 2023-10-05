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
    let data = await Category.find().populate("subCategories").sort('name')
    res.status(200).json({ results: data.length, data });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const { name, subcategoryIds } = req.body;

    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404).json({ error: "Category not found." });
      return;
    }

    // Check if the provided subcategoryIds contain the categoryId
    if (subcategoryIds && subcategoryIds.includes(categoryId.toString())) {
      res
        .status(400)
        .json({ error: "Category ID cannot be added as a subcategory." });
      return;
    }

    // Update the name if it's provided in the request
    if (name) {
      category.name = name;
    }

    // Update or add subcategories if subcategoryIds are provided
    if (subcategoryIds && subcategoryIds.length > 0) {
      // Create an array to store the updated subcategories
      const updatedSubcategories = [];

      // Loop through the provided subcategoryIds
      for (const subcategoryId of subcategoryIds) {
        // Check if the subcategoryId exists in the category's subCategories
        const existingSubcategory = category.subCategories.find(
          (subcategory) => subcategory._id.toString() === subcategoryId
        );

        if (existingSubcategory) {
          // If it exists, update its properties (e.g., name)
          const updatedSubcategory = {
            ...existingSubcategory,
            // Add any properties you want to update
          };
          updatedSubcategories.push(updatedSubcategory);
        } else {
          // If it doesn't exist, create a new subcategory
          const newSubcategory = {
            _id: subcategoryId,
            // Add any properties you want for new subcategories
          };
          updatedSubcategories.push(newSubcategory);
        }
      }

      // Replace the category's subCategories with the updated array
      category.subCategories = updatedSubcategories;
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
