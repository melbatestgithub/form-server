const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Comment = require('../models/PictureFeedback');  // Import your Comment model
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);  // Create the directory if it doesn't exist
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);  // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp for unique filenames
  },
});

const upload = multer({ storage });

router.post('/submit-comment', upload.array('pictures'), async (req, res) => {
  try {
    // Log the received files
    console.log('Files received:', req.files);

    const { satisfaction, ambiance, commentOne, commentTwo, email, phone } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: 'No files uploaded.' });
    }

    // Process feedback and files
    const feedbackData = {
      satisfaction,
      ambiance,
      commentOne,
      commentTwo,
      email,
      phone,
      pictures: req.files.map((file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`),
    };

    // Save feedback data to the database using Sequelize
    const savedFeedback = await Comment.create(feedbackData);

    res.status(200).send({ message: 'Feedback submitted successfully!', data: savedFeedback });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).send({ 
      message: 'Error submitting feedback', 
      error: error.message 
    });
  }
});

// You can add the route for retrieving picture data if necessary
router.get("/getPicturesWithComment ", async (req, res) => {
  try {
    const feedbackData = await Comment.findAll();
    res.status(200).send({ data: feedbackData });
  } catch (error) {
    res.status(500).send({ message: "Error fetching data", error: error.message });
  }
});

module.exports = router;
