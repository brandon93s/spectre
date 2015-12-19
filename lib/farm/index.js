'use strict';

const workerFarm = require('worker-farm');
const debug = require('_/log').debugger('farm');

let _running = false;
let _workers;

module.exports = {
  end: end,
  boot: boot,
  getWorkers: getWorkers
};

function end() {
  if (_workers) {
    debug('WorkerFarm end called');
    workerFarm.end(_workers);
    _running = false;
  } else {
    debug('WorkerFarm has not been booted yet!');
  }
}

function boot() {
  if (!_running) {
    debug('WorkerFarm boot called');

    var config = require('_/config/utils').getWorkerFarmConfig();
    _workers = config.disable ? require('./worker') : workerFarm(config, require.resolve('./worker'));
    _running = true;
  } else {
    debug('WorkerFarm has already been booted!');
  }
}

function getWorkers() {
  if (_running) {
    return _workers;
  }
  debug('WorkerFarm has not been booted. No workers available.');
  return null;
}
