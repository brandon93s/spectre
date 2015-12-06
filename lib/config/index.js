'use strict';

const env = process.env.NODE_ENV || 'development',
    _ = require('lodash'),
    envCfg = require('./env/' + env),
    defCfg = require('./env/default');

module.exports = _.defaultsDeep(envCfg, defCfg);
