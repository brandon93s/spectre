'use strict';

var Joi = require('joi'),
    _ = require('lodash'),
    debug = require('_/log').debugger('middleware:validate'),
    defaultOptions,
    defaultSchema;

module.exports = {
    single: validateSingle,
    multi: validateMulti
};

defaultOptions = {
    allowUnknown: true
        // stripUnknown: true
};

// Todo: Define schema to validate once API is defined
defaultSchema = Joi.object().keys({});

function validateSchema(data, schema, options) {
    schema = schema || defaultSchema;
    options = options || defaultOptions;

    return Joi.validate(data, schema, options);
}

function validateSingle(req, res, next) {
    var validationResults = validateSchema(req.data);

    if (validationResults.error) {
        debug('Validation failure!');
        return next(new Error(validationResults.error));
    } else {
        debug('Validation success!');
        req.data = validationResults.value;
        next();
    }
}

function validateMulti(req, res, next) {
    var error;

    _.forEach(req.data, function (value, key) {
        var validationResults = validateSchema(value);

        if (validationResults.error) {
            error = validationResults.error;
            return false;
        }

        req.data[key] = validationResults.value;
    });

    if (error) {
        debug('Validation failure!');
        return next(new Error(error));
    } else {
        debug('Validation success!');
        next();
    }
}
