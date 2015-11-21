var phantom = require('phantom'),
    config = require('_/config'),
    log = require('_/log'),
    _ = require('lodash'),
    phantomOptions = config.phantomJS || {},
    _phantomDestroyed = false,
    phantomExitHandler,
    workerExitHandler,
    _ph;

/* Phantom Process Creation
 *
 * spins up a child phantom process and stores a reference
 */
phantomExitHandler = function (err) {
    // log.info('Phantom process died. Killing worker.');
    _phantomDestroyed = true;
    process.exit();
};

phantom.create(function (ph) {
    _ph = ph;
}, _.defaultsDeep(phantomOptions, {
    onExit: phantomExitHandler
}));

/* Worker Process Exit Handlers
 *
 * cleanup the associated phantom process if the worker dies
 */
workerExitHandler = function (err) {
    if (_phantomDestroyed) return;
    // log.info('Worker process died. Killing phantomJS.');

    try {
        process.kill(_ph.process.pid, 'SIGHUP');
    } catch (e) {} finally {
        _phantomDestroyed = true;
    }
};

process.on('exit', workerExitHandler);
process.on('SIGINT', workerExitHandler);
process.on('uncaughtException', workerExitHandler);

module.exports = function (inp, callback) {
    callback(null, inp + ' (' + process.pid + ')');
};
