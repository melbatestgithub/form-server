const express = require('express');
const app = express();
const sequlize=require("./db")
const feedbackRoutes = require('./routes/Feedback');
const pictureFeedback = require('./routes/PictureFeedback');
const port = 5800;
const cors=require("cors")
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/comments', feedbackRoutes);
app.use('/pictureFeedback', pictureFeedback);
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

