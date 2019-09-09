import users from '../models/users';
import sessions from '../models/sessions';
import mentors from '../models/mentors';

export default (req, res, next) => {
  const user = users.find((usr) => usr.email === req.userData.email);
  const mentor = mentors.find((mntr) => mntr.mentorId === parseInt(req.body.mentorId, 10));
  const isSessionExist = sessions.find((o) => o.mentorId === parseInt(req.body.mentorId, 10) && o.menteeId === user.userId);
  if (!req.body.mentorId) {
    return res.status(400).json({
      status: 400,
      error: 'MentorId is required. Please provide it.',
    });
  }
  if (!req.body.questions) {
    return res.status(400).json({
      status: 400,
      error: 'Questions are required. Please provide them.',
    });
  }
  if (!mentor) {
    return res.status(404).json({
      status: 404,
      error: 'Mentor you entered does not exist.',
    });
  }
  if (isSessionExist) {
    return res.status(422).json({
      status: 422,
      error: 'Session request already sent.',
    });
  }
  next();
};
