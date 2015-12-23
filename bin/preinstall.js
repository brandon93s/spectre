'use strict';

/* Preinstall Dependencies */
const fs = require('fs');
const path = require('path');
const resolve = path.resolve;
const join = path.join;
const exec = require('child_process').exec;

/* Helpers */
const msg = function (msg) {
  const div = '=====';
  console.log(div, msg, div, '\n');
};

const exit = function () {
  msg('Exiting...');
  process.exit(1);
};

/* Resolve Paths */
const lib = resolve(__dirname, '../lib/');
const node_modules = resolve(__dirname, '../node_modules');
const symlinkPath = join(node_modules, '_');

/* Check node_modules */
try {
  fs.mkdirSync(node_modules);
} catch (e) {
  if (e.code !== 'EEXIST') throw e;
}

/* Create Symkink node_modules -> lib */
fs.lstat(symlinkPath, function (err, stat) {
  const createSymlink = function () {
    try {
      fs.symlinkSync(lib, symlinkPath, 'dir');
    } catch (e) {
      if (e.code !== 'EPERM') throw e;
      msg('Insufficient Permissions to Create Symlink...');
      msg('Try Again with Elevated Permissions...');
      exit();
    }
  };

  if (err) {
    if ('ENOENT' === err.code) {
      msg('Creating Symlink to Lib...');
      createSymlink();
    } else {
      console.log(err);
    }
  } else if (!stat.isSymbolicLink()) {
    msg('File is not a Symlink. Replacing with Symlink...');
    fs.unlinkSync(symlinkPath);
    createSymlink();
  } else {
    msg('Symlink Found, Continuing...');
  }
});

/* Install Sub-module Dependencies */
fs.readdirSync(lib)
  .forEach(function (mod) {
    const modPath = join(lib, mod);

    // ensure path has package.json
    if (!fs.existsSync(join(modPath, 'package.json'))) return;

    // exec npm install in sub-module
    exec('npm install', {
      env: process.env,
      cwd: modPath,
    }, function (error, stdout, stderr) {

      msg('Installing "' + mod + '" Dependencies...');

      if (stderr) {
        console.log('stderr: ' + stderr);
      }
      if (error) {
        console.log('exec error: ' + error);
      }
    });
  });
