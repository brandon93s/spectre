'use strict';

/* Boomerang Entry Point */
const config = require('_/config'),
    debug = require('_/log').debugger('boomerang'),
    app = require('_/app'),
    workerFarm = require('_/farm');

app.listen(config.port);
debug('app listening on port %s', config.port);

workerFarm.boot();
