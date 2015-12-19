'use strict';

const fs = require('fs');

module.exports = function (response) {
  let readStream = fs.createReadStream(response.file);

  return Promise.resolve({
    stream: readStream,
    path: response.file
  });
};
