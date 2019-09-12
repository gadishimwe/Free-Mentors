import { select } from '../helpers/sqlQuery';

export default async (req, res, next) => {
  const rows = await select('userid, ismentor', 'users', `userid='${req.params.userId}' AND ismentor=${true}`);
  if (!rows[0]) {
    return res.status(404).json({
      status: 404,
      error: 'This mentor does not exist.',
    });
  }
  next();
};
