/* eslint-disable max-len */
import bcrypt from 'bcrypt';
import pool from '../config/dbConfig';


console.log(process.env.NODE_ENV);


const createTables = `
    DROP TABLE IF EXISTS users, sessions, reviews;
    CREATE TABLE IF NOT EXISTS users(
        userid SERIAL PRIMARY KEY,
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
        mentorId INT NOT NULL,
        menteeId INT NOT NULL,
        questions VARCHAR(256) NOT NULL,
        menteeEmail VARCHAR(30) NOT NULL,
        status VARCHAR(10) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS reviews(
        sessionId INT references sessions(sessionId) ON DELETE CASCADE,
        mentorId INT NOT NULL,
        menteeId INT NOT NULL,
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
  userid: 100,
  email: 'gad@gmail.com',
  password: 'gadish123',
};
const user1 = {
  userid: 1000,
  email: 'user1@gmail.com',
  password: 'user1123',
};
// const user2 = {
//   userid: 2000,
//   email: 'user2@gmail.com',
//   password: 'user2123',
// };
const user3 = {
  userid: 3000,
  email: 'user3@gmail.com',
  password: 'user3123',
};
const user4 = {
  userid: 4000,
  email: 'user4@gmail.com',
  password: 'user4123',
};
// const user5 = {
//   userid: 5000,
//   email: 'user5@gmail.com',
//   password: 'user5123',
// };
// const user6 = {
//   userid: 6000,
//   email: 'user6@gmail.com',
//   password: 'user6123',
// };

// const mentor1 = {
//   userid: 1001,
//   email: 'mentor1@gmail.com',
//   password: 'mentor1123',
// };
// const mentor2 = {
//   userid: 2002,
//   email: 'mentor2@gmail.com',
//   password: 'mentor2123',
// };
const mentor3 = {
  userid: 3003,
  email: 'mentor3@gmail.com',
  password: 'mentor3123',
};
const mentor4 = {
  userid: 4004,
  email: 'mentor4@gmail.com',
  password: 'mentor4123',
};
// const mentor5 = {
//   userid: 5005,
//   email: 'mentor5@gmail.com',
//   password: 'mentor5123',
// };
// const mentor6 = {
//   userid: 6006,
//   email: 'mentor6@gmail.com',
//   password: 'mentor6123',
// };

const userCreater = async (userid, email, password, isAdmin, isMentor) => {
  const hashedPassword = await bcrypt.hash(`${password}`, 10);
  pool.query('INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
    [userid, `${email}`, 'Gad', 'Ishimwe', `${hashedPassword}`, 'kigali', 'I am software developer', 'coding', 'javascript', `${isAdmin}`, `${isMentor}`]);
};

userCreater(admin.userid, admin.email, admin.password, true, false);

userCreater(user1.userid, user1.email, user1.password, false, false);
// userCreater(user2.userid, user2.email, user2.password, false, false);
userCreater(user3.userid, user3.email, user3.password, false, false);
userCreater(user4.userid, user4.email, user4.password, false, false);
// userCreater(user5.userid, user5.email, user5.password, false, false);
// userCreater(user6.userid, user6.email, user6.password, false, false);

// userCreater(mentor1.userid, mentor1.email, mentor1.password, false, true);
// userCreater(mentor2.userid, mentor2.email, mentor2.password, false, true);
userCreater(mentor3.userid, mentor3.email, mentor3.password, false, true);
userCreater(mentor4.userid, mentor4.email, mentor4.password, false, true);
// userCreater(mentor5.userid, mentor5.email, mentor5.password, false, true);
// userCreater(mentor6.userid, mentor6.email, mentor6.password, false, true);

const session1 = {
  sessionId: 1000,
  mentorId: 4004,
  menteeId: 4000,
  questions: 'how can you.....?',
  menteeEmail: 'user4@gmail.com',
  status: 'pending',
};
const session2 = {
  sessionId: 2000,
  mentorId: 4004,
  menteeId: 5000,
  questions: 'how can you.....?',
  menteeEmail: 'user5@gmail.com',
  status: 'accepted',
};
const session3 = {
  sessionId: 3000,
  mentorId: 4004,
  menteeId: 6000,
  questions: 'how can you.....?',
  menteeEmail: 'user6@gmail.com',
  status: 'rejected',
};

const sessionCreater = (sessionId, mentorId, menteeId, questions, menteeEmail, status) => {
  pool.query('INSERT INTO sessions (sessionId, mentorId, menteeId, questions, menteeEmail, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [sessionId, mentorId, menteeId, questions, menteeEmail, status]);
};

sessionCreater(session1.sessionId, session1.mentorId, session1.menteeId, session1.questions, session1.menteeEmail, session1.status);
sessionCreater(session2.sessionId, session2.mentorId, session2.menteeId, session2.questions, session2.menteeEmail, session2.status);
sessionCreater(session3.sessionId, session3.mentorId, session3.menteeId, session3.questions, session3.menteeEmail, session3.status);
sessionCreater(session3.sessionId, session3.mentorId, session3.menteeId, session3.questions, session3.menteeEmail, session3.status);
