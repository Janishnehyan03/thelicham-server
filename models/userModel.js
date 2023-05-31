const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import the Schema type from Mongoose
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (password, userPassword) {
  // Check if the password is empty
  if (!password) {
    return false;
  }
  // Compare the hashed password to the password in the database
  return await bcrypt.compare(password, userPassword);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
