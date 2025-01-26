const express = require('express');
const router = express.Router();
const { createFeedback ,getFeedback} = require('../controllers/Feedback');

router.post('/create', createFeedback);
router.get("/getFeedback",getFeedback)
module.exports = router;
