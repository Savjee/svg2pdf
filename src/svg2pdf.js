const path = require('path');
const fs = require('fs');
const Pool = require('threads').Pool;
const ProgressBar = require('progress');
const utils = require('./utils/index.js');

const config = {
    threads: 4,
    pathToInkscape: "/Volumes/Inkscape/Inkscape.app/Contents/Resources/bin/inkscape",
    outputDirectory: "/Users/Xavier/Desktop/Output/",
    inputDirectory: "/Users/Xavier/Desktop/input/",
}

utils.preflightChecks(config);

// Initialize a thread pool!
const threadPool = new Pool(config.threads);

// Read the input directory
const filesToProcess = fs.readdirSync(config.inputDirectory)
    .filter(fileName => fileName.indexOf('.svg') > -1) // ignore non .svg files
    .filter(fileName => fs.lstatSync(path.resolve(config.inputDirectory + '/' + fileName)).isFile()); // ignore directories

for (const file of filesToProcess) {
    const fullPath = path.resolve(config.inputDirectory + '/' + file);

    threadPool.run((input, done) => {
        // A thread has no scope at all, so we need to reimport these dependencies
        const path = require('path');
        const exec = require('child_process').exec;

        const newFilename = path.basename(input.fullPath).replace('.svg', '.pdf');
        const command = `${input.config.pathToInkscape} "${input.fullPath}" --export-pdf "${input.config.outputDirectory}${newFilename}"`;

        // console.log('--> Processing ' + input.fullPath);
        exec(command, (a, b, c) => {
            // console.log(a, b, c);
            done();
        });
    }).send({
        config: config,
        fullPath: fullPath,
    });
}

var bar = new ProgressBar('svg2pdf, ' + config.threads +' threads [:bar] :current/:total :lastProcessed', {
    total: filesToProcess.length,
    complete: '=',
    incomplete: ' ',
    width: 50,
});

threadPool
    .on('done', (job, message) => {
        bar.tick({
            'lastProcessed': job.sendArgs[0].fullPath
        });
    })
    .on('error', function(job, error) {
        console.error('Job errored:', error);
        throw ("");
    })
    .on('finished', function() {
    console.log('Everything done, shutting down the thread pool.');
    threadPool.killAll();
    });