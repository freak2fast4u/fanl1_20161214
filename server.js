(function() {
	'use strict';

	var express = require('express'); // charge ExpressJS
	var serveIndex = require('serve-index');

	var app = express();
	
	var webservice = require('./ws/index.js');
	
	app.use('/ws', webservice);
	
	app.use(express.static('.'));
	app.use(serveIndex('.', {icons: true}));
	
	app.all(['/app/products', '/app/services','/app/contact'], function(req, res) {
		res.sendFile('./app/index.html', {root: __dirname});
	});

	app.use(function(req, res, next) {
		console.log('404: Page not Found', req.url);
		next();
	});

	app.listen(8000, function() {
		console.log('server started on port 8000');
	});
})();
