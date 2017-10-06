// Includes
var cheerio = require('cheerio');
var request = require('request');
var mysql = require('../mysql');
var fs = require('fs');
var timeAgo = require('node-time-ago');
var screenshot = require('url-to-image');
//------------------------------------------------------------------------------


// Function for web page scrapping
var scrapURL = function(
  url,
  scrap_https,
  scrap_htmls,
  scrap_headings,
  scrap_childs,
  scrap_image,
  scrap_private,
  redirect,
  req,
  res) {

  // If user does not check any box
  if(!scrap_https && !scrap_htmls && !scrap_headings && !scrap_childs && !scrap_image) {
    res.render('index', {
      content: 'tools/scraper.ejs',
      error: 'You need to analyze at least one parameter!',
      user: req.user});
    return;
  }

  // Preparing data var
  var data = {
    // HTTP headers
    status: -1,
    length: -1,
    type: '',
    server: '',
    // HTML tags
    title: '',
    charset: '',
    // OG pen Graph
    // Other
    date: '',
    time: '',
    id_user: 0
  };
console.log('Varijabla redirect: ' + redirect);
  function redirs(){
      var maxRedirs = 5;
      if(redirect == 'on'){
          return {
              followRedirs: true,
              followAll: true,
              maxredirs: maxRedirs
          };
      }
      else {
          return {
              followRedirs: false,
              followAll: false,
              maxredirs: maxRedirs
          };
      }
  }
  var redirs2 = redirs();
  console.log('Follow Redirects: ' + redirs2.followRedirs);
  console.log('Follow ALL Redirects: ' + redirs2.followAll);
  console.log('Max Redirects: ' + redirs2.maxredirs);

  // Sending request
  request(options = { url: url, followRedirect: redirs2.followRedirs, followAllRedirects: redirs2.followAll, maxRedirects: redirs2.maxredirs}, function(error, response, body) {

      console.log('Follow Redirects: ' + redirs2.followRedirs);
      console.log('Follow ALL Redirects: ' + redirs2.followAll);
      console.log('Max Redirects: ' + redirs2.maxredirs);

    //Body se loada u cheerio module
    var $ = cheerio.load(body);

    // If error happens
    if(error) {
      res.render('index', {
        content: 'tools/scraper.ejs',
        error: 'Error happened while analyzing URL!',
        user: req.user});
      return;
    }

    // If status code is between 301 and 400
    if (response.statusCode >= 301 && response.statusCode <= 400) {
        console.log('No Redirect Allowed!');
        startRedirScrape(req, res, url, response, $);
        return;

    } else {
        console.log('Found, or redirected!');
        startBaseScrape(
          req,
          res,
          data,
          url,
          scrap_https,
          scrap_htmls,
          scrap_headings,
          scrap_childs,
          scrap_image,
          scrap_private,
          $,
          response);
  }
});
};
//-----------------------------------------------------------------------------

// Function basic scrapping
var startBaseScrape = function(
  req,
  res,
  data,
  url,
  scrap_https,      //
  scrap_htmls,      //
  scrap_headings,
  scrap_childs,     // //
  scrap_image,      // //
  scrap_private,    // //
  $,
  response) {

    // Loading data
    // Creating var for data storing
    var data = {
      https: {len: 0, type: '', server: ''},
      htmls: {title: '', charset: ''},
      userid: 0,
      private: 0
    };

    // If scrap https is clicked
    if(scrap_https) {
      data.https.len = response.headers['content-length'];
      data.https.type = response.headers['content-type'];
      data.https.server = response.headers['server'];
      if(data.https.len === undefined) data.https.len = 0;
      if(data.https.type === undefined) data.https.type = '';
      if(data.https.server === undefined) data.https.server = '';
    }

    // If user selected html tags too
    if(scrap_htmls) {
      data.htmls.title = $('title').text();

      $('meta').map(function() { // Map every meta
        if(typeof this.attribs.charset != 'undefined') { // If charset exists
          data.htmls.charset = this.attribs.charset; // Save it
        }
      });

      if(data.htmls.title === undefined) data.htmls.title = '';
      if(data.htmls.charset === undefined) data.htmls.charset = '';
    }

    if(typeof req.user != 'undefined') data.userid = req.user.id;
    if(scrap_private) data.private = true;

    // Sending query to database
    mysql.sendQuery("INSERT INTO scrap (url,id_user,status,date,time,private) VALUES ( \
      '" + url + "', \
      " + data.userid + ", \
      " + response.statusCode + ", \
      '" + require('moment')().format('YYYY-MM-DD') + "', \
      '" + require('moment')().format('HH:mm:ss') + "', \
      " + data.private + ");",
      function(err, rows, fields) {

        // If error happend while writing to database
        if(err) {
          res.render('index', {
            content: 'tools/scraper.ejs',
            error: 'Error happened while writing analyze to database!',
            user: req.user});
            return;
        }

        // If image scrape is selected we scrape image of site
        if(scrap_image) {
          screenshot(url, './public/imgsnatch/' + rows.insertId + '.png').done(function() {});
        }

        // If http checkbox is clicked go sending query
        if(scrap_https) {
        mysql.sendQuery("INSERT INTO https (id_scrap,length,type,server) VALUES ( \
          '" + rows.insertId + "', \
          '" + data.https.len + "', \
          '" + textLength(data.https.type, 24) + "', \
          '" + textLength(data.https.server, 128) + "');",
          function(){});
        }

        // If html checkbox is clicked go sending query
        if(scrap_htmls) {
        mysql.sendQuery("INSERT INTO htmls (id_scrap,title,charset) VALUES ( \
          '" + rows.insertId + "', \
          '" + textLength(data.htmls.title, 128) + "', \
          '" + textLength(data.htmls.charset, 24) + "');",
          function(){});
        }

        // If scrape child urls is selected
        if(scrap_childs) {
          scrapeRedirects(rows.insertId, $);
        }

        // Sending query to get back data from databse
        mysql.sendQuery("SELECT * FROM scrap WHERE id=" + rows.insertId + ";",
          function(err2, rows2, fields2) {

            // If error happens while reading from base
          if(err2) {
            res.render('index', {
              content: 'tools/scraper.ejs',
              error: 'Error happened while reading analyze to database!',
              user: req.user});
              return;
          }

          // Scrapping headings
          scrapHeadings($, rows, rows2, scrap_headings, req, res, function(rowsx) {

            var heads = scrap_headings;
            if(!heads) heads = false;
            var urlchild = scrap_childs;
            if(!urlchild) urlchild = false;

            // Preparing picture object witch tells if picture of scrap exists
            var picture = [];
            if(fs.existsSync('./public/imgsnatch/' + rows2[0].id + '.png')) {
              picture[0] = true;
            } else {
              picture[0] = false;
            }

            // Change rows.time into "time-ago" format
            for(var i=0;i<rows2.length;i++) {
              var times = rows2[i].time.split(':'); // Spliting 00:00:00 format into times[]...
              rows2[i].time = timeAgo(new Date(
                  rows2[i].date.getFullYear(),
                  rows2[i].date.getMonth(),
                  rows2[i].date.getDate(),
                  times[0], times[1], times[2]
                )
              );
            }

            var yours = [];
            for(var i=0;i<rows2.length;i++) {
              if(rows2[i].id_user == req.user.id) {
                yours[i] = true;
              } else {
                yours[i] = false;
              }
            }

            var anonim = [];
            for(var i=0;i<rows2.length;i++) {
              if(rows2[i].id_user === 0) {
                anonim[i] = false;
              } else {
                anonim[i] = true;
              }
            }

            // If there is picture scraped too we send warning
            res.render('index', {
                content: 'tools/scraper.ejs',
                sucess: 'Analyze of URL \"' + url + '\" and ID \"' + rows2[0].id + '\" has completed sucessfully !',
                scrap_https: scrap_https,
                scrap_htmls: scrap_htmls,
                scrap_childs: scrap_childs,
                scrap_headings: scrap_headings,
                sucscr: rows2,
                headers: rowsx,
                picture: picture,
                yours: yours,
                anonim: anonim,
                child: urlchild,
                heading: heads,
                user: req.user});


          });
        });
    });
};
//------------------------------------------------------------------------------

// Function for scrapping data from redirected page
var startRedirScrape = function(req, res, url, response, $){

  // Sending query
  mysql.sendQuery("INSERT INTO scrap (url,id_user,status,date,time) VALUES ( \
    '" + url + "', \
    " + req.user.id + ", \
    " + response.statusCode + ", \
    '" + require('moment')().format('YYYY-MM-DD') + "', \
    '" + require('moment')().format('HH:mm:ss') + "');",
    function(err, rows, fields) {

    // If error happend while writing to database
    if(err) {
      res.render('index', {
        content: 'tools/scraper.ejs',
        error: 'Error happened while writing analyze to database!',
        warn: 'URL returned status code witch is not 200!',
        user: req.user});
        return;
    }

    // Sending query to get back data from databse
    mysql.sendQuery("SELECT * FROM scrap WHERE id=" + rows.insertId + ";",
      function(err2, rows2, fields2) {

      // If error happens while reading from base
      if(err2) {
        res.render('index', {
          content: 'tools/scraper.ejs',
          error: 'Error happened while reading analyze to database!',
          warn: 'URL returned status code \"' + data.http_status + '\"!',
          user: req.user});
          return;
      }

      // If everything works
      res.render('index', {
        content: 'tools/scraper.ejs',
        sucess: 'Analyze of URL \"' + url + '\" and ID \"' + rows2[0].id + '\" has completed sucessfully!',
        warn: 'URL returned status code witch is not 200!',
        user: req.user});
        return;
    });
  });
};
//------------------------------------------------------------------------------

// Function for scrap headings from URL
var scrapHeadings = function($, rows5, rows, headings, req, res, callback) {

  // If headings are not checked to scrap dont do anything
  if(!headings) {
    return callback();
  }

  // Counter so we know value of next query because as we insert them we will
  // later read them by order as we saved them using count
  var count = 0;

  // Head of the query
  var query = "INSERT INTO headings (id_scrap,text,value,orderby) VALUES ";

  // For every * we do
  $("*").map(function() {

      // Getting name of this (h1,h2,p,a...) and refer it as value
      var hValue = headerToValue(this.name);

      // If value is usable (1,2,3,4...) but not -1
      if(hValue != -1) {

        // Getting and checking text and saving for database query
        var hText = $(this).text();
        hText = checkHeaderText(hText);
        query += "(" + rows[0].id + ",'" + textLength(hText, 512) + "'," + hValue + "," + count + "),\n";
        count++;

        // If hValue is 7 it means this heading is link from a
        // example (<a href='link here') so we check and save it
        if(hValue == 7) {

          // Change this.attrigs.href to string
          var nes = '' + this.attribs.href + '';

          // If href doesnt have two dots it cant be link
          // Maybe it can but this is good filter for bad links
          if(countChars(nes, '.') < 2) {
              nes = '';
          }

          // If somewhere in string there is ' char string is deleted
          // ' char in link causes error while executing query
          for(var i=0;i<nes.length;i++) {
            if(nes[i] == '\'') {
              nes = '';
              break;
            }
          }

          // Sending href to database
          query += "(" + rows[0].id + ",'" + textLength(nes, 512) + "'," + 8 + "," + count + "),\n";
          count++;

        }
      }
  });

  // Formating query that last char , is replaced with ;
  query = query.substring(0, query.length - 2);

  // Sending query, finally ! :)
  mysql.sendQuery(query + ';', function(err, rows2, fields){

    // Returning rows
    return callback(rows2);
  });
};
//------------------------------------------------------------------------------

// Function for start scrapping every redirect and saving it into child_scrap
// This saves only URL-s and not data, user can later scrap data
var scrapeRedirects = function(id, $) {

  // Var for remembering urls before saving into database
  var data = [];

  // Count will count how much data exists
  var count = 0;

  // Head of the query
  var query = "INSERT INTO child_urls (id_scrap,url) VALUES ";

  // Function to map every a from $ (body)
  $("a").map(function() {

    // Getting url from <a>
    var url = '' + this.attribs.href + '';

    // If length is over 127 we skip
    if (url.length > 127) {
      url = '';
    }

    // If href doesnt have two dots it cant be link
    // Maybe it can but this is good filter for bad links
    if(countChars(url, '.') < 2) {
      url = '';
    }

    // If first letter is # or / we discard it too
    if(url[0] === '#' || url[0] === '/') {
      url = '';
    }

    // If somewhere in string there is ' char string is deleted
    // ' char in link causes error while executing query
    for(var i=0;i<url.length;i++) {
      if(url[i] == '\'') {
        url = '';
        break;
      }
    }

    // If url is longer than 2 chars and is does not already exists in data
    var exists = false;
    if(url.length > 2) {
      for(var i=0;i<count;i++) {
        if(data[i] === url) {
          exists = true;
          break;
        }
      }
    }

    // If url does not exists we save it into var for later database insertion
    if(!exists && url.length > 5) {
      data[count] = url;
      count++;
    }
  });

  // Creating query
  for(var i=0;i<data.length;i++) {
    // Saving each data to query
    query += "(" + id + ",'" + data[i] + "'),\n";
  }

  // Formating query that last char , is replaced with ;
  query = query.substring(0, query.length - 2);

  // Sending query, finally ! :)
  mysql.sendQuery(query + ';', function(err, rows2, fields) {});

};
//------------------------------------------------------------------------------

// Function for guests to scrape some URL, guests can only scrape HTML tags from given URL
var simpleScrapUrl = function(url, scrap_https, scrap_htmls, res) {

  // If user does not check any box
  if(!scrap_https && !scrap_htmls) {
    res.render('index', {
      content: 'tools/scraper.ejs',
      error: 'You need to analyze at least one parameter!'});
    return;
  }

  // Sending request to URL
  request(url, function(error, response, body) {

    // If error happens
    if(error) {
      res.render('index', {
        content: 'tools/scraper.ejs',
        error: 'Error happened while analyzing URL!'});
      return;
    }

    // If status code is not 200 - OK
    if(response.statusCode != 200) {
      res.render('index', {
        content: 'tools/scraper.ejs',
        error: 'Status code of given URL is not 200!',
        info: 'Login for advanced URL analyzing options!'});
      return;
    }

    // Creating var for data storing
    var data = {
      https: {len: 0, type: '', server: ''},
      htmls: {title: '', charset: ''}
    };

    // Loading body and data
    var $ = cheerio.load(body);

    // If scrap https is clicked
    if(scrap_https) {
      data.https.len = response.headers['content-length'];
      data.https.type = response.headers['content-type'];
      data.https.server = response.headers['server'];
      if(data.https.len === undefined) data.https.len = 0;
      if(data.https.type === undefined) data.https.type = '';
      if(data.https.server === undefined) data.https.server = '';
    }

    // If user selected html tags too
    if(scrap_htmls) {
      data.htmls.title = $('title').text();

      $('meta').map(function() { // Map every meta
        if(typeof this.attribs.charset != 'undefined') { // If charset exists
          data.htmls.charset = this.attribs.charset; // Save it
        }
      });

      if(data.htmls.title === undefined) data.htmls.title = '';
      if(data.htmls.charset === undefined) data.htmls.charset = '';
    }

    // Saving into database
    mysql.sendQuery("INSERT INTO scrap (url,date,time,status) VALUES ( \
      '" + textLength(url, 512) + "', \
      '" + require('moment')().format('YYYY-MM-DD') + "', \
      '" + require('moment')().format('HH:mm:ss') + "', \
      200);",
      function(err, rows, fields) {

      // If there is error happened
      if(err) {
        res.render('index', {
          content: 'tools/scraper.ejs',
          error: 'Something went wrong with inserton of analyze into database!'});
        return;
      }

      // If http checkbox is clicked go sending query
      if(scrap_https) {
      mysql.sendQuery("INSERT INTO https (id_scrap,length,type,server) VALUES ( \
        '" + rows.insertId + "', \
        '" + data.https.len + "', \
        '" + textLength(data.https.type, 24) + "', \
        '" + textLength(data.https.server, 128) + "');",
        function(){});
      }

      // If html checkbox is clicked go sending query
      if(scrap_htmls) {
      mysql.sendQuery("INSERT INTO htmls (id_scrap,title,charset) VALUES ( \
        '" + rows.insertId + "', \
        '" + textLength(data.htmls.title, 128) + "', \
        '" + textLength(data.htmls.charset, 24) + "');",
        function(){});
      }

      // If everything is okay send query to get data
      mysql.sendQuery("SELECT * FROM scrap WHERE id=" + rows.insertId + ";",
      function(err, rows, fields) {

        // If there is error happened
        if(err) {
          res.render('index', {
            content: 'tools/scraper.ejs',
            error: 'Something went wrong with reading analyze from database!'});
          return;
        }

        // Change rows.time into "time-ago" format
        for(var i=0;i<rows.length;i++) {
          var times = rows[i].time.split(':'); // Spliting 00:00:00 format into times[]...
          rows[i].time = timeAgo(new Date(
              rows[i].date.getFullYear(),
              rows[i].date.getMonth(),
              rows[i].date.getDate(),
              times[0], times[1], times[2]
            )
          );
        }

        // Displaying scraper
        res.render('index', {
          content: 'tools/scraper.ejs',
          sucess: 'Analyze of URL \"' + url + '\" and ID \"' + rows[0].id + '\" has completed sucessfully!',
          info: 'For more advanced options please login!',
          sucscr: rows,
          scrap_https: scrap_https,
          scrap_htmls: scrap_htmls});
      });
    });
  });
};
//------------------------------------------------------------------------------

// Function to count number of specific character in substring
var countChars = function(string, char) {
  var counter = 0;
  for(var i=0;i<string.length;i++) {
    if(string[i] == char) {
      counter++;
    }
  }
  return counter;
};
//------------------------------------------------------------------------------

// Function for returning value of h*,a,p (h1,h2...a,p..) like h1 = 0, h2 = 1...
var headerToValue = function(header) {
    switch (header) {
        case 'h1':
            return 0;
        case 'h2':
            return 1;
        case 'h3':
            return 2;
        case 'h4':
            return 3;
        case 'h5':
            return 4;
        case 'h6':
            return 5;
        case 'p':
            return 6;
        case 'a':
            return 7;
        default:
            return -1;
    }
};
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


// Function for checking text in headings
var checkHeaderText = function(text) {
    var newText = ''; // Here we will save char by char

    // If text is longr than 127 we will cut it and place dots
    if (text.length > 127) {
        text = text.substring(0, 124) + '...';
    }

    // For each char we check if it is allowed
    for (var i = 0; i < text.length; i++) {

        // Sending text[i] for check for every char in string
        revalidCharacter(text[i], function(char) {

            // If it is not false or true it needs to be changed
            // with callback letter ("char")
            if (char !== false && char !== true) {
                newText += char;

            // If it is allowed to use (true) we just copy it
        } else if (char === true) {
                newText += text[i];
            }
        });
    }

    // Returning new string witch will be saved to database
    return newText;
};
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// Function to check ig char can be used
/* CALLBACK DATA:
      false - char wont be used, it will be deleted
      true - char can be used
      '%' - char will be replaced with char %
*/
var revalidCharacter = function(char, callback) {
    switch (char) {
        // Numbers
        case '0':
            return callback(true);
        case '1':
            return callback(true);
        case '2':
            return callback(true);
        case '3':
            return callback(true);
        case '4':
            return callback(true);
        case '5':
            return callback(true);
        case '6':
            return callback(true);
        case '7':
            return callback(true);
        case '8':
            return callback(true);
        case '9':
            return callback(true);
        // Chars
        case 'a':
            return callback(true);
        case 'b':
            return callback(true);
        case 'c':
            return callback(true);
        case 'd':
            return callback(true);
        case 'e':
            return callback(true);
        case 'f':
            return callback(true);
        case 'g':
            return callback(true);
        case 'h':
            return callback(true);
        case 'i':
            return callback(true);
        case 'j':
            return callback(true);
        case 'k':
            return callback(true);
        case 'l':
            return callback(true);
        case 'm':
            return callback(true);
        case 'n':
            return callback(true);
        case 'o':
            return callback(true);
        case 'p':
            return callback(true);
        case 'r':
            return callback(true);
        case 's':
            return callback(true);
        case 't':
            return callback(true);
        case 'u':
            return callback(true);
        case 'v':
            return callback(true);
        case 'z':
            return callback(true);
        case 'w':
            return callback(true);
        case 'y':
            return callback(true);
        case 'A':
            return callback(true);
        case 'B':
            return callback(true);
        case 'C':
            return callback(true);
        case 'D':
            return callback(true);
        case 'E':
            return callback(true);
        case 'F':
            return callback(true);
        case 'G':
            return callback(true);
        case 'H':
            return callback(true);
        case 'I':
            return callback(true);
        case 'J':
            return callback(true);
        case 'K':
            return callback(true);
        case 'L':
            return callback(true);
        case 'M':
            return callback(true);
        case 'N':
            return callback(true);
        case 'O':
            return callback(true);
        case 'P':
            return callback(true);
        case 'R':
            return callback(true);
        case 'S':
            return callback(true);
        case 'T':
            return callback(true);
        case 'U':
            return callback(true);
        case 'V':
            return callback(true);
        case 'Z':
            return callback(true);
        case 'W':
            return callback(true);
        case 'Y':
            return callback(true);
        case 'Q':
            return callback(true);
        case 'q':
            return callback(true);
        // Special chars
        case 'č':
            return callback('c');
        case 'Č':
            return callback('C');
        case 'ć':
            return callback('c');
        case 'Ć':
            return callback('C');
        case 'đ':
            return callback('d');
        case 'Đ':
            return callback('D');
        case 'ž':
            return callback('z');
        case 'Ž':
            return callback('Z');
        case 'š':
            return callback('s');
        case 'Š':
            return callback('S');
        // Other
        case ' ':
            return callback(true);
        case ':':
            return callback(true);
        case '.':
            return callback(true);
        case '(':
            return callback(true);
        case ')':
            return callback(true);
        // If char is not find it is not allowed to be used
        default:
            return callback(false);
    }
};
//-----------------------------------------------------------------------------

// Exporting
module.exports = {
    scrapURL: scrapURL,
    simpleScrapUrl: simpleScrapUrl
};
//-----------------------------------------------------------------------------
