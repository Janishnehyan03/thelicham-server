const router = require("express").Router();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const storage = multer.diskStorage({
  destination: '/tmp',
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const { promisify } = require("util");
const fs = require("fs");
const sharp = require('sharp');


cloudinary.config({
  cloud_name: "df690pfy3",
  api_key: "396969221864348",
  api_secret: process.env.CLOUDINARY_SECRET,
});

const imageSchema = new mongoose.Schema({
  publicId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("Image", imageSchema);
const uploadToCloudinary = async (file) => {
  const unlink = promisify(fs.unlink);

  // Read the file buffer using fs

  // Upload the file to Cloudinary
  const uploadResult = await cloudinary.uploader.upload(file.path, {
    folder: "images", // Optional folder name in Cloudinary
    
  });

  // Create a new image document in the database
  const image = new Image({
    publicId: uploadResult.public_id,
    url: uploadResult.secure_url, // Store the public URL in the image model
    createdAt: new Date(),
  });

  await image.save();

  // Delete the uploaded file from the local filesystem
  await unlink(file.path);

  return image;
};

router.post("/upload", upload.array("images"), async (req, res) => {
  try {
    const files = req.files;

    // Upload each file to Cloudinary
    const uploadPromises = files.map(uploadToCloudinary);

    // Wait for all uploads and database saves to complete
    const uploadedImages = await Promise.all(uploadPromises);

    res.status(200).json(uploadedImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
// Get all images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve images" });
  }
});

module.exports = router;
