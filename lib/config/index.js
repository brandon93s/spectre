'use strict';

const env = process.env.NODE_ENV || 'development',
    join = require('path').join,
    _ = require('lodash'),

    environmentConfig = require('./env/' + env),
    defaultConfig = require('./env/default'),

    REL_TEMP_DIRECTORY = 'relative_temporary_directory',
    TEMP_DIRECTORY = 'temporary_directory';

let runtimeConfig = _.defaultsDeep(environmentConfig, defaultConfig);

if (!runtimeConfig[TEMP_DIRECTORY]) {
    runtimeConfig[TEMP_DIRECTORY] = join(__dirname, '../../', runtimeConfig[REL_TEMP_DIRECTORY]);
}

module.exports = runtimeConfig;
