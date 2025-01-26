const  Feedback  = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  try {
    const { satisfaction, ambiance, comment, phone, email } = req.body;

    const feedback = await Feedback.create({
      satisfaction,
      ambiance,
      comment: comment || null,
      phone: phone ,
      email: email ,
    });

    res.status(201).json({ message: 'Feedback created', data: feedback });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ message: 'Error creating feedback' });
  }
};
exports.getFeedback=async(req,res)=>{
 try {
  const allFeedback=await Feedback.findAll()
  res.status(200).send(allFeedback)
 } catch (error) {
    res.status(500).send("Internal Server Error is Occured")
 }

}

exports.updateFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const { comment, pictures, videos } = req.body;

    const feedback = await Feedback.findByPk(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    feedback.comment = comment || feedback.comment;
    feedback.pictures = pictures || feedback.pictures;
    feedback.videos = videos || feedback.videos;
    await feedback.save();

    res.status(200).json({ message: 'Feedback updated', data: feedback });
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ message: 'Error updating feedback' });
  }
};

