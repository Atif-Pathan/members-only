const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const userQueries = require('../queries/userQueries');

passport.use(
  new LocalStrategy(
    { usernameField: 'email' }, // Tell Passport to use the 'email' field from the form
    async (email, password, done) => {
      try {
        // Use your query function to find the user
        const user = await userQueries.findByEmail(email);

        // If no user is found
        if (!user) {
          return done(null, false, { message: 'Incorrect email/user.' });
        }

        // Compare the submitted password with the hashed password in the DB
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // Passwords do not match
          return done(null, false, { message: 'Incorrect password.' });
        }

        // If everything is correct, return the user object
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

// Stores the user's ID in the session cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieves the full user object from the DB based on the ID in the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userQueries.findById(id);
    done(null, user || false); // Use `false` if user is not found
  } catch (err) {
    done(err);
  }
});
