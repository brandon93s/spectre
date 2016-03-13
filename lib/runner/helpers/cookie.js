'use strict';

const _ = require('lodash');

module.exports = function (page, msg) {
  return new Promise((resolve, reject) => {
    page.clearCookies();

    if (_.isEmpty(msg.cookies)) return resolve();

    Promise.all(_.map(msg.cookies, cookie => {
      return addCookie(page, cookie);
    })).then(() => {
      resolve();
    }).catch(reason => {
      reject(reason);
    });
  });
};

function addCookie(page, cookie) {
  return new Promise((resolve, reject) => {
    page.addCookie(cookie).then(success => {
      if (!success) return reject('Cookie add failed');
      console.log('success');
      resolve();
    });
  });
}
