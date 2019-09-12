import { select } from '../helpers/sqlQuery';
import { decrypter } from '../helpers/tokenHandler';

export default async (req, res, next) => {
  const decodedToken = decrypter(req.headers.authorization);
  const rows = await select('isadmin', 'users', `email='${decodedToken.email}'`); 
  if (!rows[0].isadmin) {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden: Only Admins can perform this operation',
    });
  }
  next();
};
