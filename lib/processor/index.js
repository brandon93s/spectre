/* Core Processor */
'use strict';

const farm = require('_/farm'),
    debug = require('_/log').debugger('processor'),
    helpers = require('./helpers'),
    _ = require('lodash');

module.exports = {
    single: processSingle,
    multi: processMulti
};

/* Request Handler */
function processRequest(msg) {
    const workers = farm.getWorkers();

    return new Promise((resolve, reject) => {
        workers(msg, (err, response) => {
            if (err) return reject(err);
            else resolve(response);
        });
    });
}

/* Single */
function processSingle(req, res, next) {
    const promise = processRequest(req.data);

    promise.then(response => helpers.simple(response))
        .then(result => sendResponse(res, result))
        .catch(error => {
            debug('Process single fail.');
            return next(new Error(error));
        });
}

/* Multi */
function processMulti(req, res, next) {
    let messages = req.data;

    Promise.all(_.map(messages, msg => {
            return processRequest(msg);
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
