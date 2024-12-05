// server.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const User = require('./models/User'); // to be created in step 3
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// server.js (add these lines)
const passportConfig = require('./config/passport'); // Passport config

// Connect to MongoDB
connectDB();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.get('/', (req, res) => {
  res.send('welcome');
});

// In server.js, add signup route
app.post('/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, passwordHash: password });
    await user.save();
    res.status(201).send('User signed up');
  } catch (err) {
    res.status(400).send('Error signing up');
  }
});

// In server.js, add login route
app.post('/auth/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true // Optional, requires flash module
}));


// Add other routes later (sign-up, login)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
