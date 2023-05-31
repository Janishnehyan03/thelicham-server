const handleDuplicateKeyError = (error, res) => {
  const field = Object.keys(error.keyValue);
  const value = error.keyValue[field];
  const message = `${field} (${value}) already exists.`;
  res.status(409).json({ message });
};

const handleValidationError = (error, res) => {
  const errors = Object.values(error.errors).map((err) => err.message);
  const message = `Invalid input data. ${errors.join(" ")}`;
  res.status(400).json({ message });
};

const handleCastError = (error, res) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  res.status(400).json({ message });
};

const handleMongooseError = (error, res) => {
  console.log(error);
  if (error.code === 11000) {
    handleDuplicateKeyError(error, res);
  } else if (error.name === "ValidationError") {
    handleValidationError(error, res);
  } else if (error.name === "CastError") {
    handleCastError(error, res);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = handleMongooseError;
