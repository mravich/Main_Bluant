var express = require ('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var passport = require('passport');
var flash    = require('connect-flash');
var port     = process.env.PORT || 3000;
var IpStrategy = require('passport-ip').Strategy;

// Require imgsnatch a
//var imgsnatch = require('./controllers/tools/imgsnatch');
//imgsnatch.checkImages(); // Deleting images if image exists but is not linked to any row in database

var urlencodedParser = bodyParser.urlencoded({extended:false}); // Pretvaramo http zahtjev
app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

passport.use(new IpStrategy({
  range: '10.0.0.0/8'
}, function(profile, done){
  done(null, profile);
  //profile.id is the ip address.
}));

// required for passport
app.use(session({
	secret: '4523423rewredr132d413423',
	resave: true,
	saveUninitialized: true
 } )); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Pokrecemo program
app.listen(port);
console.log('\n-------------------[SERVER STATUS]--------------------');
console.log('SERVER STARTED !\n\tYou are listening to port: ' + port);
console.log('\n--------------------[SERVER END]----------------------');

require('./controllers/passport')(passport); // pass passport for configuration
require('./controllers/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
