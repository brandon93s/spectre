'use strict';

const log = require('_/log'),
    debug = log.debugger('middleware:logError');

module.exports = function (err, req, res, next) {
    log.error(err);
    debug((err && err.message) ? err.message : err);
    next(err);
};
