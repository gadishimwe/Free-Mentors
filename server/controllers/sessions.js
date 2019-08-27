/* eslint-disable radix */
import sessions from '../models/sessions';
import users from '../models/users';

exports.sessionRequest = (req, res) => {
  const user = users.find((o) => o.email === req.userData.email);
  const newSession = {
    sessionId: sessions.length + 1,
    mentorId: parseInt(req.body.mentorId),
    menteeId: user.userId,
    questions: req.body.questions,
    menteeEmail: req.userData.email,
    status: 'pending',
  };
  sessions.push(newSession);
  res.status(200).json({
    status: 200,
    data: newSession,
  });
};
exports.sessionAccept = (req, res) => {
  const session = sessions.find((o) => o.sessionId === parseInt(req.params.sessionId));
  if (!session) {
    return res.status(401).json({
      status: 401,
      error: 'This session does not exist.',
    });
  }
  if (session.status === 'accepted') {
    return res.status(401).json({
      status: 401,
      error: 'This session is already accepted',
    });
  }
  session.status = 'accepted';
  res.status(200).json({
    status: 200,
    data: session,
  });
};
