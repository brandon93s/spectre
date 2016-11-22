'use strict';

const log = require('_/log');
const debug = log.debugger('worker:runner:setting:' + process.pid);
const def = require('_/common/helpers/is-defined');

module.exports = function (page, msg) {
  debug('Adding page settings');

  /* Config */
  if (def(msg.loadImages))
    page.setting('loadImages', msg.loadImages);

  if (def(msg.enableJs))
    page.setting('javascriptEnabled', msg.enableJs);

  /* Auth */
  if (def(msg.password))
    page.setting('password', msg.password);

  if (def(msg.userName))
    page.setting('userName', msg.userName);

  /* Other */
  if (def(msg.userAgent))
    page.setting('userAgent', msg.userAgent);
};
