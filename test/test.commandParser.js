const expect = require('chai').expect;
const utils = require('../src/utils/index.js');
const fs = require('fs');

describe('Testing commandParser', function() {

  it('should set the correct amount of threads', function () {
    const config = getCopyOfDefaultSettings();
    const args = ['node', 'svg2pdf', '--threads', '16', __dirname + '/input', __dirname + '/output'];
    utils.commandParser(config, args);

    expect(config.threads).to.eq(16);
  });

  it('should correctly set overwrite parameter', function () {
    const config = getCopyOfDefaultSettings();
    const args = ['node', 'svg2pdf', '--overwrite', __dirname + '/input', __dirname + '/output'];
    utils.commandParser(config, args);

    expect(config.overwriteFiles).to.eq(true);
  });
});

function getCopyOfDefaultSettings() {
  return JSON.parse(JSON.stringify(utils.defaultConfig));
}