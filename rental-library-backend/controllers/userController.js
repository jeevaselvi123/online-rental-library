const userService = require('../services/userServices');

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.signup( email, password);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'User registration failed' });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await userService.login(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Protected route example
const profile = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const user = await userService.getUserProfile(token);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { signup, login, profile };
