// Includes
var mysql = require('./mysql');
//------------------------------------------------------------------------------


// Showing user logins
var showLogins = function(req, res) { }
//------------------------------------------------------------------------------


// Saving new user login
var saveLogin = function(id, ip, callback) {

  // Creating and sending query
  mysql.sendQuery("INSERT INTO logins (id_user, ip, date, time) VALUES ( \
    " + id + ", \
    '" + ip + "', \
    '" + require('moment')().format('YYYY-MM-DD') + "', \
    '" + require('moment')().format('HH:mm:ss') + "');",
    function(err, rows, fields) {

    // Returning callback
    return callback(err);

  });
}
//------------------------------------------------------------------------------


// Exporting
module.exports = {
  showLogins: showLogins,
  saveLogin: saveLogin
}
//------------------------------------------------------------------------------
