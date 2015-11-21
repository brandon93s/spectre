var express = require('express'),
    cfg = require('_/config'),
    app = express();

// register routes
app.get('/', function (req, res, next) {
    var item = phantomCluster.queue('http://google.com');
    item.on("response", function () {
        console.log("# Response");
        console.log(item.request);
        console.log(item.response);
        res.send(item.response);
    });
    // res.send('GET request');
});

app.post('/', function (req, res, next) {
    res.send('POST request');
});

// custom error middleware
app.use(require('_/middleware/handleError'));

module.exports = app;
