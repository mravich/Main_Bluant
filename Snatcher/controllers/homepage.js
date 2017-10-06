// Includes
var mysql = require('./mysql');
var fs = require('fs');
//------------------------------------------------------------------------------


// Function for showing satistics on home page
var homeStatistics = function(callback) {

	// Var for saving data
	var data = {
		scraps: 0,
		users: 0,
		headings: 0,
		childs: 0,
		https: 0,
		htmls: 0,
		logins: 0,
		clength: 0,
		pictures: 0
	}

	// Sending query to get number of scraps
	mysql.sendQuery('SELECT * FROM scrap;', function(err, rows, fields) {
		data.scraps = rows.length;

		// Sending query to get number of headers
		mysql.sendQuery('SELECT * FROM headings;', function(err, rows, fields) {
			data.headings = rows.length;

			// Sending query to get number of users
			mysql.sendQuery('SELECT * FROM user;', function(err, rows, fields) {
				data.users = rows.length;

				// Sending query to get number of logins
				mysql.sendQuery('SELECT * FROM logins;', function(err, rows, fields) {
					data.logins = rows.length;

					// Sending query to get number of child urls
					mysql.sendQuery('SELECT * FROM child_urls;', function(err, rows, fields) {
						data.childs = rows.length;

						// Sending query to get number of analyzed http headers
						mysql.sendQuery('SELECT * FROM https;', function(err, rows, fields) {
							data.https = rows.length;

							// Getting total content length
							for(var i=0;i<rows.length;i++) {
								data.clength += rows[i].length;
							}

							// Getting num of pictures
  						fs.readdirSync('./public/imgsnatch/').forEach(file => {
								data.pictures++; });

							// Sending query to get number of analyzed html tags
							mysql.sendQuery('SELECT * FROM htmls;', function(err, rows, fields) {
								data.htmls = rows.length;


									// Returning data
									return callback(data);

								});

						});
					});
				});
			});
		});
	});
};
//------------------------------------------------------------------------------


// Function for rendering front page
var loadHomepage = function(req, res) {

	// Loading statistics data
	homeStatistics(function(data) {

		// Rendering data to homepage
		res.render('index', {
			content: 'other/homepage.ejs',
			data: data,
			user: req.user});
	});

};
//------------------------------------------------------------------------------


// Exporting functions
module.exports = {
	loadHomepage: loadHomepage
}
//------------------------------------------------------------------------------
