'use strict';

const fs = require('fs'),
    resolve = require('path').resolve,
    join = require('path').join,
    exec = require('child_process').exec;

// logging helper function
const msg = function (msg) {
    var div = '=====';
    console.log(div, msg, div, '\n');
};

// resolve necessary paths
const lib = resolve(__dirname, '../lib/');
const node_modules = resolve(__dirname, '../node_modules');
const symlinkPath = join(node_modules, '_');

// make sure node_modules directory exists
try {
    fs.mkdirSync(node_modules);
} catch (e) {
    if (e.code !== 'EEXIST') throw e;
}

// setup symlink from node_modules to lib
fs.lstat(symlinkPath, function (err, stat) {
    const createSymlink = function () {
        fs.symlinkSync(lib, symlinkPath, 'dir');
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

// npm install sub-modules
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

            msg('Installing ' + mod + ' dependencies...');

            if (stdout) {
                console.log('stdout: ' + stdout);
            }
            if (stderr) {
                console.log('stderr: ' + stderr);
            }
            if (error) {
                console.log('exec error: ' + error);
            }
        });
    });
