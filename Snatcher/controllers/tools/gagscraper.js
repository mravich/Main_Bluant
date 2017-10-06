var cheerio = require('cheerio');
var request = require('request');

var getBest = function(req, res) {
  request('http://www.9gag.com', function(error, response, body) {

    var $ = cheerio.load(body);

    var points = -1;
    var link;
    var title;

    $("span").map(function() {

      if(this.attribs.class === "badge-item-love-count") {
        var string = $(this).text();
        var newstring = '';

        for(var i=0;i<string.length;i++) {
          if(string[i] != ',') {
            newstring += string[i];
          }
        }

        if(newstring > points) {
          points = newstring;
        }

      }
    });

    console.log(points);

    $("a").map(function() {

      var newlink = this.attribs.href;

      if(this.attribs.class === "badge-evt point") {

      $("span").map(function() {

        if(this.attribs.class === "badge-item-love-count") {

          var string = $(this).text();
          var newstring = '';

          for(var i=0;i<string.length;i++) {
            if(string[i] != ',') {
              newstring += string[i];
            }
          }

          if(newstring === points) {
              link = newlink;
          }


        }
      });
    }
    });
  console.log('http://www.9gag.com' + link);

    request('http://9gag.com' + link, function(error, response, body) {

      var $ = cheerio.load(body);
      $('title').map(function(){
              title = this.children[0].data;
              console.log(title);
            });
      $("link").map(function() {

        if(this.attribs.rel == 'image_src') {

          if(typeof req.user != 'undefined') {
            res.render('index', {
            content: 'tools/gagscraper.ejs',
            imglink: this.attribs.href,
            user: req.user,
            points:points,
            title:title});
          } else {
            res.render('index', {
            content: 'tools/gagscraper.ejs',
            imglink: this.attribs.href,
            points:points,
            title:title});
          }

        }
      });

    });

  });
}







// Module.exports aktiviraju da se funkcija moze includati
module.exports = {
  getBest: getBest
}
