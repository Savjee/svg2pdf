#!/usr/bin/env node

const utils = require('./utils/index.js');

// Empty line
console.log();

// 1. Set up a default settings object
const config = utils.defaultConfig;

// 2. Parse the CLI options with Commander, populate the config
utils.commandParser(config);

// 3. Run the preflight checks to make sure everything is in order!
utils.preflightChecks(config);

// 4. Give the config to svg2pdf main code
utils.svg2pdf(config, () => {

    // 5. Everything is finished!
    console.log('Done.');
    console.log();

});