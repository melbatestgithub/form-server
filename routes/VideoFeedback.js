const express = require("express");
const multer = require("multer");
const { Videos } = require("../models/VideoFeedback");

const router = express.Router();

// Multer setup to save video files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Route to handle video upload
router.post("/submit-form", upload.single("video"), async (req, res) => {
  try {
    const {
      satisfaction,
      ambiance,
      selectedType,
      videoFeedback,
      phone,
      email,
    } = req.body;

    const videoPath = req.file.path; // Save video path

    // Save data to database
    const newVideo = await Videos.create({
      satisfaction,
      ambiance,
      selectedType,
      video: videoPath, // Save video path in database
      videoFeedback,
      phone,
      email,
    });

    res.status(201).json({ message: "Video saved successfully", data: newVideo });
  } catch (error) {
    console.error("Error saving video:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
