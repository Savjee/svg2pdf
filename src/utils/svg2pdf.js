const { spawn, Pool, Worker } = require('threads');
const ProgressBar = require('progress');
const fs = require('fs');
const path = require('path');

module.exports = (config, callback) => {

  // Initialize a thread pool!
  const threadPool = new Pool(() => spawn(new Worker("./svg2pdf-worker")));

  // Read the input directory
  const filesToProcess = fs
    .readdirSync(config.inputDirectory)
    .filter(fileName => fileName.indexOf('.svg') > -1) // ignore non .svg files
    .filter(fileName => fs.lstatSync(path.resolve(config.inputDirectory + '/' + fileName)).isFile()); // ignore directories

  for (const file of filesToProcess) {
    const fullPath = path.resolve(config.inputDirectory + '/' + file);

    threadPool
      .queue(worker => worker(config, fullPath))
      .then(result => {
        if (!config.noProgressBar) {
          bar.tick({
              lastProcessed: fullPath
          });
        }
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

  threadPool.completed()
    .then(async () => {
      await threadPool.terminate();
      callback();
    })
    .catch((error) => {
      console.error('Job errored:', error);
      throw '';
    });
};
