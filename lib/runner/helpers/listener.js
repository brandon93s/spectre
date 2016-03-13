'use strict';

const log = require('_/log');
const debug = log.debugger('worker:runner:listener:' + process.pid);

module.exports = function (page, msg) {
  debug('Setting up page listeners');

  /* Triggered Rendering */
  if (msg.mode === 'trigger') {
    page.triggered = false;
    page.property('onCallback', () => {
      page.triggered = true;
    });
  }

};
