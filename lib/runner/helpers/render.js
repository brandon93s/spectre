'use strict';

const file = require('./file'),
    log = require('_/log'),
    debug = log.debugger('worker:runner:render' + process.pid);


module.exports = function (page, msg) {
    return new Promise((resolve, reject) => {

        let filePath = file.full(msg);
        debug('start rendering %s', filePath);

        page.render(filePath, {
            format: 'pdf',
            quality: '100'
        }, () => {
            debug('done rendering %s', filePath);
            resolve(page);
        });

    });
};
