'use strict';

const log = require('_/log');
const debug = log.debugger('worker:runner:setting:' + process.pid);
const def = require('_/common/helpers/is-defined');

module.exports = function (page, msg) {
  debug('Adding page settings');

  /* Config */
  if (def(msg.loadImages))
    page.set('settings.loadImages', msg.loadImages);

  if (def(msg.enableJs))
    page.set('settings.javascriptEnabled', msg.enableJs);

  /* Auth */
  if (def(msg.password))
    page.set('settings.password', msg.password);

  if (def(msg.userName))
    page.set('settings.userName', msg.userName);

  /* Other */
  if (def(msg.userAgent))
    page.set('settings.userAgent', msg.userAgent);
};
