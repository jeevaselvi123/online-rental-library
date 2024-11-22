require('dotenv').config();
const express = require('express');
const body_parser = require('body-parser');
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(body_parser.json());
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use('/auth', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;