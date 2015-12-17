'use strict';

module.exports = function (err, req, res, next) {
	res.status(500);
	res.render('error', {
		message: err.message,
		stack: err.stack
	});
};
