const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();

// Set up EJS as templating engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Use auth routes
app.use('/auth', authRoutes);

// Home page (only accessible if logged in)
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send("Welcome to CPAN212!");
  } else {
    res.redirect('/auth/login');
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
