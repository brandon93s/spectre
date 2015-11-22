'use strict';

var phantom = require('phantom'),
    config = require('_/config'),
    log = require('_/log'),
    _ = require('lodash'),
    phantomOptions = config.phantomJS || {},
    _ready = false,
    _ph;

/* Phantom Process Creation
 *
 * spins up a child phantom process and stores a reference
 */
function phantomExitHandler(err) {
    if (err) log.error(err);
    log.debug('Phantom process exit.');
    process.exit(1);
}

phantom.create(function (ph) {
    _ph = ph;
    _ready = true;
}, _.defaultsDeep(phantomOptions, {
    onExit: phantomExitHandler
}));

/* Worker Process Exit Handlers
 *
 * cleanup the associated phantom process if the worker dies
 */
function workerExitHandler(err) {
    if (err) log.error(err);
    log.debug('Worker process exit.');

    try {
        process.kill(_ph.process.pid, 'SIGKILL');
    } catch (e) {}
}

process.on('exit', workerExitHandler);
process.on('SIGINT', workerExitHandler);
process.on('uncaughtException', function (err) {
    log.error(err);
    process.exit(1);
});

module.exports = function (inp, callback) {
    var doCallback = function () {
        if (_ready) {
            callback(null, '#' + inp + ' (pid:' + process.pid + ')' + ' [_ph.pid:' + _ph.process.pid + ']');
        } else {
            setTimeout(doCallback, 10);
        }
    };
    doCallback();
};
