'use strict';

var _ = require('lodash'),
    log = require('_/log');

function merge(req) {
    var body = req.body || {},
        query = req.query || {};

    req.data = _.defaultsDeep(body, query);
}

module.exports = function (req, res, next) {
    merge(req);

    log.info(req.data);

    next();
};
