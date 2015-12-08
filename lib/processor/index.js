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

    promise.then(response => {
        // TODO: process and send file
        debug(response);
        next();
    }).catch(error => {
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
        .then(result => {
            res.setHeader('content-type', helpers.mime(result.path));
            return result.stream.pipe(res);
        })
        .catch(error => {
            debug('Process multi fail.');
            return next(new Error(error));
        });
}
