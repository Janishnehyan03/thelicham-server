const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import the Schema type from Mongoose
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      maxLength: [255, "Email cannot be more than 255 characters"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      minLength: [2, "Username must be at least 2 characters long"],
      maxLength: [50, "Username cannot be more than 50 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    otpToken: {
      type: String,
    },
    otpTokenExpires: {
      type: Date,
    },
    verified: {
      type: Boolean,
      default: false,
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
