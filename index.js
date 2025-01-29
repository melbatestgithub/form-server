const express = require('express');
const app = express();
const sequlize=require("./db")
const feedbackRoutes = require('./routes/Feedback');
const pictureFeedback = require('./routes/PictureFeedback');
const videoFeedback = require('./routes/VideoFeedback');
const path = require("path");
const port = 5800;
const cors=require("cors")
app.use(cors({
    origin: '*', // Allow all origins (or specify your frontend URL instead)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/comments', feedbackRoutes);
app.use('/pictureFeedback', pictureFeedback);
app.use('/videoFeedback', videoFeedback);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

sequlize.sync()
    .then(() => {
        console.log('Database synced successfully.');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


