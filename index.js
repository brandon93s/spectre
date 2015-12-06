'use strict';

/* Boomerang Entry Point */
var cfg = require('_/config'),
    debug = require('_/log').debugger('boomerang'),
    app = require('_/app'),
    workerFarm = require('_/farm');

app.listen(cfg.port);
debug('app listening on port %s', cfg.port);

workerFarm.boot();
