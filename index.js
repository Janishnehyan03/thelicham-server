const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fs = require("fs");

const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const postRoute = require("./routes/postRoute");
const authorRoute = require("./routes/authorRoute");
const visitorCountRoute=require('./routes/visitorRoute')
const subscriptionRoute=require('./routes/subscriptionRoute')
const imageRoute=require('./routes/imageRoute')

const handleMongoError = require("./utils/errorHandler");
const Post = require("./models/postModel");

dotenv.config();
// Connect to the database

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
    const args = process.argv.slice(2);
    if (args.includes("--import")) {
      importData();
    }
  })
  .catch((err) => {
    console.log(err);
  });

// Set up CORS
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static("public"));
// routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/author", authorRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/visitors", visitorCountRoute);
app.use("/api/v1/subscription", subscriptionRoute);
app.use("/api/v1/image", imageRoute);
app.all("*", (req, res, next) => {
  res.status(404).json("No URL " + req.originalUrl + " found in this server");
});

// import data.json to DB
const importData = async () => {
  const filePath = "data.json";
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    const jsonData = JSON.parse(data);

    // Import the JSON data into the MongoDB collection
    Post.insertMany(jsonData)
      .then((data) => {
        console.log("Data imported successfully");
      })
      .catch((err) => {
        console.error("Error importing data:", err);
      });
  });
};

app.use((error, req, res, next) => {
  handleMongoError(error, res);
});
app.listen(process.env.PORT || 5000, () => {
  console.log("App is listening on port " + process.env.PORT);
});
