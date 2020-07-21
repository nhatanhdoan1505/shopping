const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const Admin = require('../model/admin');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'email'
    }, (email, password, done) => {
      // Match user
      Admin.findOne({
        Name: email
      }).then(admin => {
        if (!admin) {
          return done(null, false, {
            message: 'That email is not true'
          });
        }

        // Match password
        bcrypt.compare(password, admin.Password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, admin);
          } else {
            return done(null, false, {
              message: 'Password incorrect'
            });
          }
        });
      });
    })
  );

  passport.serializeUser(function (admin, done) {
    done(null, admin.id);
  });

  passport.deserializeUser(function (id, done) {
    Admin.findById(id, function (err, admin) {
      done(err, admin);
    });
  });
};