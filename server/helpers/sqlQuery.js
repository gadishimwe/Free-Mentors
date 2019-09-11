import pool from '../config/dbConfig';

export const select = async (data, table, condition) => {
  const { rows } = await pool.query(`SELECT ${data} FROM ${table} WHERE ${condition};`);
  return rows[0];
};
