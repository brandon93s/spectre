'use strict';

const join = require('path').join;
const _ = require('lodash');

const env = process.env.NODE_ENV || 'development';
const REL_TEMP_DIRECTORY = 'relative_temporary_directory';
const TEMP_DIRECTORY = 'temporary_directory';

const environmentConfig = require('./env/' + env);
const defaultConfig = require('./env/default');

let runtimeConfig = _.defaultsDeep(environmentConfig, defaultConfig);

if (!runtimeConfig[TEMP_DIRECTORY]) {
  runtimeConfig[TEMP_DIRECTORY] = join(__dirname, '../../', runtimeConfig[REL_TEMP_DIRECTORY]);
}

module.exports = runtimeConfig;
