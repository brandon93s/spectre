'use strict';

const log = require('_/log');
const debug = log.debugger('worker:runner:render:' + process.pid);
const _Promise = require('bluebird');

module.exports = function (page, msg, filePath) {
  let renderPromise;

  switch (msg.mode) {
  case 'trigger':
    renderPromise = triggeredRender(page, msg, filePath);
    break;
  case 'delay':
    renderPromise = delayedRender(page, msg, filePath);
    break;
  default:
    renderPromise = render(page, msg, filePath);
  }

  return _Promise.resolve(renderPromise)
    .then(() => {
      debug('Done rendering %s', filePath);
      return page;
    });
};

function render(page, msg, filePath) {
  debug('Start rendering %s', filePath);

  return page.render(filePath, {
    format: msg.format,
    quality: msg.quality || '100'
  });

}

function delayedRender(page, msg, filePath) {
  debug('Delayed Render. Rendering in: %s', msg.delay);

  return new _Promise(resolve => {
    setTimeout(() => {
      return resolve(render(page, msg, filePath));
    }, msg.delay);
  });
}

function triggeredRender(page, msg, filePath) {
  debug('Triggered Render. Waiting for trigger');

  return new _Promise(resolve => {

    let run = () => {
      if (page.triggered) {
        resolve(render(page, msg, filePath));
      } else {
        setTimeout(run, 10);
      }
    };

    run();
  });
}
