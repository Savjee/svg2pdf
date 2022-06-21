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
    // Enable reproducible PDF output by making sure the creation date is fixed.
    // Source: https://gitlab.com/inkscape/inkscape/-/merge_requests/219
    process.env['SOURCE_DATE_EPOCH'] = 1521324801;

    // Run SVG2PDF!
    utils.svg2pdf(config, () => {

      // Make sure that the hash of the file equals the hard coded one
      const hash = md5File.sync(__dirname + '/output/example.pdf');
      expect(hash).equals('c92ab3d968d7c2008cc3e28525fbf1d8');

    });
  });
});
