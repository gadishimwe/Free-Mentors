import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const encrypter = (email, userId) => {
  const token = jwt.sign({
    email,
    userId,
  },
  process.env.JWT_KEY,
  {
    expiresIn: '1h',
  });
  return token;
};

export const decrypter = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  return decodedToken;
};
