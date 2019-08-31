import bcrypt from 'bcrypt';
import users from '../models/users';

export default (req, res, next) => {
  const user = users.find((o) => o.email === req.body.email);
  if (!user) {
    return res.status(401).json({
      status: 401,
      error: 'Invalid email or password',
    });
  }
  bcrypt.compare(req.body.password, user.password, (err, userPassword) => {
    if (userPassword) {
      return next();
    }
    return res.status(401).json({
      status: 401,
      error: 'Invalid email or password',
    });
  });
};
