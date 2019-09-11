import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import pool from '../config/dbConfig';
import { encrypter } from '../helpers/tokenHandler';
import { select } from '../helpers/sqlQuery';

dotenv.config();

const app = express();
app.use(express.json);

export const usersSignUp = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  class User {
    constructor() {
      this.firstName = req.body.firstName,
      this.lastName = req.body.lastName,
      this.email = req.body.email,
      this.password = hashedPassword,
      this.address = req.body.address,
      this.bio = req.body.bio,
      this.occupation = req.body.occupation,
      this.expertise = req.body.expertise;
    }
  }

  const newUser = new User();


  const insert = 'INSERT INTO users(firstName, lastName, email, password, address, bio, occupation, expertise) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const { rows } = await pool.query(insert,
    [newUser.firstName, newUser.lastName, newUser.email, newUser.password, newUser.address, newUser.bio, newUser.occupation, newUser.expertise]);
  const token = encrypter(rows[0].email, rows[0].userid);

  return res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: {
      token,
    },
  });
};
export const usersSignIn = (req, res) => {
  const rows = select('userid, email', 'users', `email='${req.body.email}'`);
  const token = encrypter(rows.email, rows.userid);
  res.status(200).json({
    status: 200,
    message: 'User is successfully logged in',
    data: {
      token,
    },
  });
};
