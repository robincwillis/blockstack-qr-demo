var dotenv = require('dotenv');
dotenv.load();

var path = require('path');
var express = require('express');

var app = express();

var PORT = process.env.PORT || 5000;
var ENV = process.env.NODE_ENV || 'development';
var stripeKey = process.env.STRIPE_SECRET_KEY;

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/build/index.html'));
});


var server = app.listen(PORT, function() {
	var host = server.address().address;
	console.log('Listening at https://%s:%s', host, PORT);
});