const pool = require('../config/database.config');

const getUserById = async (userId) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};


const createUser = async (email, hashedPassword, name=null, phone=null, address=null) => {
  if (!email || !hashedPassword) {
    throw new Error('Invalid input data');
  }
  const query = `
  INSERT INTO users (email, password_hash, name, address, phone_number)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id, email, name, address, phone_number;
`;

const values = [email, hashedPassword, name, address, phone];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query:', {
      message: error.message,
      stack: error.stack,
      detail: error.detail, // PostgreSQL-specific error detail
    });
    throw new Error('Database query failed');
  }
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