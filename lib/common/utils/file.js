'use strict';

const hashObj = require('hash-obj');
const _ = require('lodash');
const join = require('path').join;
const TEMP_DIRECTORY = require('_/config').temporary_directory;

module.exports = {
  full: fullFilePath,
  name: filenameFromMessage
};

function fullFilePath(msg, ext) {
  let fileName;

  // string
  if (_.isString(msg))
    fileName = joinFileAndExtension(msg, ext);

  // array
  if (_.isArray(msg)) {
    let fileObject = _.reduce(msg, (obj, singleMsg, key) => {
      obj[key] = singleMsg;
      return obj;
    }, {});

    fileName = filenameFromMessage(fileObject, msg[0].format);
  }

  // object
  if (_.isPlainObject(msg))
    fileName = filenameFromMessage(msg, msg.format);

  return join(TEMP_DIRECTORY, fileName);
}

function filenameFromMessage(msg, ext) {
  let uniqueFilename = messageHash(msg);
  return joinFileAndExtension(uniqueFilename, ext);
}

/* Helpers */
function joinFileAndExtension(fileName, ext) {
  if (!fileName)
    throw new Error('fileName is required');

  if (!ext)
    throw new Error('ext is required');

  return `${fileName}.${ext}`;
}

function messageHash(msg) {
  return hashObj(msg, {
    algorithm: 'md5'
  });
}
