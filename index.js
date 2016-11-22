'use strict';

/* Spectre Entry Point */
const config = require('_/config');
const debug = require('_/log').debugger('spectre');
const app = require('_/app');
const workerFarm = require('_/farm');

var server = app.listen(config.port);
server.timeout = config.timeout;
debug('app listening on port %s', config.port);

workerFarm.boot();
