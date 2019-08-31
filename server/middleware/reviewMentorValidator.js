/* eslint-disable radix */
import sessions from '../models/sessions';
import users from '../models/users';
import mentors from '../models/mentors';

export default (req, res, next) => {
  const session = sessions.find((sssn) => parseInt(req.params.sessionId) === sssn.sessionId);
  const user = users.find((usr) => usr.userId === parseInt(req.userData.userId));
  if (!session) {
    return res.status(401).json({
      status: 401,
      error: 'This session does not exist.',
    });
  }
  const mentor = mentors.find((mntr) => mntr.mentorId === session.mentorId);
  if (session.menteeId !== user.userId || session.status !== 'accepted') {
    return res.status(401).json({
      status: 401,
      error: `You don't have a session with ${mentor.firstName}`,
    });
  }
  if (!req.body.score) {
    return res.status(401).json({
      status: 401,
      error: 'score is required,please provide it.',
    });
  }
  // eslint-disable-next-line no-restricted-globals
  if (parseInt(req.body.score) < 1 || parseInt(req.body.score) > 5 || isNaN(req.body.score)) {
    return res.status(401).json({
      status: 401,
      error: 'score must 1 to 5, please enter valid score',
    });
  }
  if (!req.body.remark) {
    return res.status(401).json({
      status: 401,
      error: 'remark is required,please provide it.',
    });
  }
  next();
};
