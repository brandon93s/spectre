'use strict';

import test from 'ava';
import isDefined from '_/common/utils/is-defined';

test('Handles undefined value', t => {
  t.false(isDefined(undefined));
});

test('Handles truthy value', t => {
  t.true(isDefined('defined'));
});

test('Handles undefined property', t => {
  const testObject = {
    property: 'value'
  };

  t.false(isDefined(testObject.notProperty));
});

test('Handles defined property', t => {
  const testObject = {
    property: 'value'
  };

  t.true(isDefined(testObject.property));
});
