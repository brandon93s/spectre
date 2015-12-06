'use strict';

var _ = require('lodash'),
    debug = require('_/log').debugger('middleware:normalize');

module.exports = {
    single: normalizeSingle,
    multi: normalizeMulti
};

/* Single */
function normalizeSingle(req, res, next) {
    merge(req);

    debug('Normalization success!');
    next();
}

/* Multi */
function normalizeMulti(req, res, next) {
    merge(req);

    var results = getItemsAndDefaults(req.data);

    if (results.error) return next(new Error(results.error));

    var items = applyDefaultsToItems(results.items, results.defaults);
    req.data = items;

    debug('Normalization success!');
    next();
}

function getItemsAndDefaults(data) {
    var results = {
        error: null,
        defaults: {},
        items: []
    };

    if (_.isArray(data)) {
        results.items = data;
    } else {

        if (!_.has(data, 'items')) {
            results.error = "Invalid multi request. Items missing.";
            return results;
        }

        if (!_.isArray(data.items)) {
            results.error = "Invalid multi request. Items must be an array.";
            return results;
        }

        results.items = data.items;
        results.defaults = _.omit(data, 'items');
    }

    return results;
}

function applyDefaultsToItems(items, defaults) {
    _.forEach(items, function (item, key) {
        var sources = _.filter(items, function (i, k) {
            return k !== key;
        });

        sources.unshift(defaults);

        _.defaultsDeep(item, sources);
    });

    return items;
}

/* Helper */
function merge(req) {
    var body = req.body || {},
        query = req.query || {};

    req.data = _.defaultsDeep(body, query);
}
