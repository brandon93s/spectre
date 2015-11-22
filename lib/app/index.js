'use strict';

var express = require('express'),
    normalize = require('_/middleware/normalize'),
    validate = require('_/middleware/validate'),
    bodyParser = require('body-parser'),
    app = express();

/* Body Parsers */
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

/* Routes */
app.get('/', normalize, validate, function (req, res) {
    res.send('GET request');
});

app.post('/', normalize, validate, function (req, res) {
    res.send('POST request');
});

/* Error Handling */
app.use(require('_/middleware/handleError'));

module.exports = app;
