const pool = require('../config/database.config');

const getUserById = async (userId) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};


const createUser = async (email, hashedPassword) => {
    const query = `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING id, email;
    `;
    const values = [email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users WHERE email = $1;
  `;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const query = `
    SELECT id, name, email FROM users WHERE id = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  findUserByEmail,
  findUserById
};