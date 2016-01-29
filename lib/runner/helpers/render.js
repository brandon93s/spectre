'use strict';

const log = require('_/log');
const debug = log.debugger('worker:runner:render:' + process.pid);

module.exports = function (page, msg, filePath) {
  if (msg.mode === 'trigger')
    return triggeredRender(page, msg, filePath);

  if (msg.mode === 'delay')
    return delayedRender(page, msg, filePath);

  return render(page, msg, filePath);
};

function render(page, msg, filePath) {
  return new Promise((resolve) => {

    debug('Start rendering %s', filePath);
    page.render(filePath, {
      format: msg.format,
      quality: msg.quality || '100'
    }, () => {
      debug('Done rendering %s', filePath);
      resolve(page);
    });
  });
}

function delayedRender(page, msg, filePath) {
  return new Promise((resolve) => {
    debug('Delayed Render. Rendering in: %s', msg.delay);
    setTimeout(() => {
      render(page, msg, filePath).then(page => resolve(page));
    }, msg.delay);
  });
}

function triggeredRender(page, msg, filePath) {
  return new Promise((resolve) => {
    debug('Triggered Render. Waiting for trigger');

    let run = () => {
      if (page.triggered) {
        render(page, msg, filePath).then(page => resolve(page));
      } else {
        setTimeout(run, 10);
      }
    };

    run();
  });
}
