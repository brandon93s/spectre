'use strict';

const log = require('_/log');
const helpers = require('./helpers');
const file = require('_/common/helpers/file');
const debug = log.debugger('worker:runner:' + process.pid);
const _Promise = require('bluebird');

module.exports = run;

function run(_ph, msg) {
  const _filePath = file.full(msg);

  debug('Running %s', msg.url);

  return _Promise.resolve(_ph.createPage())
    .then(page => setupPage(page, msg))
    .then(page => openPage(page, msg))
    .then(page => helpers.render(page, msg, _filePath))
    .then(page => closePage(page))
    .then(() => {
      debug('Done rendering');
      return getReturnMessage(_filePath);
    });
}

function setupPage(page, msg) {
  return _Promise.join(
    helpers.cookie(page, msg),
    helpers.setting(page, msg),
    helpers.layout(page, msg)
  ).then(() => {
    return page;
  });
}

function openPage(page, msg) {
  let pageOpenPromise;

  if (msg.data) {
    pageOpenPromise = openPagePost(page, msg);
  } else {
    pageOpenPromise = page.open(msg.url);
  }

  return _Promise.resolve(pageOpenPromise)
    .then(status => {
      if (status !== 'success') {
        throw 'Page open failed';
      }
      debug('Page open success');

      return page;
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

  return page.open(msg.url, 'POST', data, headers);
}

function closePage(page) {
  page.close();
}

function getReturnMessage(filePath) {
  return {
    file: filePath
  };
}
