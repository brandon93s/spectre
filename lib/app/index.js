'use strict';

const express = require('express'),
	middleware = require('_/middleware'),
	bodyParser = require('body-parser'),
	processor = require('_/processor'),
	jsonParser = bodyParser.json(),
	urlencodedParser = bodyParser.urlencoded({
		extended: false
	}),
	app = express();

/* View Engine */
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/* Body Parsers */
app.use(jsonParser);
app.use(urlencodedParser);

/* Routes */
app.get('/', middleware.normalize.single, middleware.validate.single, processor.single);
app.post('/', middleware.normalize.single, middleware.validate.single, processor.single);
app.get('/multi', middleware.normalize.multi, middleware.validate.multi, processor.multi);
app.post('/multi', middleware.normalize.multi, middleware.validate.multi, processor.multi);


/* Error Handling */
app.use(middleware.errorHandlers.log);
app.use(middleware.errorHandlers.client);
app.use(middleware.errorHandlers.error);

module.exports = app;
