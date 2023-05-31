const Author = require("../models/authorModel");

exports.createAuthor = async (req, res, next) => {
  try {
    let data = await Author.create({
      name: req.body.name,
      email: req.body.email,
      image: req.body.image,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.getAllAuthors = async (req, res, next) => {
  try {
    let data = await Author.find();
    res.status(200).json({
      results: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};
