// Includes
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var flash    = require('connect-flash');
//------------------------------------------------------------------------------


// Project includes
var mysql = require('./mysql');
var lastScrapsTable = require('./tools/lastanalyzes');
var scrapEngine = require('./tools/scraper');
var showAnalyze = require('./tools/sitedata');
var homepage = require('./homepage');
var childs = require('./tools/childs');
var gagscraper = require('./tools/gagscraper');
//..............................................................................


// We export all our routes
module.exports = function(app, passport) {

	// Request for home page
	app.get('/', function(req, res) {
		// Loading homepage
		homepage.loadHomepage(req, res);
	});

	// Requests gagscraper
	app.get('/gagscraper', function(req, res) {
		// Loading homepage
		gagscraper.getBest(req, res);
	});

	// Requests about page
	app.get('/about', function(req, res) {
		if(req.isAuthenticated()) {
			res.render('index', {
				content: 'other/about.ejs',
				user: req.user});
		// If not we redirect him to start
		} else {
			res.render('index', {content: 'other/about.ejs'});
		}
	});

	// Request for login page
	app.get('/login', function(req, res) {
		// If user is logged in in we redirect him to profile
		if(req.isAuthenticated()) {
			res.redirect('/profile');
		// If not we redirect him to start
		} else {
			res.render('index', {
				content: 'user/start.ejs',
				error: req.flash('loginMessage')});
		}
	});

	// Request from user to login into his account
	app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // Redirect to his profile
    failureRedirect : '/start', // Redirect him back
    failureFlash : true // Allow flash messages
		}),
    function(req, res) {

		// If 'remember me' box is checked
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
		// Else if it is not
    } else {
      req.session.cookie.expires = false;
    }
  });

	// Processing signup
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // If signup is sucessfull redirect him to profile
		failureRedirect : '/start', // If not redirect him to start agine
		failureFlash : true
	}));

	// User requests profile
	app.get('/profile', isLoggedIn, function(req, res) {
		// If he is logged in (check with 'isLoggedIn') rendering his profile
		res.render('index', {
			content: 'user/profile.ejs',
			user : req.user, // Get user from session and pass as user
			sucess: req.flash('loginMessageW'),
			error: req.flash('loginMessage')
		});
	});

	// User logs out
	app.get('/logout', function(req, res) {
		req.logout(); // Logout user
		res.redirect('/start'); // Redirect him
	});

	// If user requests /start dir
	app.get('/start', function(req, res) {
		// If he is logged in we redirect him to his profile
		if(req.isAuthenticated()) {
			res.render('index', {
				content: 'user/profile.ejs',
				user: req.user,
				error: req.flash('loginMessage'),
				error2: req.flash('signupMessage')});
		// If he is not logged render him login/start page
		} else {
			res.render('index', {
				content: 'user/start.ejs',
				error: req.flash('loginMessage'),
				error2: req.flash('signupMessage')});
		}
	});

	// User requests to use scraper tool
	app.get('/scraper',function(req,res){
		// If user is logged in
		if(req.isAuthenticated()) {
			// Display him normal page with user
	  	res.render('index', {
				content: 'tools/scraper.ejs',
				user: req.user});
		// If user is not logged in
		} else {
			// Display hm page with info
			res.render('index', {
				content: 'tools/scraper.ejs',
				info: "Guests can only analyze HTTP headings. Login for more !"});
		}
	});

	// User starts scrapper tool
	app.post('/scraper', urlencodedParser, function(req, res) {
		// If user is logged in
	  if(req.isAuthenticated()) {
			// Scrapper for users starts
	  	scrapEngine.scrapURL(
				req.body.item,
				req.body.scrap_https,
				req.body.scrap_htmls,
				req.body.scrap_headings,
				req.body.scrap_childs,
				req.body.scrap_image,
				req.body.scrap_private,
				req.body.redirect,
				req,
				res);
		// If user is not logged in
		} else {
			// We start only simple scrapping
			scrapEngine.simpleScrapUrl(
				req.body.item,
				req.body.scrap_https,
				req.body.scrap_htmls,
				res);
		}
	});

	// User starts scrapper tool on homepage
	app.post('/scraperx', urlencodedParser, function(req, res) {
		// We start only simple scrapping
		scrapEngine.simpleScrapUrl(req.body.item, 'on', 'on', res);
	});

	// Request for sitedata tool
	app.get('/sitedata', urlencodedParser, function(req, res){
	  // If user is logged prevew without info
		if(req.isAuthenticated()) {
			res.render('index', {
				content: 'tools/sitedata.ejs',
				picture: '',
				headings: '',
				user: req.user});
		// Else preview with info
		} else {
			res.render('index', {
				content: 'tools/sitedata.ejs',
				picture: '',
				headings: '',
				info: 'Guests can only preview analyzes from other guests !'});
		}
	});

	// User runs sitedata request
	app.post('/sitedata', urlencodedParser, function(req, res) {
		// Calling functon for data preview
	  showAnalyze.loadScrapID(req, res, req.body.enterid);
	});

	// User request last analyzes tool (history)
	app.get('/lastanalyzes', urlencodedParser, function(req, res){
	  // Previewing him data
		lastScrapsTable.reloadTable(req, res);
	});

	// User requests child URLs tool
	app.get('/childs', urlencodedParser, function(req, res){
		// If user is logged in
		if(req.isAuthenticated()) {
			// We display him page
			res.render('index', {
				content: 'tools/childs.ejs',
				user: req.user});
		// Else if user is not logged in
		} else {
			//We display him error page
			res.render('index', {
				content: 'other/errorpage.ejs',
				error: 'You are not welcome here !'});
		}
	});

	// User starts childs URLs tool with ID
	app.post('/childs', urlencodedParser, function(req, res){
		// If user is logged in
		if(req.isAuthenticated()) {
			// Sending request
			childs.loadChilds(req.body.enterid, req, res);
		// Else if user is not logged in
		} else {
			//We display him error page
			res.render('index', {
				content: 'other/errorpage.ejs',
				error: 'You are not welcome here !'});
		}
	});

};
//------------------------------------------------------------------------------


// Fonction for check if user is logged in
function isLoggedIn(req, res, next) {

	// If user is logged in we continue
	if(req.isAuthenticated()) {
		return next();
	}

	// If they are not we redirect them to homepage
	res.redirect('/');
}
//------------------------------------------------------------------------------
