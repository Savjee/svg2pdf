const expect = require('chai').expect;
const utils = require('../src/utils/index.js');
const fs = require('fs');
const md5File = require('md5-file')

describe('Testing SVG conversion', function() {

  let config;

  beforeEach(function () {
    config = JSON.parse(JSON.stringify(utils.defaultConfig));
    config.inputDirectory = __dirname + '/input/';
    config.outputDirectory = __dirname + '/output/';
    config.overwriteFiles = true;
    config.noProgressBar = true;

    // Disable the timeout of Mocha to allow conversion to take place
    this.timeout(100000);
  });

  it('should correctly convert example SVG file', function() {
    utils.svg2pdf(config, () => {

      // Make sure that the hash of the file equals the hard coded one
      const hash = md5File.sync(__dirname + '/output/example.pdf');
      expect(hash).equals('4aeea4c82d8e44f08295ecbffa355a53');

    });
  });
});
