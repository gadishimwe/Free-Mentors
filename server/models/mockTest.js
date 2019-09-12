import bcrypt from 'bcrypt';
import pool from '../config/dbConfig';
import { insert, update } from '../helpers/sqlQuery';


console.log(process.env.NODE_ENV);


const createTables = `
    DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE IF NOT EXISTS users(
        userId INT PRIMARY KEY,
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
        sessionId INT PRIMARY KEY,
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
  userid: 1,
  email: 'gad@gmail.com',
  password: 'gadish123',
};
const user1 = {
  userid: 2,
  email: 'user1@gmail.com',
  password: 'user1123',
};
const user2 = {
  userid: 3,
  email: 'user2@gmail.com',
  password: 'user2123',
};
const user3 = {
  userid: 4,
  email: 'user3@gmail.com',
  password: 'user3123',
};
const user4 = {
  userid: 5,
  email: 'user4@gmail.com',
  password: 'user4123',
};
const user5 = {
  userid: 6,
  email: 'user5@gmail.com',
  password: 'user5123',
};
const user6 = {
  userid: 7,
  email: 'user6@gmail.com',
  password: 'user6123',
};

const mentor1 = {
  userid: 8,
  email: 'mentor1@gmail.com',
  password: 'mentor1123',
};
const mentor2 = {
  userid: 9,
  email: 'mentor2@gmail.com',
  password: 'mentor2123',
};
const mentor3 = {
  userid: 10,
  email: 'mentor3@gmail.com',
  password: 'mentor3123',
};
const mentor4 = {
  userid: 11,
  email: 'mentor4@gmail.com',
  password: 'mentor4123',
};
const mentor5 = {
  userid: 12,
  email: 'mentor5@gmail.com',
  password: 'mentor5123',
};
const mentor6 = {
  userid: 13,
  email: 'mentor6@gmail.com',
  password: 'mentor6123',
};

const creater = async (userid, email, password, isAdmin, isMentor) => {
  const hashedPassword = await bcrypt.hash(`${password}`, 10);
  await insert('users', 'userid,email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor', '$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11',
    [userid, `${email}`, 'Gad', 'Ishimwe', `${hashedPassword}`, 'kigali', 'I am software developer', 'coding', 'javascript', `${isAdmin}`, `${isMentor}`]);
};

creater(admin.userid, admin.email, admin.password, true, false);

const users = () => {
  creater(user1.userid, user1.email, user1.password, false, false);
  creater(user2.userid, user2.email, user2.password, false, false);
  creater(user3.userid, user3.email, user3.password, false, false);
  creater(user4.userid, user4.email, user4.password, false, false);
  creater(user5.userid, user5.email, user5.password, false, false);
  creater(user6.userid, user6.email, user6.password, false, false);
};
users();

const mentors = () => {
  creater(mentor1.userid, mentor1.email, mentor1.password, false, true);
  creater(mentor2.userid, mentor2.email, mentor2.password, false, true);
  creater(mentor3.userid, mentor3.email, mentor3.password, false, true);
  creater(mentor4.userid, mentor4.email, mentor4.password, false, true);
  creater(mentor5.userid, mentor5.email, mentor5.password, false, true);
  creater(mentor6.userid, mentor6.email, mentor6.password, false, true);
};
mentors();
