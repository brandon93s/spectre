'use strict';

const log = require('_/log');
const debug = log.debugger('worker:runner:layout:' + process.pid);
const def = require('_/common/utils/is-defined');

module.exports = function (page, msg) {
  debug('Setting up page layout');

  /* Viewport */
  page.property('viewportSize', {
    width: msg.width,
    height: msg.height
  });

  /* Paper */
  if (def(msg.paperSize))
    page.property('paperSize', msg.paperSize);

};
