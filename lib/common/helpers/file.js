'use strict';

const hashObj = require('hash-obj'),
	_ = require('lodash'),
	join = require('path').join,
	TEMP_DIRECTORY = require('_/config').temporary_directory;

module.exports = {
	full: fullFilePath,
	name: filenameFromMessage
};

function fullFilePath(file) {
	let fileName = file;

	if (_.isArray(file)) {
		let fileObject = _.reduce(file, (obj, msg, key) => {
			obj[key] = msg;
			return obj;
		}, {});

		fileName = filenameFromMessage(fileObject, file[0].format);
	} else if (_.isObject(file)) {
		fileName = filenameFromMessage(file, file.format);
	}

	return join(TEMP_DIRECTORY, fileName);
}

function filenameFromMessage(msg, ext) {
	let uniqueFilename = messageHash(msg);
	return uniqueFilename + '.' + ext;
}

function messageHash(msg) {
	return hashObj(msg, {
		algorithm: 'md5'
	});
}
