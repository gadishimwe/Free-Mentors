import { select, insert, update, deletes } from '../helpers/sqlQuery';

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
export const sessionAccept = async (req, res) => {
  const status = 'accepted';
  const acceptedSession = await update('sessions', `status='${status}'`, `sessionid='${req.params.sessionId}'`);
  acceptedSession.status = 'accepted';
  res.status(200).json({
    status: 200,
    data: acceptedSession,
  });
};
export const sessionDecline = async (req, res) => {
  const status = 'rejected';
  const rejectedSession = await update('sessions', `status='${status}'`, `sessionid='${req.params.sessionId}'`);
  rejectedSession.status = 'rejected';
  res.status(200).json({
    status: 200,
    data: rejectedSession,
  });
};
export const allSessions = async (req, res) => {
  const sessions = await select('*', 'sessions', `mentorid='${req.userData.userId}' OR menteeid='${req.userData.userId}'`);
  res.status(200).json({
    status: 200,
    data: sessions,
  });
};
export const reviewMentor = async (req, res) => {
  const session = await select('*', 'sessions', `sessionid='${req.params.sessionId}' AND menteeid='${req.userData.userId}'`);
  const user = await select('firstname, lastname', 'users', `userid='${req.userData.userId}'`);
  const newReview = {
    sessionId: parseInt(req.params.sessionId, 10),
    mentorId: session[0].mentorid,
    menteeId: session[0].menteeid,
    score: parseInt(req.body.score, 10),
    menteeFullName: `${user[0].firstname} ${user[0].lastname}`,
    remark: req.body.remark,
  };
  const rows = await insert('reviews', 'sessionId, mentorId, menteeId, score, menteeFullName, remark', '$1, $2, $3, $4, $5, $6',
    [newReview.sessionId, newReview.mentorId, newReview.menteeId, newReview.score, newReview.menteeFullName, newReview.remark]);
  res.status(200).json({
    status: 200,
    data: rows,
  });
};
export const deleteReview = async (req, res) => {
  await deletes('reviews', `sessionid='${req.params.sessionId}'`);
  res.status(200).json({
    status: 200,
    data: {
      message: 'Review successfully deleted',
    },
  });
};
