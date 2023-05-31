const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const postRoute = require("./routes/postRoute");
const authorRoute = require("./routes/authorRoute");
const handleMongoError = require("./utils/errorHandler");

dotenv.config();
// Connect to the database

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Set up CORS
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan("dev"));
// routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/author", authorRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/post", postRoute);
app.all("*", (req, res, next) => {
  res.status(404).json("No URL " + req.originalUrl + " found in this server");
});

app.use((error, req, res, next) => {
  handleMongoError(error, res);
});
app.listen(process.env.PORT || 5000, () => {
  console.log("App is listening on port " + process.env.PORT);
});
