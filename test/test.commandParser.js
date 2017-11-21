const expect = require('chai').expect;
const utils = require('../src/utils/index.js');
const fs = require('fs');

describe('Testing commandParser', function () {

  let config;

  // Make a new copy of the config JSON before running each test
  beforeEach(function () {
    config = JSON.parse(JSON.stringify(utils.defaultConfig));
  });

  it('should set the correct amount of threads', function () {
    const args = ['node', 'svg2pdf', '--threads', '16', __dirname + '/input', __dirname + '/output'];
    utils.commandParser(config, args);

    expect(config.threads).to.eq(16);
  });

  it('should correctly set overwrite parameter', function () {
    const args = ['node', 'svg2pdf', '--overwrite', __dirname + '/input', __dirname + '/output'];
    utils.commandParser(config, args);

    expect(config.overwriteFiles).to.eq(true);
  });

  it('should correctly set path to Inkscape', function () {
    const fakeInkscape = "/usr/bin/some/path/to/inkscape";
    const args = ['node', 'svg2pdf', '--inkscape', fakeInkscape, __dirname + '/input', __dirname + '/output'];

    utils.commandParser(config, args);

    expect(config.pathToInkscape).to.eq(fakeInkscape);
  });

  it('should correctly set no progressbar', function () {
    const args = ['node', 'svg2pdf', '--no-progress', __dirname + '/input', __dirname + '/output'];
    utils.commandParser(config, args);
    expect(config.noProgressBar).to.eq(true);
  });
});