import { select } from '../helpers/sqlQuery';

export default async (req, res, next) => {
  const isSessionExist = await select('*', 'sessions', `sessionid='${req.params.sessionId}' AND mentorid='${req.userData.userId}'`);
  if (!isSessionExist[0]) {
    return res.status(404).json({
      status: 404,
      error: 'This session does not exist.',
    });
  }
  if (isSessionExist[0].status === 'accepted' || isSessionExist[0].status === 'rejected') {
    return res.status(422).json({
      status: 422,
      error: `This session is already ${isSessionExist[0].status}`,
    });
  }
  next();
};
