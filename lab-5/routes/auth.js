const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const router = express.Router();

// In-memory user storage (for demo purposes)
let users = [];

// Passport Local Strategy
passport.use(new (require('passport-local').Strategy)((username, password, done) => {
  const user = users.find(u => u.username === username);
  if (!user) return done(null, false, { message: 'Invalid username or password' });

  bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
    if (err) return done(err);
    if (!isMatch) return done(null, false, { message: 'Invalid username or password' });

    return done(null, user);
  });
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser((username, done) => {
  const user = users.find(u => u.username === username);
  done(null, user);
});

// GET Signup Page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// POST Signup (Create a new user)
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  
  // Check if user already exists
  if (users.find(u => u.username === username)) {
    return res.send('Username already exists');
  }

  // Hash password and store user
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.send('Error hashing password');
    
    users.push({ username, passwordHash: hash });
    res.redirect('/auth/login');
  });
});

// GET Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// POST Login (Passport Authentication)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

module.exports = router;
