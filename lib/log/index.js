'use strict';

const cfg = require('_/config'),
	logger = require('winston');

/* Logging */
if (cfg.log.level) {
	logger.level = cfg.log.level;
}

/* Debug */
if (cfg.log.debug) {
	process.env.DEBUG = cfg.log.debug;
	const debug = require('debug');

	logger.debugger = function (module) {
		return debug('spectre:' + module);
	};

} else {
	logger.debugger = () => () => {};
}

module.exports = logger;
