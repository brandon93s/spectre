'use strict';

const fs = require('fs');
const _Promise = require('bluebird');

module.exports = function (response) {
  let readStream = fs.createReadStream(response.file);

  return _Promise.resolve({
    stream: readStream,
    path: response.file
  });
};
