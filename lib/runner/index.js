'use strict';

const log = require('_/log');
const helpers = require('./helpers');
const file = require('_/common/helpers/file');
const debug = log.debugger('worker:runner:' + process.pid);

module.exports = run;

function run(_ph, msg) {
  const _filePath = file.full(msg);

  debug('Running %s', msg.url);

  return Promise.resolve(true)
    .then(() => _ph.createPage())
    .then(page => {
      helpers.cookie(page, msg);
      helpers.setting(page, msg);
      helpers.layout(page, msg);
      helpers.listener(page, msg);
      return openPage(page, msg);
    })
    .then(page => helpers.render(page, msg, _filePath))
    .then(page => closePage(page))
    .then(() => {
      debug('Done rendering');
      return getReturnMessage(_filePath);
    });
}

function openPage(page, msg) {

  if (msg.data) {
    return openPagePost(page, msg);
  }

  return new Promise((resolve, reject) => {
    page.open(msg.url).then(status => {
      if (status !== 'success') {
        page.close();
        return reject('Page open failed');
      }

      resolve(page);
    });
  });
}

function openPagePost(page, msg) {
  const data = msg.data;
  const dataType = msg.dataType || 'urlencoded';

  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  if (dataType === 'json')
    headers['Content-Type'] = 'application/json';

  // TODO: data validation, parsing, transforming?

  return new Promise((resolve, reject) => {
    page.open(msg.url, 'POST', data, headers).then(status => {
      if (status !== 'success') {
        page.close();
        debug('Page open failed!');
        return reject('Page open failed');
      }
      debug('Page opened!');
      resolve(page);
    });
  });
}

function closePage(page) {
  page.close();
}

function getReturnMessage(filePath) {
  return {
    file: filePath
  };
}
