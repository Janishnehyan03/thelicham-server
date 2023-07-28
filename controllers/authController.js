const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Email = require("../utils/email");


exports.signUp = async (req, res, next) => {
  try {
    async function generateUniqueOTP() {
      const OTP_LENGTH = 6;
      const chars = "0123456789";
      let otp = "";

      do {
        otp = "";
        for (let i = 0; i < OTP_LENGTH; i++) {
          otp += chars[Math.floor(Math.random() * chars.length)];
        }
      } while (await User.findOne({ otp }));

      return otp;
    }
    const otp = await generateUniqueOTP();
    const existingUser = await User.findOne({
      email: req.body.email,
      verified: true,
    });
    if (existingUser) {
      // User already exists
      return res.status(409).json({ message: "User already exists" });
    } else {
      await User.findOneAndRemove({
        email: req.body.email,
        verified: false,
      });
      // Create a new user with the user details from the Google login
      const newUser = new User({ ...req.body, otpToken: otp });

      // Save the new user to the database
      await newUser.save();
      await new Email({
        email: newUser.email,
        name: newUser.name,
        res: res,
        subject: "Email from Thelicham Monthly",
        title: "Confirmation Email",
        otpToken: otp,
        url: `${req.protocol}://${req.hostname}/api/v1/auth/verify-otp?email=${newUser.email}&otpToken=${otp}`,
      })
        .send("OTP")
        .then((data) => {
          console.log("email sent");
        });

      // Return the JWT token and the user details
      res.status(201).json(newUser);
    }
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(401).json({ message: "Please enter email and password" });
    } else {
      const existingUser = await User.findOne({
        email: req.body.email,
      }).select("+password");
      if (!existingUser) {
        res.status(401).json({ message: "No User Found In This Email" });
      } else {
        let correctPassword = await existingUser.comparePassword(
          req.body.password,
          existingUser.password
        );
        if (!correctPassword) {
          return res.status(401).json({ message: "Incorrect Password" });
        } else {
          // Generate a JWT token for the user
          const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "100d" }
          );
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: decoded.exp,
          });
          // Return the JWT token and the user details
          res.status(200).json({
            token,
            user: {
              id: existingUser._id,
              name: existingUser.name,
              email: existingUser.email,
              role: existingUser.role,
            },
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
    // next(err);
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    let user = await User.findOne({
      otpToken: req.query.otpToken,
      email: req.query.email,
    });
    if (user) {
      if (user.otpTokenExpires < Date.now) {
        res.status(400).json({ message: "OTP expired" });
      } else {
        user.verified = true;
        user.otpToken = undefined;
        user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "100d",
        });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: decoded.exp,
        });
        // Return the JWT token and the user details
        res.status(200).json({
          token,
          user,
        });
      }
    } else {
      res.status(400).json({ message: "User Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
      ? req.cookies.jwt
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

exports.logout = (req, res, next) => {
  res.clearCookie("login_token"); // Clear the JWT token from the client-side cookie

  res.status(200).json({ message: "Logged out successfully" });
};
