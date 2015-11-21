/* main module entry point */
var cfg = require('_/config'),
    log = require('_/log'),
    app = require('_/app'),
    workerFarm = require('_/farm');

app.listen(cfg.port);
log.info('app listening on port', cfg.port);

workerFarm.boot();
