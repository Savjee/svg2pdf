const expect = require('chai').expect;
const utils = require('../src/utils/index.js');

describe('Testing preflight checks', () => {
  let config;

  // Make a new copy of the config JSON before running each test
  beforeEach(function() {
    config = JSON.parse(JSON.stringify(utils.defaultConfig));
  });

  it('should fail when path to inkscape is invalid', () => {
    config.pathToInkscape = '/some/random/stuff/that/will/never/exist';

    expect(() => {
      utils.preflightChecks(config);
    }).to.throw();
  });

  it('should fail when input directory is invalid', () => {
    config.inputDirectory = '/some/random/stuff/that/will/never/exist';

    expect(() => {
      utils.preflightChecks(config);
    }).to.throw();
  });

  it('should fail when output directory is invalid', () => {
    config.outputDirectory = '/some/random/stuff/that/will/never/exist';

    expect(() => {
      utils.preflightChecks(config);
    }).to.throw();
  });

  it('should fail when input is defined, but output not', () => {
    config.inputDirectory = __dirname + '/input';

    expect(() => {
      utils.preflightChecks(config);
    }).to.throw();
  });

  it('should work when input & output directory is defined', () => {
    config.outputDirectory = __dirname + '/output';
    config.inputDirectory = __dirname + '/input';

    expect(() => {
      utils.preflightChecks(config);
    }).to.not.throw();
  });
});
