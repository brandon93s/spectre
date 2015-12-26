'use strict';

import test from 'ava';

test.beforeEach(t => {
  t.context = require('_/app');
});

test('App starts successfully', t => {
  t.ok(t.context);
});
