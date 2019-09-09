import pool from '../config/dbConfig';


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
  pool.end();
}).catch((err) => {
  console.log(err.message);
  process.exit(0);
});
