import { select } from '../helpers/sqlQuery';

export default async (req, res, next) => {
  const isSessionExist = await select('*', 'sessions', `sessionid='${req.params.sessionId}' AND menteeid='${req.userData.userId}'`);
  if (!isSessionExist[0]) {
    return res.status(404).json({
      status: 404,
      error: 'This session does not exist.',
    });
  }
  if (isSessionExist[0].status !== 'accepted') {
    return res.status(401).json({
      status: 401,
      error: 'You don\'t have a session with this mentor yet',
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
