var cfg = require('_/config'),
    winston = require('winston');

if (cfg.log.level) {
    winston.level = cfg.log.level;
}

module.exports = winston;
