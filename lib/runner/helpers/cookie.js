/* Cookie Helper */
'use strict';

const _ = require('lodash');

module.exports = function (_ph, msg) {
	return new Promise((resolve, reject) => {
		_ph.clearCookies();

		if (_.isEmpty(msg.cookies)) return resolve();

		Promise.all(_.map(msg.cookies, cookie => {
			return addCookie(_ph, cookie);
		})).then(() => {
			resolve();
		}).catch(reason => {
			reject(reason);
		});

	});
};

function addCookie(_ph, cookie) {
	return new Promise((resolve, reject) => {
		_ph.addCookie(cookie, success => {
			if (!success) return reject('Cookie add failed');
			resolve();
		});
	});
}
