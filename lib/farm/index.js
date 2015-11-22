'use strict';

var workerFarm = require('worker-farm'),
    log = require('_/log'),
    _running = false,
    _workers;

function end() {
    if (_workers) {
        log.log('debug', 'WorkerFarm end called');
        workerFarm.end(_workers);
        _running = false;
    } else {
        log.info('WorkerFarm has not been booted yet!');
    }

}

function boot() {
    if (!_running) {
        log.log('debug', 'WorkerFarm boot called');

        var config = require('_/config/utils').getWorkerFarmConfig();
        _workers = workerFarm(config, require.resolve('./worker'));
        _running = true;
    } else {
        log.info('WorkerFarm has already been booted!');
    }
}

function getWorkers() {
    if (_running) {
        return _workers;
    }
    log.info('WorkerFarm has not been booted. No workers available.');
    return null;
}

module.exports = {
    end: end,
    boot: boot,
    getWorkers: getWorkers
};
