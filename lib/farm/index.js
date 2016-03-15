'use strict';

const workerFarm = require('worker-farm');
const debug = require('_/log').debugger('farm');

let _running = false;
let _workers;

module.exports = {
  boot: boot,
  getWorkers: getWorkers
};

function boot() {
  if (!_running) {
    debug('WorkerFarm boot called');

    const config = require('_/config/utils').getWorkerFarmConfig();
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
