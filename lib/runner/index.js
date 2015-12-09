/* Core Runner */
'use strict';

const log = require('_/log'),
    helpers = require('./helpers'),
    file = require('_/common/helpers/file'),
    debug = log.debugger('worker:runner:' + process.pid);

module.exports = run;

function run(_ph, msg) {
    const _filePath = file.full(msg);

    debug('Running %s', msg.url);

    return Promise.resolve(true)
        .then(() => helpers.cookie(_ph, msg))
        .then(() => createPage(_ph))
        .then(page => openPage(page, msg))
        .then(page => helpers.render(page, msg, _filePath))
        .then(page => closePage(page))
        .then(() => {
            debug('Done rendering');
            return getReturnMessage(_filePath);
        });
}

function createPage(_ph) {
    return new Promise((resolve, reject) => {
        _ph.createPage(page => {
            if (!page) return reject('Page creation failed');
            resolve(page);
        });
    });
}

function openPage(page, msg) {

    if (msg.data) {
        return openPagePost(page, msg);
    }

    return new Promise((resolve, reject) => {
        page.open(msg.url, status => {
            if (status !== "success") {
                page.close();
                return reject('Page open failed');
            }

            resolve(page);
        });
    });
}

function openPagePost(page, msg) {

    let body = msg.data;

    return new Promise((resolve, reject) => {
        page.open(msg.url, "POST", body, status => {
            if (status !== "success") {
                page.close();
                debug('Page open failed!');
                return reject('Page open failed');
            }
            debug('Page opened!');
            resolve(page);
        });
    });
}

function closePage(page) {
    page.close();
}

function getReturnMessage(filePath) {
    return {
        file: filePath
    };
}
