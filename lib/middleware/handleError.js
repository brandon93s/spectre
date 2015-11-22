'use strict';

var log = require('_/log');

module.exports = function (er, req, res) {
    log.warn(er);
    res.sendStatus(500);
};
