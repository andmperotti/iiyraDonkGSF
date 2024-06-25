const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      console.log(`Attempting to find user with email: ${email.toLowerCase()}`);
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        console.log(`User not found: ${email.toLowerCase()}`);
        return done(null, false, { msg: `Email ${email} not found.` });
      }
      if (!user.password) {
        console.log(`User has no password set: ${email.toLowerCase()}`);
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' });
      }
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        console.log(`Password matched for user: ${email.toLowerCase()}`);
        return done(null, user);
      } else {
        console.log(`Invalid password for user: ${email.toLowerCase()}`);
        return done(null, false, { msg: 'Invalid email or password.' });
      }
    } catch (err) {
      console.error(`Error during authentication for user: ${email.toLowerCase()}`, err);
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => {
    console.log(`Serializing user: ${user.id}`);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      console.log(`Deserializing user: ${id}`);
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      console.error(`Error during deserialization for user: ${id}`, err);
      done(err, null);
    }
  });
};
