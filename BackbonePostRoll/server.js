var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogroll');

var Schema = mongoose.Schema;


var LineSchema = new Schema({
	author: String,
	content: String
});


mongoose.model('Line',LineSchema);

var Line = mongoose.model('Line');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// ROUTES


app.get('/api/lines', function(req, res) {
	Line.find(function(err, docs) {
		docs.forEach(function(item) {
			console.log("Received a GET request for _id: " + item._id);
		})
		res.send(docs);
	});
});


app.post('/api/lines', function(req, res) {
	console.log('Received a POST request:')
	for (var key in req.body) {
		console.log(key + ': ' + req.body[key]);
	}
	var line = new Line(req.body);
	line.save(function(err, doc) {
		res.send(doc);
	});
});


app.delete('/api/lines/:id', function(req, res) {
	console.log('Received a DELETE request for _id: ' + req.params.id);
	Line.remove({_id: req.params.id}, function(err, doc) {
		res.send({_id: req.params.id});
	});
});


app.put('/api/lines/:id', function(req, res) {
	console.log('Received an UPDATE request for _id: ' + req.params.id);
	Line.update({_id: req.params.id}, req.body, function(err) {
		res.send({_id: req.params.id});
	});
});

var port = 3000;

app.listen(port);
console.log('server on ' + port);
