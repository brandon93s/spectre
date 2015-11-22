var cfg = require('_/config'),
    _lang = require('lodash/lang'),
    def,
    getWorkerFarmConfig;

def = function (check) {
    return !_lang.isUndefined(check);
};

getWorkerFarmConfig = function () {
    if (!cfg.farm)
        return {};

    var farmConfig = {};

    farmConfig.maxConcurrentWorkers = cfg.farm.maxConcurrentWorkers || require('os').cpus().length;
    if (def(cfg.farm.maxCallsPerWorker)) farmConfig.maxCallsPerWorker = cfg.farm.maxCallsPerWorker;
    if (def(cfg.farm.maxConcurrentCallsPerWorker)) farmConfig.maxConcurrentCallsPerWorker = cfg.farm.maxConcurrentCallsPerWorker;
    if (def(cfg.farm.maxRetries)) farmConfig.maxRetries = cfg.farm.maxRetries;
    if (def(cfg.farm.autoStart)) farmConfig.autoStart = cfg.farm.autoStart;
    if (def(cfg.farm.maxConcurrentCalls)) farmConfig.maxConcurrentCalls = cfg.farm.maxConcurrentCalls;
    if (def(cfg.farm.maxCallTime)) farmConfig.maxCallTime = cfg.farm.maxCallTime;

    return farmConfig;
};

module.exports = {
    getWorkerFarmConfig: getWorkerFarmConfig
};
