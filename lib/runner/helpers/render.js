'use strict';

const file = require('_/common/file'),
    log = require('_/log'),
    debug = log.debugger('worker:runner:render' + process.pid);


module.exports = function (page, msg, filePath) {

    return new Promise((resolve, reject) => {

        debug('start rendering %s', filePath);

        page.render(filePath, {
            format: msg.format,
            quality: '100'
        }, () => {
            debug('done rendering %s', filePath);
            resolve(page);
        });

    });
};
