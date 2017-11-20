const program = require('commander');
const packageJson = require('../../package.json');

module.exports = (config) => {

    program
        .version(packageJson.version)
        .description('Convert SVG\'s to PDF')

        .arguments('<inputDir> [outputDir]')
        .action((inputDir, outputDir) => {
            if (inputDir) {
                config.inputDirectory = inputDir;
            }

            if (outputDir) {
                config.outputDirectory = outputDir;
            }
        })
        .option('-o, --overwrite', 'Overwrite output PDF if already exists.')
        .option('-t, --threads <n>', 'Number of threads to use (defaults to the amount of CPU cores)', parseInt)
        .option('--no-progress', 'Don\'t show the progress bar')

    program.parse(process.argv);

    if (program.threads) {
        config.threads = program.threads;
    }

    if (program.overwrite) {
        config.overwriteFiles = true;
    }

    // A bit tricky: Commander sets "progress" to false if it's being passed by the user
    // but we use a variable "noProgressBar" so we invert that boolean.
    if (program.progress === false) {
        config.noProgressBar = true;
    }
}