// Includes
var mysql = require('../mysql');
var fs = require('fs');
//-----------------------------------------------------------------------------


// Function for previewing statistics
var loadScrapID = function(req, res, id) {

  // If length is more than 20 characters
  if(id.length > 20) {
    // If user is logged in
    if(typeof req.user != 'undefined') {
      res.render('index',{
        content: 'tools/sitedata.ejs',
        error: 'Length of ID can not be more than 20 characters !',
        user: req.user});
    // If user is not
    } else {
      res.render('index',{
        content: 'tools/sitedata.ejs',
        error: 'Length of ID can not be more than 20 characters !'});
    }
    return;
  }

  // Loading scrap by id
  mysql.sendQuery("SELECT * FROM scrap WHERE id = '" + id + "';", function(err, rows, fields) {

    // If there is no rows in return user entered wrong ID
    if(rows == '') {
      // If user is logged in
      if(typeof req.user != 'undefined') {
        res.render('index',{
          content: 'tools/sitedata.ejs',
          error: 'There is no scrap with requested ID \"' + id + '\" !',
          user: req.user});
      // Else if user is not logged in
      } else {
        res.render('index',{
          content: 'tools/sitedata.ejs',
          error: 'There is no scrap with requested ID \"' + id + '\" !'});
      }
      return;
    }

    // If scrap is private and user is not creator of scrape
    if(rows[0].private == true) {
      // If user is logged in
      if(typeof req.user != 'undefined') {
        // If user is not creator we send err msh too
        if(req.user.id != rows[0].id_user) {
          res.render('index',{
            content: 'tools/sitedata.ejs',
            error: 'Analyze id ID \"' + id + '\" is private and can not be shown !',
            info: 'You can make your analyzes private too !',
            user: req.user});
            return;
        }
      // If user is not logged in
      } else {
        res.render('index',{
          content: 'tools/sitedata.ejs',
          error: 'Scrap with requested ID \"' + id + '\" is private and can not be shown !',
          info: 'Only registered users can make their analyzes private !',
          user: req.user});
        return;
      }
    }

    // Creating var for storing data
    var data = {
      main: '',
      https: '',
      htmls: '',
      headings: '',
      headings2: '',
      childs: '',
      picture: ''
    };

    data.main = rows;

    // If user is logged in we load everything that exists
    if(typeof req.user != 'undefined') {

      // Sending query to get http headings
      mysql.sendQuery("SELECT * FROM https WHERE id_scrap=" + id + ";", function(err, rows, fields) {
        if(rows.length > 0) data.https = rows;
        // Sending query to get html tags
        mysql.sendQuery("SELECT * FROM htmls WHERE id_scrap=" + id + ";", function(err, rows, fields) {
          if(rows.length > 0) {
            data.htmls = rows;
            if(typeof data.htmls[0].title != 'undefined') data.htmls[0].title = textLength(data.htmls[0].title, 64);
          }

            // Sending query to get headings
            mysql.sendQuery("SELECT * FROM headings WHERE id_scrap=" + id + " ORDER BY orderby;", function(err, rows, fields) {
              if(rows.length > 0) {
                data.headings = rows;
                data.headings2 = textFromValue(rows);

                for(var i=0;i<data.headings.length;i++) {
                  data.headings[i].text = textLength(data.headings[i].text, 128);
                }
              }

              // Sending query to get html tags
              mysql.sendQuery("SELECT * FROM child_urls WHERE id_scrap=" + id + ";", function(err, rows, fields) {
                if(rows.length > 0) data.childs = rows;

                // Check if picture exists to show it too
                if(fs.existsSync('./public/imgsnatch/' + id + '.png')) {
                  data.picture = '/imgsnatch/' + id + '.png';
                }

                // Previewing all
                res.render('index',{
                  content: 'tools/sitedata.ejs',
                  main: data.main,
                  https: data.https,
                  htmls: data.htmls,
                  headings: data.headings,
                  headings2: data.headings2,
                  childs: data.childs,
                  picture: data.picture,
                  user: req.user,
                  sucess: 'Data from scrap ID \"' + id + '\" loaded sucessfully !'});

              });
          });
        });
      });

    // If user is not logged in we load only few data
    } else {
      // Sending query to get http headings
      mysql.sendQuery("SELECT * FROM https WHERE id_scrap=" + id + ";", function(err, rows, fields) {
        if(rows.length > 0) data.https = rows;
        // Sending query to get html tags
        mysql.sendQuery("SELECT * FROM htmls WHERE id_scrap=" + id + ";", function(err, rows, fields) {
          if(rows.length > 0) {
            data.htmls = rows;
            if(typeof data.htmls[0].title != 'undefined') data.htmls[0].title = textLength(data.htmls[0].title, 64);
          }

            res.render('index',{
              content: 'tools/sitedata.ejs',
              main: data.main,
              https: data.https,
              htmls: data.htmls,
              childs: '',
              picture: '',
              headings: '',
              sucess: 'Data from scrap ID \"' + id + '\" loaded sucessfully !',
              info: 'Guests can preview only general data, HTTP headers and HTML tags'});
          });
      });
    }

  });
}
//-----------------------------------------------------------------------------

// Function to check text lengt and cuts it if needed
var textLength = function(string, max_len) {
  // If string is longer than max
  if (string.length > max_len-1) {
      string = string.substring(0, max_len-4) + '...';
  }
  // Returning string
  return string;
}
//-----------------------------------------------------------------------------


// Function to get text from headings value
function textFromValue(rows) {

  // New var for saving text
  var rows2 = [];

  // Creating loop for every roow
  for(var i=0;i<rows.length;i++) {

    // Checking values
    switch(rows[i].value) {
      case 0:
        rows2[i] = '<h1>';
        break;
      case 1:
        rows2[i] = '<h2>';
        break;
      case 2:
        rows2[i] = '<h3>';
        break;
      case 3:
        rows2[i] = '<h4>';
        break;
      case 4:
        rows2[i] = '<h5>';
        break;
      case 5:
        rows2[i] = '<h6>';
        break;
      case 6:
        rows2[i] = '<p>';
        break;
      case 7:
        rows2[i] = '<a>';
        break;
    }
  }

  // Returning text
  return rows2;
}
//-----------------------------------------------------------------------------


// Exporting function
module.exports = {
  loadScrapID: loadScrapID
};
//-----------------------------------------------------------------------------
