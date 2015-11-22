var cfg = require('_/config'),
    _lang = require('lodash/lang'),
    def,
    getWorkerFarmConfig;

def = function (check) {
    return !_lang.isUndefined(check);
};

getWorkerFarmConfig = function () {
    var wfc = {};

    if (!cfg.farm) return wfc;

    wfc.maxConcurrentWorkers = cfg.farm.maxConcurrentWorkers || require('os').cpus().length;
    if (def(cfg.farm.maxCallsPerWorker)) wfc.maxCallsPerWorker = cfg.farm.maxCallsPerWorker;
    if (def(cfg.farm.maxConcurrentCallsPerWorker)) wfc.maxConcurrentCallsPerWorker = cfg.farm.maxConcurrentCallsPerWorker;
    if (def(cfg.farm.maxRetries)) wfc.maxRetries = cfg.farm.maxRetries;
    if (def(cfg.farm.autoStart)) wfc.autoStart = cfg.farm.autoStart;
    if (def(cfg.farm.maxConcurrentCalls)) wfc.maxConcurrentCalls = cfg.farm.maxConcurrentCalls;
    if (def(cfg.farm.maxCallTime)) wfc.maxCallTime = cfg.farm.maxCallTime;

    return wfc;
};

module.exports = {
    getWorkerFarmConfig: getWorkerFarmConfig
};
