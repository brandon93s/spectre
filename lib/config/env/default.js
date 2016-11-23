const cpus = require('os').cpus().length;

module.exports = {
  port: 3000,
  timeout: 10 * 60 * 1000,
  relative_temporary_directory: '.tmp',
  app: {},
  core: {},
  farm: {
    maxConcurrentWorkers: cpus,
    maxCallsPerWorker: 25,
    maxConcurrentCallsPerWorker: 1,
    maxRetries: 5,
    autoStart: false
  },
  log: {
    level: 'info'
  }
};
