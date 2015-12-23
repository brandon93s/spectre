'use strict';

const _ = require('lodash');
const debug = require('_/log').debugger('middleware:validate');
const Joi = require('joi');

let defaultOptions;
let cookieSchema;
let defaultSchema;

module.exports = validate;

/* Validatie */
function validate(req, res, next) {
  if (_.isArray(req.data)) {
    validateMulti(req, res, next);
  } else {
    validateSingle(req, res, next);
  }
}

/* Single */
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

/* Multi */
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

/* Helpers */
function validateSchema(data, schema, options) {
  schema = schema || defaultSchema;
  options = options || defaultOptions;
  return Joi.validate(data, schema, options);
}

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
  width: Joi.number().integer().min(1).required(),
  height: Joi.number().integer().min(1).required(),

  // optional
  data: Joi.any(),
  dataType: Joi.any(),
  quality: Joi.number().integer().min(1).max(100),
  cookies: Joi.array().items(cookieSchema.required()),
  timeout: Joi.number().integer().min(1),
  userAgent: Joi.string().trim(),
  userName: Joi.string(),
  password: Joi.string(),
  headers: Joi.string().trim(),
  delay: Joi.number().integer().positive(),
  enableJs: Joi.boolean(),
  loadImages: Joi.boolean(),
  paperSize: Joi.object()
});
