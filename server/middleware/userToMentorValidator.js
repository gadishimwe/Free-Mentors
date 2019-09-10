import users from '../models/users';

export default (req, res, next) => {
  const user = users.find((usr) => usr.userId === parseInt(req.params.userId, 10));
  if (!user) {
    return res.status(404).json({
      status: 404,
      error: 'This user does not exist.',
    });
  }
  if (user.isMentor === true) {
    return res.status(422).json({
      status: 422,
      error: 'This user is already a mentor',
    });
  }
  next();
};
