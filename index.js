/* main module entry point */
var cfg = require('_/config'),
    log = require('_/log'),
    app = require('_/app');

app.listen(cfg.port);
log.info('app listening on port', cfg.port);
