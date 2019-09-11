import bcrypt from 'bcrypt';
import pool from '../config/dbConfig';

export default async (req, res, next) => {
  const { rows } = await pool.query(`SELECT email, password FROM users WHERE email='${req.body.email}';`);
  if (rows.length === 0) {
    return res.status(401).json({
      status: 401,
      error: 'Invalid email or password',
    });
  }
  bcrypt.compare(req.body.password, rows[0].password, (err, userPassword) => {
    if (userPassword) {
      return next();
    }
    return res.status(401).json({
      status: 401,
      error: 'Invalid email or password',
    });
  });
};
