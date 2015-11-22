'use strict';

var env = process.env.NODE_ENV || 'development',
    _ = require('lodash'),
    envCfg,
    defCfg;

// environment specific config
envCfg = require('./env/' + env);

// default configs
defCfg = require('./env/default');

module.exports = _.defaultsDeep(envCfg, defCfg);
