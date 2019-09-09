import sessions from '../models/sessions';
import users from '../models/users';
import mentors from '../models/mentors';

export default (req, res, next) => {
  const session = sessions.find((sssn) => parseInt(req.params.sessionId, 10) === sssn.sessionId);
  const user = users.find((usr) => usr.userId === parseInt(req.userData.userId, 10));
  if (!session) {
    return res.status(404).json({
      status: 404,
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
    return res.status(400).json({
      status: 400,
      error: 'score is required,please provide it.',
    });
  }
  if (parseInt(req.body.score, 10) < 1 || parseInt(req.body.score, 10) > 5 || isNaN(req.body.score)) {
    return res.status(400).json({
      status: 400,
      error: 'score must 1 to 5, please enter valid score',
    });
  }
  if (!req.body.remark) {
    return res.status(400).json({
      status: 400,
      error: 'remark is required,please provide it.',
    });
  }
  next();
};
