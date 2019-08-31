/* eslint-disable radix */
import users from '../models/users';
import sessions from '../models/sessions';
import mentors from '../models/mentors';

export default (req, res, next) => {
  const user = users.find((usr) => usr.email === req.userData.email);
  const mentor = mentors.find((mntr) => mntr.mentorId === parseInt(req.body.mentorId));
  const isSessionExist = sessions.find((o) => o.mentorId === parseInt(req.body.mentorId) && o.menteeId === user.userId);
  if (!req.body.mentorId) {
    return res.status(401).json({
      status: 401,
      error: 'MentorId is required. Please provide it.',
    });
  }
  if (!req.body.questions) {
    return res.status(401).json({
      status: 401,
      error: 'Questions are required. Please provide them.',
    });
  }
  if (!mentor) {
    return res.status(401).json({
      status: 401,
      error: 'Mentor you entered does not exist.',
    });
  }
  if (isSessionExist) {
    return res.status(401).json({
      status: 401,
      error: 'Session request already sent.',
    });
  }
  next();
};
