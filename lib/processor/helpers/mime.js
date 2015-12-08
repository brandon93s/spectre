'use strict';

const mimeTypes = require('mime-types');

module.exports = function (filePath) {
    return mimeTypes.lookup(filePath);
};
