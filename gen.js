var qr = require('qr-image');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/qr-code', function(req, res) {

	console.log(req.body.inputCode);

  var code = qr.image(req.body.inputCode, { type: 'svg' });
  res.type('svg');
  code.pipe(res);

});

app.listen(3000);