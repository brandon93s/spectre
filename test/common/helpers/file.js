'use strict';

import test from 'ava';
import file from '_/common/helpers/file';

test('Full handles string and extension input', t => {
  const input = 'inputstring';
  const extension = 'extension';
  const fileName = `${input}.${extension}`;
  const output = file.full(input, extension);
  const outputParts = output.split('\\');

  t.is(outputParts[outputParts.length - 1], fileName);
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
  const outputParts = output.split('\\');
  const expected = 'f89d40683cbaf7312c5b547f253be547.pdf';

  t.is(outputParts[outputParts.length - 1], expected);
});

test('Full handles array input', t => {
  const msg = {
    format: 'pdf',
    param: 'value'
  };
  const msgArray = [msg, msg, msg];
  const output = file.full(msgArray);
  const outputParts = output.split('\\');
  const expected = '59c7855ba29eb2ff6f0fb5677689c8b8.pdf';

  t.is(outputParts[outputParts.length - 1], expected);
});

test('Name handles object and extension input', t => {
  const msg = {
    format: 'pdf',
    param: 'value'
  };

  const output = file.name(msg, msg.format);
  const outputParts = output.split('\\');
  const expected = 'f89d40683cbaf7312c5b547f253be547.pdf';

  t.is(outputParts[outputParts.length - 1], expected);
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

  t.notSame(output, output2);
});
