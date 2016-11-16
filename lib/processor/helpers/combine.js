'use strict';

const log = require('_/log');
const file = require('_/common/helpers/file');
const debug = log.debugger('runner:combine');
const exec = require('child_process').exec;
const fs = require('fs');
const _ = require('lodash');
const _Promise = require('bluebird');

module.exports = combine;

function combine(responses, messages) {
  if (shouldMergePdfs(messages)) {
    return mergePdfs(responses, messages);
  }

  return zip(messages);
}

/* Helpers */
function shouldMergePdfs(messages) {
  const allPdf = _.every(messages, {
    format: 'pdf'
  });

  const allCombine = !_.some(messages, {
    combine: false
  });

  return allPdf && allCombine;
}

/* Zip Files */
function zip(messages) {
  let filePath = file.full(messages);
  return _Promise.reject('Zip not implemented! ' + filePath);
}

/* Merge Pdfs */
function mergePdfs(responses, messages) {
  const filePath = file.full(messages);
  const execArgs = getExecArgs(responses, filePath);

  debug('Starting pdf merge');
  return new _Promise((resolve, reject) => {
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
  let files = _.map(messages, 'file');

  let execArgs = files;
  execArgs.push('cat', 'output', filePath);

  return execArgs;
}
