'use strict';

module.exports = function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({
      error: err
    });
  } else {
    next(err);
  }
};
