var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

const PORT = 5000;

new WebpackDevServer(webpack(config), {

	proxy: {
		'/api/*': {
			target : 'http://localhost:3000',
			secure : false,
			pathRewrite: {'^/api' : ''},
			changeOrigin:true,
			logLevel: 'debug',
			onError : function(err, req, res) {
				res.writeHead(500, {
					'Content-Type': 'text/plain'
				});
				console.log(err);
				res.end('Something went wrong. http-proxy-middleware error.');
			}
		}
	},

	host: '0.0.0.0',
	disableHostCheck: true,
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(PORT, function (err, result) {
  if (err) {
    console.log(err);
  } else {
		console.log('Listening at localhost:'+PORT);
  }
});
