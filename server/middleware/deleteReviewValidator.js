import { select } from '../helpers/sqlQuery';

export default async (req, res, next) => {
  const isReviewExist = await select('*', 'reviews', `sessionid='${req.params.sessionId}'`);
  if (!isReviewExist[0]) {
    return res.status(404).json({
      status: 404,
      error: 'This review does not exist',
    });
  }
  next();
};
