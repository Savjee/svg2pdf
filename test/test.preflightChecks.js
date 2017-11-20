const expect = require('chai').expect;
const utils = require('../src/utils/index.js');

describe('Testing preflight checks', () => {

  it('should fail when path to inkscape is invalid', () => {
    const config = getCopyOfDefaultSettings();
    config.pathToInkscape = "/some/random/stuff/that/will/never/exist";

    expect(() => {
      utils.preflightChecks(config);
    }).to.throw();
  });

  it('should fail when input directory is invalid', () => {
    const config = getCopyOfDefaultSettings();
    config.inputDirectory = "/some/random/stuff/that/will/never/exist";

    expect(() => {
      utils.preflightChecks(config);
    }).to.throw();
  });

  it('should fail when output directory is invalid', () => {
    const config = getCopyOfDefaultSettings();
    config.outputDirectory = "/some/random/stuff/that/will/never/exist";

    expect(() => {
      utils.preflightChecks(config);
    }).to.throw();
  });

  it('should work when input & output directory is defined', () => {
    const config = getCopyOfDefaultSettings();
    config.outputDirectory = __dirname + "/output";
    config.inputDirectory = __dirname + "/input";

    expect(() => {
      utils.preflightChecks(config);
    }).to.not.throw();

  });

});

function getCopyOfDefaultSettings() {
  const config = utils.defaultConfig;
  return JSON.parse(JSON.stringify(config));
}