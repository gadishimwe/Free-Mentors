export default (req, res, next) => {
  if (!req.userData.isAdmin) {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden: Only Admins can perform this operation',
    });
  }
  next();
};
