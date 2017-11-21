const Pool = require('threads').Pool;
const ProgressBar = require('progress');
const fs = require('fs');
const path = require('path');

module.exports = (config, callback) => {

  // Initialize a thread pool!
  const threadPool = new Pool(config.threads);

  // Read the input directory
  const filesToProcess = fs
    .readdirSync(config.inputDirectory)
    .filter(fileName => fileName.indexOf('.svg') > -1) // ignore non .svg files
    .filter(fileName => fs.lstatSync(path.resolve(config.inputDirectory + '/' + fileName)).isFile()); // ignore directories

  for (const file of filesToProcess) {
    const fullPath = path.resolve(config.inputDirectory + '/' + file);

    threadPool
      .run((input, done) => {
        // A thread has no scope at all, so we need to reimport these dependencies
        const path = require('path');
        const fs = require('fs');
        const exec = require('child_process').exec;

        const pathToNewFile = path.normalize(input.config.outputDirectory + '/' +path.basename(input.fullPath).replace('.svg', '.pdf'));

        // Prevent files from being overwritten
        if (input.config.overwriteFiles === false && fs.existsSync(pathToNewFile)) {
            // console.log('File already exists, not overwriting: ' + pathToNewFile);
            done();
            return;
        }

        const command = `${input.config
          .pathToInkscape} "${input.fullPath}" --export-pdf "${pathToNewFile}"`;

        // console.log('--> Processing ' + input.fullPath);
        exec(command, (a, b, c) => {
          // console.log(a, b, c);
          done();
        });
      })
      .send({
        config: config,
        fullPath: fullPath
      });
  }

  if (!config.noProgressBar) {
    var bar = new ProgressBar(`svg2pdf, ${config.threads} threads [:bar] :current/:total :lastProcessed`,
        {
            total: filesToProcess.length,
            complete: '=',
            incomplete: ' ',
            width: 50
        }
    );
  }

  threadPool
    .on('done', (job, message) => {
        if (!config.noProgressBar) {
          bar.tick({
              lastProcessed: job.sendArgs[0].fullPath
          });
        }
    })
    .on('error', function(job, error) {
      console.error('Job errored:', error);
      throw '';
    })
    .on('finished', () => {
        threadPool.killAll();
        callback();
    });
};
