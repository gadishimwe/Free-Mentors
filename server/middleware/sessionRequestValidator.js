/* eslint-disable radix */
import users from '../models/users';
import sessions from '../models/sessions';

export default (req, res, next) => {
  const user = users.find((o) => o.email === req.userData.email);
  const isSessionExist = sessions.find((o) => o.mentorId === parseInt(req.body.mentorId) && o.menteeId === user.userId);
  if (isSessionExist) {
    return res.status(401).json({
      status: 401,
      error: 'Session request already sent.',
    });
  }
  if (!req.body.questions) {
    return res.status(401).json({
      status: 401,
      error: 'Questions are required. Please provide them.',
    });
  }
  if (!req.body.mentorId) {
    return res.status(401).json({
      status: 401,
      error: 'mentorId is required. Please provide it.',
    });
  }
  if (!req.body.questions) {
    return res.status(401).json({
      status: 401,
      error: 'Questions are required. Please provide them.',
    });
  }
  next();
};
