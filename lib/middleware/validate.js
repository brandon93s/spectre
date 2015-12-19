'use strict';

const Joi = require('joi');
const _ = require('lodash');
const debug = require('_/log').debugger('middleware:validate');

let defaultOptions;
let defaultSchema;
let cookieSchema;

module.exports = {
  single: validateSingle,
  multi: validateMulti
};

/* Options */
defaultOptions = {
  stripUnknown: true
};

/* Schemas */
cookieSchema = Joi.object().keys({
  name: Joi.string().required(),
  value: Joi.any().required(),
  path: Joi.string().required(),
  domain: Joi.string(),
  httponly: Joi.boolean(),
  secure: Joi.boolean(),
  expires: Joi.any()
});

defaultSchema = Joi.object().keys({
  // required
  url: Joi.string().trim().required(),

  // have defaults
  format: Joi.string().lowercase().trim().required(),
  mode: Joi.string().lowercase().trim().required(),

  // optional
  quality: Joi.number().integer().min(1).max(100),
  cookies: Joi.array().items(cookieSchema.required()),
  timeout: Joi.number().integer().min(1),
  agent: Joi.string().trim(),
  headers: Joi.string().trim(),
  delay: Joi.number().integer().positive(),
  width: Joi.number().integer().min(1),
  height: Joi.number().integer().min(1),
  js: Joi.boolean(),
  images: Joi.boolean(),
  paperSize: Joi.object()
});

/* Validation */
function validateSchema(data, schema, options) {
  schema = schema || defaultSchema;
  options = options || defaultOptions;
  return Joi.validate(data, schema, options);
}

function validateSingle(req, res, next) {
  let validationResults = validateSchema(req.data);
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
  let error;
  _.forEach(req.data, function (value, key) {
    let validationResults = validateSchema(value);
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
