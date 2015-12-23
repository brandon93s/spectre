const isWindows = process.platform === 'win32';
const cpus = require('os').cpus().length;

module.exports = {
  port: 3000,
  relative_temporary_directory: '.tmp',
  app: {},
  core: {},
  farm: {
    maxConcurrentWorkers: cpus,
    maxCallsPerWorker: 25,
    maxConcurrentCallsPerWorker: 1,
    maxRetries: 5,
    autoStart: false,
    phantom: {
      dnodeOpts: {
        weak: !isWindows
      }
    }
  },
  log: {
    level: 'info'
  }
};
