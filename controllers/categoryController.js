const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");

exports.createCategory = async (req, res, next) => {
  try {
    let data = await Category.create({ name: req.body.name });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    let data = await Category.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.createSubCategory = async (req, res, next) => {
  try {
    let data = await SubCategory.create({ name: req.body.name });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
exports.getAllSubCategories = async (req, res, next) => {
  try {
    let data = await SubCategory.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
