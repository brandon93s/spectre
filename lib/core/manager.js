/* Core Manager */

var farm = require('_/farm'),
    log = require('_/log'),
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
