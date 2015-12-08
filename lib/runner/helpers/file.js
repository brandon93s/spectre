'use strict';

const hashObj = require('hash-obj'),
    _ = require('lodash/lang'),
    join = require('path').join,
    TEMP_DIRECTORY = require('_/config').temporary_directory;

module.exports = {
    full: fullFilePath,
    name: filenameFromMessage
};

function fullFilePath(file) {
    let fileName = file;

    if (_.isObject(file)) {
        fileName = filenameFromMessage(file);
    }

    return join(TEMP_DIRECTORY, fileName);
}

function filenameFromMessage(msg) {
    var uniqueFilename = messageHash(msg);

    // TODO: Extension should be pulled from the message
    return uniqueFilename + '.pdf';
}

function messageHash(msg) {
    return hashObj(msg, {
        algorithm: 'md5'
    });
}
