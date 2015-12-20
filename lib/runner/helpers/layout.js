'use strict';

const log = require('_/log');
const debug = log.debugger('worker:runner:layout:' + process.pid);
const def = require('_/common/helpers/is-defined');

module.exports = function (page, msg) {
  debug('Setting up page layout');

  /* Viewport */
  page.set('viewportSize', {
    width: msg.width,
    height: msg.height
  });

  /* Paper */
  if (def(msg.paperSize))
    page.set('paperSize', msg.paperSize);

};
