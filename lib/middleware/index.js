'use strict';

module.exports = {
	normalize: require('./normalize'),
	validate: require('./validate'),
	errorHandlers: {
		log: require('./logError'),
		client: require('./handleClientError'),
		error: require('./handleError')
	}
};
