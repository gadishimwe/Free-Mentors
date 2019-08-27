export default (req, res, next) => {
  if (!req.userData.isMentor) {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden: Only Mentors can perform this operation',
    });
  }
  next();
};
