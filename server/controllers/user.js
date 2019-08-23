import express from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../models/users';

dotenv.config();

const app = express();
app.use(express.json);

exports.usersSignUp = (req, res) => {
  const user = users.find((c) => c.email === req.body.email);
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
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/),
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
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }

    const newUser = {
      userId: users.length + 1,
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      password: hash,
      address: req.body.address,
      bio: req.body.bio,
      occupation: req.body.occupation,
      expertise: req.body.expertise,
      isAdmin: false,
    };
    const token = jwt.sign(
      {
        email: newUser.email,
        userId: newUser.userId,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '7d',
      },
    );
    users.push(newUser);
    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: {
        token,
      },
    });
  });
};
