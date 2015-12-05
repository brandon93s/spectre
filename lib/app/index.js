'use strict';

var express = require('express'),
    middleware = require('_/middleware'),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    }),
    app = express();

/* Body Parsers */
app.use(jsonParser);
app.use(urlencodedParser);

/* Routes */
app.get('/', middleware.normalize, middleware.validate, function (req, res) {
    res.send('GET request');
});

app.post('/', middleware.normalize, middleware.validate, function (req, res) {
    res.send('POST request');
});

/* Error Handling */
app.use(middleware.handleError);

module.exports = app;
