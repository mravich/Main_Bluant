// Includes
var LocalStrategy   = require('passport-local').Strategy;
var mysql = require('./mysql');
var users = require('./users');
//------------------------------------------------------------------------------


// Creating exported function
module.exports = function(passport) {

  // Used to serialize user with session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Used to deserialize the user
  passport.deserializeUser(function(id, done) {
    mysql.sendQuery("SELECT * FROM user WHERE id =" + id + ";", function(err, rows){
      done(err, rows[0]);
    });
  });

  // For user signup
  passport.use('local-signup',
    new LocalStrategy({ // Defining user data
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true // Allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

    // Checking if username already exists
    mysql.sendQuery("SELECT * FROM user WHERE username = '" + username + "';", function(err, rows) {
      if(err) {
        return done(err);
      }

      // Checking if password is too short
      if(password.length < 5) {
        return done(null, false, req.flash('signupMessage', 'Your password must contain at least 5 characters !'));
      }

      // Check if username is too short
      if(username.length < 5) {
        return done(null, false, req.flash('signupMessage', 'Your username must contain at least 5 characters !'));
      }

      // If rows is not false it means username is already taken
      if (rows.length) {
        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));

      // If rows are false
      } else {

        // Creating the user
        var newUserMysql = {
          username: username,
          password: password};

        // Inserting new user into database
        mysql.sendQuery("INSERT INTO user (username, password) VALUES ('" + newUserMysql.username + "', MD5('" + newUserMysql.password + "'));",
          function(err, rows) {

          // Saving PRIMARY_KEY AUTO_INCREMENT 'id' value
          newUserMysql.id = rows.insertId;

          // Returning newly created user
          return done(null, newUserMysql);
        });
      }
    });
  }));

  // User login
  passport.use('local-login',
    new LocalStrategy({ // Defining user data
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true //Allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

    // Sending query to search for username
    mysql.sendQuery("SELECT * FROM user WHERE username = '" + username + "' AND password=MD5('" + password + "');", function(err, rows) {

      // If error occurs
      if (err) {
        return done(err);
      }

      // If there is no selected username in database
      if (!rows.length) {
        return done(null, false, req.flash('loginMessage', 'Username and password do not match !'));
      }

      // Geting users IP
      var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      // If all is well, return successful user
      users.saveLogin(rows[0].id, req.connection.remoteAddress, function(err) {

        // If there is no error while saving user login
        if(!err) {
          return done(null, rows[0], req.flash('loginMessageW', 'Login saved sucessfully !'));
        // Else if error happens
        } else {
          return done(null, rows[0], req.flash('loginMessage', 'Login not saved !'));
        }
      });
    });
  }));

};
//------------------------------------------------------------------------------
