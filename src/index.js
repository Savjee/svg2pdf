const utils = require('./utils/index.js');

// 1. Set up a default settings object (-> could be places in separate file)
const config = utils.defaultConfig;

// 2. Parse the CLI options with Commander, populate the config
utils.commandParser(config);

// 4. Run the preflight checks to make sure everything is in order!
utils.preflightChecks(config);


// 4. Give the config to svg2pdf main code
utils.svg2pdf(config, () => {
    console.log('Done.');
    console.log();
});

// 5. All done!