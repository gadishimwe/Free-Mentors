import { decrypter } from '../helpers/tokenHandler';

export default (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = decrypter(token);
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized, You must login to proceed',
    });
  }
};
