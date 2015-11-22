var express = require('express'),
    cfg = require('_/config'),
    normalize = require('_/middleware/normalize'),
    validate = require('_/middleware/validate'),
    app = express();

// register routes
app.get('/', normalize, validate, function (req, res, next) {
    res.send('GET request');
});

app.post('/', normalize, validate, function (req, res, next) {
    res.send('POST request');
});

// custom error middleware
app.use(require('_/middleware/handleError'));

module.exports = app;
