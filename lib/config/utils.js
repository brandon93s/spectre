'use strict';

const cfg = require('_/config');
const def = require('_/common/helpers/is-defined');

module.exports = {
  getWorkerFarmConfig: getWorkerFarmConfig
};

function getWorkerFarmConfig() {
  let farmConfig = {};

  if (!cfg.farm)
    return farmConfig;

  /* Farm Settings */
  if (def(cfg.farm.maxConcurrentWorkers))
    farmConfig.maxConcurrentWorkers = cfg.farm.maxConcurrentWorkers;

  if (def(cfg.farm.maxCallsPerWorker))
    farmConfig.maxCallsPerWorker = cfg.farm.maxCallsPerWorker;

  if (def(cfg.farm.maxConcurrentCallsPerWorker))
    farmConfig.maxConcurrentCallsPerWorker = cfg.farm.maxConcurrentCallsPerWorker;

  if (def(cfg.farm.maxRetries))
    farmConfig.maxRetries = cfg.farm.maxRetries;

  if (def(cfg.farm.autoStart))
    farmConfig.autoStart = cfg.farm.autoStart;

  if (def(cfg.farm.maxConcurrentCalls))
    farmConfig.maxConcurrentCalls = cfg.farm.maxConcurrentCalls;

  if (def(cfg.farm.maxCallTime))
    farmConfig.maxCallTime = cfg.farm.maxCallTime;

  /* Disable Farm */
  if (def(cfg.farm.disable)) farmConfig.disable = true;

  return farmConfig;
}
