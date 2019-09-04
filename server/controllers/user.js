/* eslint-disable no-unused-expressions */
/* eslint-disable radix */
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../models/users';

dotenv.config();

const app = express();
app.use(express.json);

export const usersSignUp = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    class User {
      constructor() {
        this.userId = users.length + 1,
        this.firstName = req.body.firstName,
        this.lastName = req.body.lastName,
        this.email = req.body.email,
        this.password = hash,
        this.address = req.body.address,
        this.bio = req.body.bio,
        this.occupation = req.body.occupation,
        this.expertise = req.body.expertise,
        this.isAdmin = false,
        this.isMentor = false;
      }
    }
    const newUser = new User();
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
    users.push(new User());
    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: {
        token,
      },
    });
  });
};
export const usersSignIn = (req, res) => {
  const user = users.find((usr) => usr.email === req.body.email);
  const token = jwt.sign(
    {
      userId: user.userId,
      email: user.email,
      isAdmin: user.isAdmin,
      isMentor: user.isMentor,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '7d',
    },
  );
  res.status(200).json({
    status: 200,
    message: 'User is successfully logged in',
    data: {
      token,
    },
  });
};
