require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.DATABASE_URL);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const contactRouter = require('./routes/contact');
app.use('/contact', contactRouter);

app.listen(8000, () => console.log('Server running on port 3000.'));
