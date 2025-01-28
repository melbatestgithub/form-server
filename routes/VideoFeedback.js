const express=require('express')
const router=express.Router()
const Video=require('../models/VideoFeedback')

router.post("/submit-form", async (req, res) => {
    const {
      satisfaction,
      ambiance,
      selectedType,
      video,
      videoFeedback,
      phone,
      email,
    } = req.body;
  
    try {
      // Create a new entry in the Videos table
      const newVideo = await Video.create({
        satisfaction,
        ambiance,
        selectedType,
        video,
        videoFeedback,
        phone,
        email,
      });
  
      res.status(201).json({
        message: "Form submitted successfully!",
        data: newVideo,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      res.status(500).json({
        message: "Error submitting form",
        error: error.message,
      });
    }
  });
  router.get("/", async (req, res) => {
    try {
      const feedbackData = await Video.findAll();
      res.status(200).send({ data: feedbackData });
    } catch (error) {
      res.status(500).send({ message: "Error fetching data", error: error.message });
    }
  });
module.exports=router