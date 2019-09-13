import { select } from '../helpers/sqlQuery';

export default async (req, res, next) => {
  const isMentor = await select('ismentor', 'users', `userid='${req.userData.userId}'`);  
  if (!isMentor[0].ismentor) {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden: Only Mentors can perform this operation',
    });
  }
  next();
};
