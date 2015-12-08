'use strict';

const log = require('_/log'),
    file = require('_/common/file'),
    debug = log.debugger('runner:combine'),
    exec = require('child_process').exec,
    fs = require('fs'),
    _ = require('lodash');


module.exports = combine;

function combine(responses, messages) {
    if (shouldMergePdfs(messages)) {
        return mergePdfs(responses, messages);
    }

    return zip(messages);
}

/* Helpers */
function shouldMergePdfs(messages) {
    const allPdf = _.all(messages, {
        'format': 'pdf'
    });

    const allCombine = !_.any(messages, {
        'combine': false
    });

    return allPdf && allCombine;
}

/* Zip Files */
function zip(messages) {
    let filePath = file.full(messages);
    return Promise.reject('Zip not implemented! ' + filePath);
}

/* Merge Pdfs */
function mergePdfs(responses, messages) {
    const filePath = file.full(messages);
    const execArgs = getExecArgs(responses, filePath);

    debug('Starting pdf merge');
    return new Promise((resolve, reject) => {
        exec('pdftk ' + execArgs.join(' '), error => {
            if (error) {
                debug('Pdf merge failure!');
                return reject(error);
            }
            debug('Pdf merge success!');
            let readStream = fs.createReadStream(filePath);

            resolve({
                path: filePath,
                stream: readStream
            });
        });
    });
}

function getExecArgs(messages, filePath) {
    let files = _.pluck(messages, 'file');

    let execArgs = files;
    execArgs.push('cat', 'output', filePath);

    return execArgs;
}
