require("babel-polyfill");

var fs = require('fs');
var path = require('path');
var qr = require('qr-image');
var brandedQR = require('branded-qr-code');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

const PORT = 3000;
const ASSET_PATH = '/assets';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(ASSET_PATH, express.static('public'))

const writeCodesToDisk = (value) => {

	const name = 'unbranded';
	const pngPath = path.resolve(__dirname, `./public/output/${name}.png`);
	const svgPath = path.resolve(__dirname, `./public/output/${name}.svg`);

	var svg = qr.image(value, {
		type: 'svg'
		//ec_level : error correction level. One of L, M, Q, H. Default M.
	}).pipe(
    fs.createWriteStream(svgPath)
	);

	var png = qr.image(value, {
		type: 'png',
		margin : 2
		//size : size of one module in pixels. Default 5
	}).pipe(
    fs.createWriteStream(pngPath)
	);

}

app.post('/branded-qr-code', (req, res) => {

	const name = 'branded';
	const logo = path.resolve(__dirname, './public/input/logo-5.png');
	const destination = path.resolve(__dirname, `./public/output/${name}.png`);

	brandedQR.generate({
		text : req.body.inputCode,
		path : logo,
		ratio : 4,
		opt : {
			errorCorrectionLevel: 'H',
			margin : 2
		}
	}).then((buf) => {
		fs.writeFile(destination, buf, (err) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
      	console.info(destination, 'saved.');
      	res.send(`${ASSET_PATH}/output/${name}.png`);
      }
    });
	});
});

app.post('/qr-code', (req, res) => {
	writeCodesToDisk(req.body.inputCode);
  var code = qr.image(req.body.inputCode, { type: 'svg' });
  res.type('svg');
  code.pipe(res);
});

app.listen(PORT, () => {
	console.log('Listening at https://localhost:%s', PORT);
});
