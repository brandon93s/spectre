/* Core Manager */
'use strict';

const farm = require('_/farm'),
    debug = require('_/log').debugger('manager'),
    _ = require('lodash'),
    workers = farm.getWorkers();

/* Helpers */
function mergePdfs() {
    // merge multipage pdfs
}

function compressImage() {
    // apply image compression
}

function generateWorkerMessages(msg) {
    // take the message and convert into a set of worker requests
}

/* Request Handler */
function processRequest(msg, callback) {
    // send requests to workers
    // return file path to request handler
}

module.exports = {
    processRequest: processRequest
};
