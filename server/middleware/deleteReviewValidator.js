import reviews from '../models/reviews';

export default (req, res, next) => {
  const review = reviews.find((rvw) => rvw.sessionId === parseInt(req.params.sessionId, 10));
  if (!review) {
    return res.status(404).json({
      status: 404,
      error: 'This review does not exist',
    });
  }
  next();
};
