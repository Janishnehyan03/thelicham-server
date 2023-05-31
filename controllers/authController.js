const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate the input
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user
    const user = new User({
      username,
      email,
      password,
    });

    // Save the user
    await user.save();
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "360d",
      }
    );
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    user.password = undefined;
    res.cookie("login_token", token, {
      httpOnly: true,
      maxAge: decoded.exp,
    });
    // Redirect the user to the home page
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Please provide email and password" });
    } else {
      const user = await User.findOne({ email }).select("+password");
      if (!user || !(await user.comparePassword(password, user.password))) {
        res.status(401).json({ error: "Invalid email or password" });
      } else {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "360d",
          }
        );
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        user.password = undefined;
        res.cookie("login_token", token, {
          httpOnly: true,
          maxAge: decoded.exp,
        });
        
        res.status(200).json({
          user,
          token,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.login_token
      ? req.cookies.login_token
      : req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        message: "You dont't have access to perform this action",
      });
    }
    next();
  };
};
