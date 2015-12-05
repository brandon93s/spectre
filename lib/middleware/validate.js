'use strict';

var Joi = require('joi'),
    log = require('_/log'),
    options,
    schema;

options = {
    allowUnknown: true
        // stripUnknown: true
};

// Todo: Define schema to validate once API is defined
schema = Joi.object().keys({});

module.exports = function (req, res, next) {
    Joi.validate(req.data, schema, options, function (err, value) {
        if (err) {
            log.warn('Validation failure!');
            res.send(err);
        } else {
            log.debug('Validation success!');
            req.data = value;
            next();
        }
    });
};
