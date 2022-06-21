const { expose } = require("threads/worker");
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

expose(function work(config, fullPath) {
  return new Promise((resolve, reject) => {
    const pathToNewFile = path.normalize(config.outputDirectory + '/' +path.basename(fullPath).replace('.svg', '.pdf'));

    // Prevent files from being overwritten
    if (config.overwriteFiles === false && fs.existsSync(pathToNewFile)) {
        // console.log('File already exists, not overwriting: ' + pathToNewFile);
        return resolve();
    }

    const command = `${config.pathToInkscape} "${fullPath}" --export-filename "${pathToNewFile}"`;

    //console.log('--> Processing ' + fullPath);
    exec(command, (a, b, c) => {
      // console.log(a, b, c);
      return resolve();
    });
  });
});