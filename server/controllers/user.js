/* eslint-disable radix */
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../models/users';

dotenv.config();

const app = express();
app.use(express.json);

exports.usersSignUp = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }

    const newUser = {
      userId: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      address: req.body.address,
      bio: req.body.bio,
      occupation: req.body.occupation,
      expertise: req.body.expertise,
      isAdmin: false,
      isMentor: false,
    };
    console.log(newUser);

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

exports.usersSignIn = (req, res) => {
  const user = users.find((o) => o.email === req.body.email);
  bcrypt.compare(req.body.password, user.password, (err, results) => {
    if (results) {
      const token = jwt.sign(
        {
          user_id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
          isMentor: user.isMentor,
        },
        process.env.JWT_KEY,
        {
          expiresIn: '7d',
        },
      );
      return res.status(200).json({
        status: 200,
        message: 'User is successfully logged in',
        data: {
          token,
        },
      });
    }
    res.status(401).json({
      status: 401,
      error: 'Invalid email or password',
    });
  });
};
