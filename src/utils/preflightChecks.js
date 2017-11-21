const fs = require('fs');

module.exports = function(config) {
  if (!fs.existsSync(config.pathToInkscape)) {
    throw 'Inkscape binary not found';
  }

  if (!fs.existsSync(config.inputDirectory)) {
    throw 'Input directory does not exist';
  }

  if (!fs.existsSync(config.outputDirectory)) {
    throw 'Output directory does not exist';
  }
};