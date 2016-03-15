'use strict';

const _ = require('lodash');
const _Promise = require('bluebird');

module.exports = function (page, msg) {

  if (_.isEmpty(msg.cookies))
    return;

  return _Promise.map(msg.cookies, (cookie) => {
    return page.addCookie(cookie);
  });

};
