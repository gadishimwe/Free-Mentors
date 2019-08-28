/* eslint-disable radix */
import sessions from '../models/sessions';
import users from '../models/users';
import mentors from '../models/mentors';
import reviews from '../models/reviews';

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
exports.sessionDecline = (req, res) => {
  const session = sessions.find((o) => o.sessionId === parseInt(req.params.sessionId));
  if (!session) {
    return res.status(401).json({
      status: 401,
      error: 'This session does not exist.',
    });
  }
  if (session.status === 'rejected') {
    return res.status(401).json({
      status: 401,
      error: 'This session is already rejected',
    });
  }
  session.status = 'rejected';
  res.status(200).json({
    status: 200,
    data: session,
  });
};
exports.allSessions = (req, res) => {
  if (req.userData.isMentor) {
    const mentor = mentors.find((mentr) => mentr.email === req.userData.email);
    return res.status(200).json({
      status: 200,
      data: sessions.filter((session) => session.mentorId === mentor.mentorId),
    });
  }
  res.status(200).json({
    status: 200,
    data: sessions.filter((session) => session.menteeId === parseInt(req.userData.userId)),
  });
};
exports.reviewMentor = (req, res) => {
  const session = sessions.find((sssn) => parseInt(req.params.sessionId) === sssn.sessionId);
  const user = users.find((usr) => usr.userId === parseInt(req.userData.userId));
  const newReview = {
    sessionId: parseInt(req.params.sessionId),
    mentorId: session.mentorId,
    menteeId: session.menteeId,
    score: parseInt(req.body.score),
    menteeFullName: `${user.firstName} ${user.lastName}`,
    remark: req.body.remark,
  };
  reviews.push(newReview);
  res.status(200).json({
    status: 200,
    data: newReview,
  });
};
