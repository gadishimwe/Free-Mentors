import bcrypt from 'bcrypt';
import pool from '../config/dbConfig';
import { insert, update } from '../helpers/sqlQuery';


console.log(process.env.NODE_ENV);


const createTables = `
    DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE IF NOT EXISTS users(
        userId SERIAL PRIMARY KEY,
        email VARCHAR(30) UNIQUE NOT NULL,
        firstName VARCHAR(20) NOT NULL,
        lastName VARCHAR(20) NOT NULL,
        password VARCHAR(256) NOT NULL ,
        address VARCHAR(50),
        bio VARCHAR(256) NOT NULL,
        occupation VARCHAR(50),
        expertise VARCHAR(50),
        isAdmin BOOLEAN DEFAULT FALSE,
        isMentor BOOLEAN DEFAULT FALSE
    );
    CREATE TABLE IF NOT EXISTS sessions(
        sessionId SERIAL PRIMARY KEY,
        mentorId INT references users(userId) ON DELETE CASCADE,
        menteeId INT references users(userId) ON DELETE CASCADE,
        questions VARCHAR(256) NOT NULL,
        menteeEmail VARCHAR(30) UNIQUE NOT NULL,
        status VARCHAR(10) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS reviews(
        sessionId INT references sessions(sessionId) ON DELETE CASCADE,
        mentorId INT references users(userId) ON DELETE CASCADE,
        menteeId INT references users(userId) ON DELETE CASCADE,
        score INT NOT NULL,
        menteeFullName VARCHAR(40) NOT NULL,
        remark VARCHAR(256) NOT NULL
    );
  `;

pool.query(createTables).then(() => {
console.log('Tables created');

}).catch((err) => {
  console.log(err.message);
  process.exit(0);
});

const admin = {
  email: 'gad@gmail.com',
};
const user1 = {
  email: 'user1@gmail.com',
  password: 'user1123',
};
const user2 = {
  email: 'user2@gmail.com',
  password: 'user2123',
};
const mentor1 = {
  email: 'mentor1@gmail.com',
  password: 'mentor1123',
};

const creater = async (email, password, isAdmin, isMentor) => {
  const hashedPassword = await bcrypt.hash(`${password}`, 10);
  await insert('users', 'email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor', '$1, $2, $3, $4, $5, $6, $7, $8, $9, $10',
    [`${email}`, 'Gad', 'Ishimwe', `${hashedPassword}`, 'kigali', 'I am software developer', 'coding', 'javascript', `${isAdmin}`, `${isMentor}` ]);
};

creater(admin.email, admin.password, true, false);
creater(user1.email, user1.password, false, false);
creater(user2.email, user2.password, false, false);
creater(mentor1.email, mentor1.password, false, true);
