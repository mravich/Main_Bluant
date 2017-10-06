// Includes
var mysql = require('../mysql');
var fs = require('fs');
var timeAgo = require('node-time-ago');
//-----------------------------------------------------------------------------

// Function for getting right query for database (if user is logged, or not)
var userQuery = function(req) {
  // If user is not logged in
  if(typeof req.user == 'undefined') {
    // Only preview analyze that are not private
    return "SELECT * FROM scrap WHERE private=false ORDER BY date DESC, time DESC LIMIT 20;";
  // Else if user is logged in
  } else {
    // Preview not private scraps and private where user is creator of analyze
    return "SELECT * FROM scrap WHERE private=false UNION ALL SELECT * FROM scrap WHERE private=true AND id_user=" + req.user.id + " ORDER BY date DESC, time DESC LIMIT 20;";
  }
}
//------------------------------------------------------------------------------


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


// Function for reloading last analyzes table
var reloadTable = function(req, res) {

  // Creating var for saving data
  var scrap;
    htmls = [],
    https = [],
    headings = [],
    childs = [],
    picture = [];

  // Sending query for scraps
  mysql.sendQuery(userQuery(req), function(err, rows, fields) {
    scrap = rows;

    // If there is none analyzes yet
    if(scrap == '') {
      if(typeof req.user != 'undefined') {
        res.render('index', {
          content: 'tools/lastanalyzes.ejs',
          error: "No analyzes to preview !",
          user: req.user});
          return;
      } else {
        res.render('index', {
          content: 'tools/lastanalyzes.ejs',
          error: "No analyzes to preview!"});
          return;
      }
    }

    // Check if picture exists
    for(var i=0;i<scrap.length;i++) {
      if(fs.existsSync('./public/imgsnatch/' + scrap[i].id + '.png')) {
        picture[i] = true;
      } else {
        picture[i] = false;
      }
    }


    // Change scrap.time into "time-ago" format
    for(var i=0;i<scrap.length;i++) {
      var times = scrap[i].time.split(':'); // Spliting 00:00:00 format into times[0,1,2]...
      scrap[i].time = timeAgo(new Date(
          scrap[i].date.getFullYear(),
          scrap[i].date.getMonth(),
          scrap[i].date.getDate(),
          times[0], times[1], times[2]
        )
      );
    };

    // Sending query for html data
    mysql.sendQuery("SELECT id_scrap FROM htmls GROUP BY id_scrap;", function(err, rows, fields) {

      // Checking if htmls exist in database
      for(var i=0;i<scrap.length;i++) {
        var check = false;
        for(var j=0;j<rows.length;j++) {
          if(scrap[i].id == rows[j].id_scrap) {
            check = true;
            break;
          }
        }
        if(check) {
          htmls[i] = true;
        } else {
          htmls[i] = false;
        }
      }

      // Sending query for http data
      mysql.sendQuery("SELECT id_scrap FROM https GROUP BY id_scrap;", function(err, rows, fields) {

        // Checking if https exist in database
        for(var i=0;i<scrap.length;i++) {
          var check = false;
          for(var j=0;j<rows.length;j++) {
            if(scrap[i].id == rows[j].id_scrap) {
              check = true;
              break;
            }
          }
          if(check) {
            https[i] = true;
          } else {
            https[i] = false;
          }
        }
          // Sending query for headings data
          mysql.sendQuery("SELECT id_scrap FROM headings GROUP BY id_scrap;", function(err, rows, fields) {

            // Checking if headings exist in database
            for(var i=0;i<scrap.length;i++) {
              var check = false;
              for(var j=0;j<rows.length;j++) {
                if(scrap[i].id == rows[j].id_scrap) {
                  check = true;
                  break;
                }
              }
              if(check) {
                headings[i] = true;
              } else {
                headings[i] = false;
              }
            }

            // Sending query for child urls data
            mysql.sendQuery("SELECT id_scrap FROM child_urls GROUP BY id_scrap;", function(err, rows, fields) {

              // Checking if child urls exist in database
              for(var i=0;i<scrap.length;i++) {
                var check = false;
                for(var j=0;j<rows.length;j++) {
                  if(scrap[i].id == rows[j].id_scrap) {
                    check = true;
                    break;
                  }
                }
                if(check) {
                  childs[i] = true;
                } else {
                  childs[i] = false;
                }
              }

              // Checking url length
              for(var i=0;i<scrap.length;i++) {
                scrap[i].url = textLength(scrap[i].url, 64);
              }

              // If user is logged in
              if(req.isAuthenticated()) {

                // Rendering data
                res.render('index', {
                content: 'tools/lastanalyzes.ejs',
                scrap: scrap,
                htmls: htmls,
                https: https,
                heading: headings,
                childs: childs,
                picture: picture,
                user: req.user});

              // If user is not logged in
              } else {
                res.render('index', {
                content: 'tools/lastanalyzes.ejs',
                scrap: scrap,
                htmls: htmls,
                https: https,
                heading: headings,
                childs: childs,
                picture: picture,
                info: 'Guests can only preview HTTP headers, HTML tags and open graph data!'});
              }

            });
          });
        });
    });
  });

};
//-----------------------------------------------------------------------------


// Exporting
module.exports = {
  reloadTable: reloadTable
};
//-----------------------------------------------------------------------------
