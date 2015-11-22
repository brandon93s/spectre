var workerFarm = require('worker-farm'),
    log = require('_/log'),
    running = false,
    workers,
    end,
    getWorkers,
    boot;

end = function () {
    if (workers) {
        log.log('debug', 'WorkerFarm end called');
        workerFarm.end(workers);
        running = false;
    } else {
        log.info('WorkerFarm has not been booted yet!');
    }

};

boot = function () {
    if (!running) {
        log.log('debug', 'WorkerFarm boot called');

        var config = require('_/config/utils').getWorkerFarmConfig();
        workers = workerFarm(config, require.resolve('./worker'));
        running = true;
    } else {
        log.info('WorkerFarm has already been booted!');
    }
};


getWorkers = function () {
    if (running) {
        return workers;
    }
    log.info('WorkerFarm has not been booted. No workers available.');
    return null;
};

module.exports = {
    end: end,
    boot: boot,
    getWorkers: getWorkers
};
