import { select, insert } from '../helpers/sqlQuery';

export const sessionRequest = async (req, res) => {
  const user = await select('userid', 'users', `userid='${req.userData.userId}'`);
  const mentor = await select('userid', 'users', `userid='${req.body.mentorId}'`);

  const newSession = {
    mentorId: mentor[0].userid,
    menteeId: user[0].userid,
    questions: req.body.questions,
    menteeEmail: req.userData.email,
    status: 'pending',
  };

  const session = await insert('sessions', 'mentorid, menteeid, questions, menteeEmail, status', '$1, $2, $3, $4, $5',
    [newSession.mentorId, newSession.menteeId, newSession.questions, newSession.menteeEmail, newSession.status]);
  res.status(200).json({
    status: 200,
    data: session,
  });
};
export const sessionAccept = (req, res) => {
  const sessionAcc = sessions.find((sssnA) => sssnA.sessionId === parseInt(req.params.sessionId, 10));
  sessionAcc.status = 'accepted';
  res.status(200).json({
    status: 200,
    data: sessionAcc,
  });
};
export const sessionDecline = (req, res) => {
  const sessionRej = sessions.find((sssnR) => sssnR.sessionId === parseInt(req.params.sessionId, 10));
  sessionRej.status = 'rejected';
  res.status(200).json({
    status: 200,
    data: sessionRej,
  });
};
export const allSessions = (req, res) => {
  if (req.userData.isMentor) {
    const mentor = mentors.find((mentr) => mentr.email === req.userData.email);
    return res.status(200).json({
      status: 200,
      data: sessions.filter((session) => session.mentorId === mentor.mentorId),
    });
  }
  res.status(200).json({
    status: 200,
    data: sessions.filter((session) => session.menteeId === parseInt(req.userData.userId, 10)),
  });
};
export const reviewMentor = (req, res) => {
  const session = sessions.find((sssn) => parseInt(req.params.sessionId, 10) === sssn.sessionId);
  const user = users.find((usr) => usr.userId === parseInt(req.userData.userId, 10));
  const newReview = {
    sessionId: parseInt(req.params.sessionId, 10),
    mentorId: session.mentorId,
    menteeId: session.menteeId,
    score: parseInt(req.body.score, 10),
    menteeFullName: `${user.firstName} ${user.lastName}`,
    remark: req.body.remark,
  };
  reviews.push(newReview);
  res.status(200).json({
    status: 200,
    data: newReview,
  });
};
export const deleteReview = (req, res) => {
  const review = reviews.find((rvw) => rvw.sessionId === parseInt(req.params.sessionId, 10));
  const reviewIndex = reviews.findIndex((rvw) => rvw.sessionId === review.sessionId);
  reviews.splice(reviewIndex, 1);
  res.status(200).json({
    status: 200,
    data: {
      message: 'Review successfully deleted',
    },
  });
};
