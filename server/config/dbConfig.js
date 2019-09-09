import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

let pool;

if (process.env.NODE_ENV === 'development') {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
  });

  pool.on('connect', () => {
    console.log('Connected to database...');
  });
} else if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.PRODUCTION_URL,
  });

  pool.on('connect', () => {
    console.log('Connected to database...');
  });
}

export default pool;
