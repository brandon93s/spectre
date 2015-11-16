var express = require('express'),
    cfg = require('_/config'),
    app = express();

// register routes
app.get('/', function (req, res, next) {
    res.send('GET request');
});

app.post('/', function (req, res, next) {
    res.send('POST request');
});

// custom error middleware
app.use(require('_/middleware/handleError'));

module.exports = app;
