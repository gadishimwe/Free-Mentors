import Joi from 'joi';
import users from '../models/users';

export default (req, res, next) => {
  const user = users.find((o) => o.email === req.body.email);
  if (user) {
    return res.status(401).json({
      status: 401,
      error: 'Email already exists',
    });
  }
  const schema = {
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
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
