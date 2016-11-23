'use strict';

import test from 'ava';
import file from '_/common/utils/file';
import path from 'path';

test('Full handles string and extension input', t => {
  const input = 'inputstring';
  const extension = 'extension';
  const expected = `${input}.${extension}`;
  const output = file.full(input, extension);

  t.is(path.basename(output), expected);
});

test('Full throws on string input without extension', t => {
  const input = 'inputstring';
  t.throws(() => {
    return file.full(input);
  });
});

test('Full handles message input', t => {
  const msg = {
    format: 'pdf',
    param: 'value'
  };

  const output = file.full(msg);
  const expected = 'f89d40683cbaf7312c5b547f253be547.pdf';

  t.is(path.basename(output), expected);
});

test('Full handles array input', t => {
  const msg = {
    format: 'pdf',
    param: 'value'
  };

  const msgArray = [msg, msg, msg];
  const output = file.full(msgArray);
  const expected = '59c7855ba29eb2ff6f0fb5677689c8b8.pdf';

  t.is(path.basename(output), expected);
});

test('Name handles object and extension input', t => {
  const msg = {
    format: 'pdf',
    param: 'value'
  };

  const output = file.name(msg, msg.format);
  const expected = 'f89d40683cbaf7312c5b547f253be547.pdf';

  t.is(path.basename(output), expected);
});

test('Name generates unique output', t => {
  const msg = {
    format: 'pdf',
    param: 'value'
  };
  const msg2 = {
    format: 'pdf',
    param2: 'value2'
  };
  const output = file.name(msg, msg.format);
  const output2 = file.name(msg2, msg2.format);

  t.notDeepEqual(output, output2);
});
