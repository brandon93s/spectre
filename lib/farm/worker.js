'use strict';

const phantom = require('phantom');
const config = require('_/config');
const log = require('_/log');
const runner = require('_/runner');
const debug = log.debugger('worker:' + process.pid);
const _ = require('lodash');
const phantomOptions = config.farm.phantom;

let _ready = false;
let _ph;

/* Phantom Process Creation
 *
 * spins up a child phantom process and stores a reference
 */
function phantomExitHandler(err) {
  if (err) log.error(err);
  debug('Phantom process exit.');
  process.exit(1);
}

phantom.create(ph => {
  _ph = ph;
  _ready = true;
}, _.defaultsDeep(phantomOptions, {
  onExit: phantomExitHandler
}));

/* Worker Process Exit Handlers
 *
 * cleanup the associated phantom process if the worker dies
 */
function workerExitHandler(err) {
  if (err) log.error(err);
  debug('Worker process exit.');

  try {
    process.kill(_ph.process.pid, 'SIGKILL');
  } catch (e) {}
}

process.on('exit', workerExitHandler);
process.on('SIGINT', workerExitHandler);
process.on('uncaughtException', err => {
  log.error(err);
  process.exit(1);
});

module.exports = function (msg, callback) {
  let run = () => {
    if (_ready) {

      debug('Export task started');
      let task = runner(_ph, msg);

      task.then(msg => {
        debug('Export task success');
        callback(null, msg);
      });

      task.catch(error => {
        debug('Export task failed');
        callback(error);
      });

    } else {
      setTimeout(run, 10);
    }
  };
  run();
};
