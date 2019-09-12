import Joi from 'joi';
import { select } from '../helpers/sqlQuery';

export default async (req, res, next) => {
  const rows = await select('email', 'users', `email='${req.body.email}'`);
  if (rows[0]) {
    return res.status(422).json({
      status: 422,
      error: 'Email already exists',
    });
  }
  const schema = {
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
    address: Joi.string().min(5).required(),
    bio: Joi.string().min(20).required(),
    occupation: Joi.string().min(5).required(),
    expertise: Joi.string().min(5).required(),

  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).json({
      status: 400,
      error: `${result.error.details[0].message}`,
    });
  }
  next();
};
