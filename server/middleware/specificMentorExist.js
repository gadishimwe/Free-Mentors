import mentors from '../models/mentors';

export default (req, res, next) => {
  const mentor = mentors.find((mntr) => mntr.mentorId === parseInt(req.params.mentorId, 10));
  if (!mentor) {
    return res.status(404).json({
      status: 404,
      error: 'This mentor does not exist.',
    });
  }
  next();
};
