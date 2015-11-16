var env = process.env.NODE_ENV || 'development',
    _ = require('lodash');

// env specific config
var envCfg = require('./env/' + env);

// default configs
var defCfg = require('./env/default');

module.exports = _.defaultsDeep(envCfg, defCfg);
