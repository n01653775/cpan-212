const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// In-memory user storage (for demo purposes)
let users = [];

// Passport Local Strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Find user by username
    const user = users.find(u => u.username === username);

    if (!user) {
      return done(null, false, { message: 'Invalid username or password' });
    }

    // Compare password hash
    bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
      if (err) return done(err);

      if (!isMatch) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      // User is authenticated
      return done(null, user);
    });
  }
));

// Serialize user to store in session
passport.serializeUser(function(user, done) {
  done(null, user.username);
});

// Deserialize user from session
passport.deserializeUser(function(username, done) {
  const user = users.find(u => u.username === username);
  done(null, user);
});
