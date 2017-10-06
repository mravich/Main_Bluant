// Including
var express = require("express");
var app = express();
var mysql = require('mysql');
//-----------------------------------------------------------------------------


// Data for connecting to database
var connection = mysql.createPool({
  connectionLimit : 1000,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'analyzer',
  debug    : false
});
//-----------------------------------------------------------------------------


// Function for sending queries
var sendQuery = function(query, callback) {

  // Checking connection
  connection.getConnection(function(err, connection) {

    // If there is error with connection
    if (err) {
      console.log("ERROR [#1] [Cannot connect to database]");
      //console.log(err);
      return callback(err);
    }

    // Sending query to database
    connection.query(query, function(err2, rows, fields) {

      connection.release();

      // If there is no data to preview we send warning because sometimes query
      // will not return any data
      if(typeof rows == 'undefined ' || !rows) {
        console.log("WARNING [#1] [No results from query]");
        //console.log(err2);
      }

      console.log(err2);

      // If everything is okay we return callback
      return callback(err2, rows, fields);

    });

    // If error occurs while waiting for data from database
    connection.on('error', function(err) {

      // Printing error and returning one
      console.log("ERROR [#2] [No query retured from database]");
      //console.log(err);
      return callback(err);
    });

    // DEBUG - Printing query for testing purposes
    console.log('\n--------------------[QUERY STATUS]--------------------');
    console.log('CONNECTION ID:\n\t' + connection.threadId);
    console.log('QUERY:\n\t\'' + query +'\'');
    console.log('ERROR:\n\t' + err)
    console.log('------------------[QUERY STATUS END]------------------\n');

  });
};
//-----------------------------------------------------------------------------


// Exporting functon
module.exports = {
  sendQuery: sendQuery
}
//-----------------------------------------------------------------------------
