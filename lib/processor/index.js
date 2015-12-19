/* Core Processor */
'use strict';

const farm = require('_/farm');
const debug = require('_/log').debugger('processor');
const helpers = require('./helpers');
const _ = require('lodash');

let _workers = null;

module.exports = {
  single: processSingle,
  multi: processMulti
};

/* Request Handler */
function processRequest(msg, workers) {
  return new Promise((resolve, reject) => {
    workers(msg, (err, response) => {
      if (err) return reject(err);
      else resolve(response);
    });
  });
}

/* Single */
function processSingle(req, res, next) {
  const workers = getWorkers();
  const promise = processRequest(req.data, workers);

  promise.then(response => helpers.simple(response))
    .then(result => sendResponse(res, result))
    .catch(error => {
      debug('Process single fail.');
      return next(new Error(error));
    });
}

/* Multi */
function processMulti(req, res, next) {
  const workers = getWorkers();
  let messages = req.data;

  Promise.all(_.map(messages, msg => {
      return processRequest(msg, workers);
    }))
    .then(responses => helpers.combine(responses, messages))
    .then(result => sendResponse(res, result))
    .catch(error => {
      debug('Process multi fail.');
      return next(new Error(error));
    });
}

/* Helper */
function sendResponse(res, result) {
  debug(result.path);
  res.setHeader('content-type', helpers.mime(result.path));
  result.stream.pipe(res);
}

function getWorkers() {
  if (!_workers) {
    _workers = farm.getWorkers();
  }
  return _workers;
}
