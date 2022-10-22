require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

mongoose.connect(process.env.DATABASE_URL);

app.use(cors());

// Middleware
app.use(express.json());

// Routes
const contactRouter = require('./routes/contact');
app.use('/contact', contactRouter);

app.listen(8000, () => console.log('Server running on port 8000.'));
