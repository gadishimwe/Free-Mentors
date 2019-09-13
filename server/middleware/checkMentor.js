import { select } from '../helpers/sqlQuery';

export default async (req, res, next) => {
  console.log(req.userData.userId);
  
  const isMentor = await select('ismentor', 'users', `userid='${req.userData.userId}'`);
  console.log(isMentor);
  
  if (!isMentor[0].ismentor) {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden: Only Mentors can perform this operation',
    });
  }
  next();
};
