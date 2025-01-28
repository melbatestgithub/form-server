const express = require("express");
const multer = require("multer");
const Videos = require("../models/VideoFeedback");

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

router.post("/submit-form", upload.single("video"), async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);
    console.log("Uploaded file:", req.file);

    // Validate required fields
    if (!req.file) {
      return res.status(400).json({ message: "Video file is required." });
    }

    const {
      satisfaction,
      ambiance,
      selectedType,
      videoFeedback,
      phone,
      email,
    } = req.body;

    const videoPath = req.file.path; // Path to the uploaded video

    // Save data to the database
    const newVideo = await Videos.create({
      satisfaction,
      ambiance,
      selectedType,
      video: videoPath, // Save the file path
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


router.get("/", async (req, res) => {
  try {
    const feedbackData = await Videos.findAll();
    res.status(200).send({ data: feedbackData });
  } catch (error) {
    res.status(500).send({ message: "Error fetching data", error: error.message });
  }
});

module.exports = router;
