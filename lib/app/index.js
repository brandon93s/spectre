'use strict';

const express = require('express');
const middleware = require('_/middleware');
const bodyParser = require('body-parser');
const processor = require('_/processor');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});
const app = express();
const handlers = [middleware.normalize, middleware.validate, processor];

/* View Engine */
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/* Body Parsers */
app.use(jsonParser);
app.use(urlencodedParser);

/* Routes */
app.route('/')
  .get(handlers)
  .post(handlers);

/* Error Handling */
app.use(middleware.errorHandlers.log);
app.use(middleware.errorHandlers.client);
app.use(middleware.errorHandlers.error);

module.exports = app;
