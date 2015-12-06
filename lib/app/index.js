'use strict';

const express = require('express'),
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
app.get('/', middleware.normalize.single, middleware.validate.single, function (req, res) {
    res.send('GET request');
});

app.get('/multi', middleware.normalize.multi, middleware.validate.multi, function (req, res) {
    res.send('GET Multi request');
});

app.post('/', middleware.normalize.single, middleware.validate.single, function (req, res) {
    res.send('POST request');
});

app.post('/multi', middleware.normalize.multi, middleware.validate.multi, function (req, res) {
    res.send('POST Multi requst');
});

/* Error Handling */
app.use(middleware.errorHandlers.log);
app.use(middleware.errorHandlers.client);
app.use(middleware.errorHandlers.error);

module.exports = app;
