import users from '../models/users';

export default (req, res, next) => {
  const user = users.find((o) => o.email === req.body.email);
  if (!user) {
    return res.status(401).json({
      status: 401,
      error: 'Invalid email or password',
    });
  }
  next();
};
