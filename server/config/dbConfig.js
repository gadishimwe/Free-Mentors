import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Connected to database...');
});

export default pool;
