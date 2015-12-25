'use strict';

const _ = require('lodash');
const prependHttp = require('prepend-http');
const debug = require('_/log').debugger('middleware:normalize');
const DEFAULTS = require('_/common/defaults');

module.exports = normalize;

/* Normalize */
function normalize(req, res, next) {
  merge(req);
  normalizeUrls(req);

  if (_.has(req.data, 'items')) {
    normalizeMulti(req, res, next);
  } else {
    normalizeSingle(req, res, next);
  }
}

/* Single */
function normalizeSingle(req, res, next) {
  // apply spectre defaults
  _.defaultsDeep(req.data, DEFAULTS);

  debug('Normalization success!');
  next();
}

/* Multi */
function normalizeMulti(req, res, next) {
  let results = getItemsAndDefaults(req.data);

  if (results.error) return next(new Error(results.error));

  let items = applyDefaultsToItems(results.items, results.defaults);

  req.data = items.length === 1 ? items[0] : items;

  debug('Normalization success!');
  next();
}

/* Helpers */
function getItemsAndDefaults(data) {
  let results = {
    error: null,
    defaults: {},
    items: []
  };

  if (_.isArray(data)) {
    results.items = data;
  } else {

    if (!_.has(data, 'items')) {
      results.error = 'Invalid multi request. Items missing.';
      return results;
    }

    if (!_.isArray(data.items)) {
      results.error = 'Invalid multi request. Items must be an array.';
      return results;
    }

    results.items = data.items;
    results.defaults = _.omit(data, 'items');
  }

  return results;
}

function applyDefaultsToItems(items, defaults) {
  _.forEach(items, function (item, key) {
    let sources = _.filter(items, function (i, k) {
      return k !== key;
    });

    sources.unshift(defaults);

    spreadDefaultsDeep(item, sources);
  });

  // apply spectre defaults
  _.forEach(items, function (item) {
    _.defaultsDeep(item, DEFAULTS);
  });

  return items;
}

function merge(req) {
  let body = req.body || {};
  let query = req.query || {};

  req.data = _.defaultsDeep(body, query);
}

function normalizeUrls(req) {
  // single
  if (req.data.url)
    req.data.url = prependHttp(req.data.url);

  // multi
  if (req.data.items) {
    _.forEach(req.data.items, (item, key) => {
      req.data.items[key].url = prependHttp(item.url);
    });
  }
}

function spreadDefaultsDeep(item, sources) {
  sources.unshift(item);
  _.defaultsDeep(...sources);
}
