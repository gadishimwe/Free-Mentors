/* eslint-disable radix */
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../models/users';
import mentors from '../models/mentor';

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
          email: user.email,
          user_id: user.id,
          isAdmin: user.isAdmin,
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
exports.userChangeToMentor = (req, res) => {
  const user = users.find((o) => o.userId === parseInt(req.params.userId));
  if (!user) {
    return res.status(401).json({
      status: 401,
      error: 'This user does not exist.',
    });
  }
  if (user.isMentor === true) {
    return res.status(401).json({
      status: 401,
      error: 'This user is already a mentor',
    });
  }
  const objIndex = users.findIndex((obj) => obj.userId === parseInt(req.params.userId));
  users[objIndex].isMentor = true;

  const newMentor = {
    mentorId: mentors.length + 1,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    address: user.address,
    bio: user.bio,
    occupation: user.occupation,
    expertise: user.expertise,
    isAdmin: false,
    isMentor: user.isMentor,
  };
  mentors.push(newMentor);
  res.status(200).json({
    status: 200,
    data: {
      message: 'User account changed to mentor',
    },
  });
};
exports.allMentors = (req, res) => {
  res.status(200).json({
    status: 200,
    data: mentors,
  });
};
