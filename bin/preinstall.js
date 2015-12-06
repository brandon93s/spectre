'use strict';

var fs = require('fs'),
    resolve = require('path').resolve,
    join = require('path').join,
    cp = require('child_process'),
    exec = cp.exec;

// logging helper function
var msg = function (msg) {
    var div = '=====';
    console.log(div, msg, div, '\n');
};


var lib = resolve(__dirname, '../lib/');
var node_modules = resolve(__dirname, '../node_modules');
var symlinkPath = join(node_modules, '_');

// setup symlink from node_modules to lib
fs.lstat(symlinkPath, function (err, stat) {
    var createSymlink = function () {
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
        var modPath = join(lib, mod);

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
