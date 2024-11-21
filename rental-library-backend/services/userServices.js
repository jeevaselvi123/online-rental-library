const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const signup = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const user = await userModel.createUser( email, hashedPassword);
  return user;
};

const login = async (email, password) => {
  const user = await userModel.findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
  return { token, user: { id: user.id, name: user.name, email: user.email } };
};

const getUserProfile = async (token) => {
  const decoded = jwt.verify(token, 'secret_key');
  const user = await userModel.findUserById(decoded.id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = {
  signup,
  login,
  getUserProfile,
};