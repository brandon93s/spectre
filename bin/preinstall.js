var fs = require('fs'),
    resolve = require('path').resolve,
    join = require('path').join,
    cp = require('child_process');

// logging helper function
var msg = function (msg) {
    var div = '=====';
    console.log(div, msg, div, '\n');
};

// get library path
var lib = resolve(__dirname, '../lib/');

// get node modules path
var node_modules = resolve(__dirname, '../node_modules');

// setup symlink
if (fs.existsSync(join(node_modules, '_'))) {
    msg('Lib symlink found!');
} else {
    msg('Lib symlink missing! Adding symlink...');
    cp.spawn('cmd', ['/c', 'mklink', '/D', '_', '..\lib'], {
        env: process.env,
        cwd: node_modules,
        stdio: 'inherit'
    });
}

// npm install sub-modules
fs.readdirSync(lib)
    .forEach(function (mod) {
        var modPath = join(lib, mod);

        // ensure path has package.json
        if (!fs.existsSync(join(modPath, 'package.json'))) return;

        // log status to console
        msg('Installing ' + mod + ' dependencies');

        // install folder
        cp.spawn('cmd', ['/c', 'npm', 'i'], {
            env: process.env,
            cwd: modPath,
            stdio: 'inherit'
        });
    });
