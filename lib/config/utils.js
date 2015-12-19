'use strict';

const cfg = require('_/config');
const _lang = require('lodash/lang');

module.exports = {
  getWorkerFarmConfig: getWorkerFarmConfig
};

function def(check) {
  return !_lang.isUndefined(check);
}

function getWorkerFarmConfig() {
  if (!cfg.farm)
    return {};

  let farmConfig = {};

  farmConfig.maxConcurrentWorkers = cfg.farm.maxConcurrentWorkers || require('os').cpus().length;
  if (def(cfg.farm.maxCallsPerWorker)) farmConfig.maxCallsPerWorker = cfg.farm.maxCallsPerWorker;
  if (def(cfg.farm.maxConcurrentCallsPerWorker)) farmConfig.maxConcurrentCallsPerWorker = cfg.farm.maxConcurrentCallsPerWorker;
  if (def(cfg.farm.maxRetries)) farmConfig.maxRetries = cfg.farm.maxRetries;
  if (def(cfg.farm.autoStart)) farmConfig.autoStart = cfg.farm.autoStart;
  if (def(cfg.farm.maxConcurrentCalls)) farmConfig.maxConcurrentCalls = cfg.farm.maxConcurrentCalls;
  if (def(cfg.farm.maxCallTime)) farmConfig.maxCallTime = cfg.farm.maxCallTime;

  // flag to disable farm
  if (def(cfg.farm.disable)) farmConfig.disable = true;

  return farmConfig;
}
