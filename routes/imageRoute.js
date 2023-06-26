const router = require("express").Router();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const { promisify } = require("util");
const fs = require("fs");

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
  try {
    const unlink = promisify(fs.unlink);

    // Read the file buffer using fs

    // Upload the file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file, {
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
  } catch (error) {
    console.log(error);
  }
};

router.post("/upload", async (req, res) => {
  try {
    const files = req.body.images;
    // Upload each file to Cloudinary
    const uploadPromises = files.map((item, index) =>
      uploadToCloudinary(req.body.images[index])
    );

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
