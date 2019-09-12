import { select } from '../helpers/sqlQuery';

export default async (req, res, next) => {
  const rows = await select('userid, ismentor', 'users', `userid='${req.params.userId}'`);
  if (!rows[0]) {
    return res.status(404).json({
      status: 404,
      error: 'This user does not exist.',
    });
  }
  if (rows[0].ismentor === true) {
    return res.status(422).json({
      status: 422,
      error: 'This user is already a mentor',
    });
  }
  next();
};
